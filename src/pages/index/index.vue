<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, nextTick, ref } from "vue";
import { onLoad, onPageScroll, onReady } from "@dcloudio/uni-app";
import MescrollBody from "mescroll-uni/mescroll-body.vue";

import HomeEventsContent from "./HomeEventsContent.vue";
import { useEventStore } from "@/stores";
import { useMescroll } from "@/uni_modules/mescroll-uni/hooks/useMescroll";

import { buildListContainerHeight } from "./layout";
import { queueMescrollFinish } from "./paging";
import { shouldRunSearch } from "./upAction";
import { buildEventDetailUrl } from "../event-detail/route";

interface MescrollBodyInstance {
  num: number;
  resetUpScroll: () => void;
  endSuccess: (dataSize?: number, hasNext?: boolean) => void;
  endErr: () => void;
  onPageScroll?: (e: unknown) => void;
  onReachBottom?: () => void;
}

const store = useEventStore();
const { events, loading, error, viewMode, hasMore, keyword } = storeToRefs(store);

const keywordInput = ref("");
const searchShellWrapperHeight = ref(120);
const pageScrolled = ref(false);
const forceSearchOnNextUp = ref(false);

const { mescrollInit, getMescroll, resetUpScroll } = useMescroll<MescrollBodyInstance>();

const listContainerHeight = computed(() => buildListContainerHeight(searchShellWrapperHeight.value));
const nextViewMode = computed(() => (viewMode.value === "list" ? "grid" : "list"));

const downOption = {
  auto: false,
  native: false
};

const upOption = {
  auto: false,
  page: {
    num: 1,
    size: 20
  },
  textLoading: "加载更多中...",
  textNoMore: "没有更多活动了",
  textErr: "加载失败，请下拉重试",
  empty: {
    use: false
  }
};

function measureSearchShellWrapper(): void {
  const query = uni.createSelectorQuery();

  query
    .select(".search-shell-wrap")
    .boundingClientRect((rect: unknown) => {
      if (
        rect &&
        !Array.isArray(rect) &&
        typeof rect === "object" &&
        "height" in rect &&
        typeof (rect as { height?: unknown }).height === "number"
      ) {
        const nextHeight = Math.ceil((rect as { height: number }).height);
        if (nextHeight > 0) {
          searchShellWrapperHeight.value = nextHeight;
        }
      }
    })
    .exec();
}

function handleSearch(): void {
  forceSearchOnNextUp.value = true;

  if (!getMescroll()) {
    void store.search(keywordInput.value);
    return;
  }

  resetUpScroll();
}

function handleDown(): void {
  resetUpScroll();
}

async function handleUp(instance: MescrollBodyInstance): Promise<void> {
  const isFirstPage = instance.num <= 1;
  const previousLength = events.value.length;
  const shouldSearch = shouldRunSearch({
    isFirstPage,
    forceSearch: forceSearchOnNextUp.value,
    inputKeyword: keywordInput.value,
    storeKeyword: keyword.value
  });

  if (shouldSearch) {
    forceSearchOnNextUp.value = false;
    await store.search(keywordInput.value);
  } else {
    await store.loadMore();
  }

  if (error.value) {
    await queueMescrollFinish(() => {
      instance.endErr();
    });
    return;
  }

  const pageSize = isFirstPage ? events.value.length : Math.max(events.value.length - previousLength, 0);
  await queueMescrollFinish(() => {
    instance.endSuccess(pageSize, hasMore.value);
  });
}

function openDetail(id: string): void {
  uni.navigateTo({
    url: buildEventDetailUrl(id)
  });
}

function toggleViewMode(): void {
  store.setViewMode(nextViewMode.value);
}

function retry(): void {
  resetUpScroll();
}

onLoad(() => {
  keywordInput.value = keyword.value;
  void store.search(keywordInput.value);
});

onReady(() => {
  nextTick(() => {
    measureSearchShellWrapper();
  });
});

onPageScroll((event) => {
  pageScrolled.value = (event.scrollTop ?? 0) > 6;
});
</script>

<template>
  <view class="home-page">
    <view class="search-shell-wrap" :class="{ 'search-shell-wrap-scrolled': pageScrolled }">
      <view class="search-shell">
        <view class="search-row">
          <input
            v-model="keywordInput"
            class="search-input"
            placeholder="请输入关键词搜索活动"
            confirm-type="search"
            @confirm="handleSearch"
          />
          <button class="search-btn" size="mini" @tap="handleSearch">搜索</button>
          <button
            class="layout-toggle"
            :aria-label="nextViewMode === 'grid' ? '切换网格视图' : '切换列表视图'"
            @tap="toggleViewMode"
          >
            <view class="layout-icon" :class="nextViewMode === 'grid' ? 'layout-icon-grid' : 'layout-icon-list'" />
          </button>
        </view>
      </view>
    </view>
    <view class="search-shell-placeholder" :style="{ height: `${searchShellWrapperHeight}px` }" />

    <mescroll-body
      class="events-scroll"
      :height="listContainerHeight"
      :down="downOption"
      :up="upOption"
      @init="mescrollInit"
      @down="handleDown"
      @up="handleUp"
    >
      <HomeEventsContent
        :events="events"
        :loading="loading"
        :error="error"
        :view-mode="viewMode"
        @open-detail="openDetail"
        @retry="retry"
      />
    </mescroll-body>
  </view>
</template>
