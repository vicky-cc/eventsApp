<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, nextTick, ref } from "vue";
import { onLoad, onReady } from "@dcloudio/uni-app";
import MescrollBody from "mescroll-uni/mescroll-body.vue";

import HomeEventsContent from "./HomeEventsContent.vue";
import { useEventStore } from "@/stores";
import { useMescroll } from "@/uni_modules/mescroll-uni/hooks/useMescroll";

import { buildListContainerHeight } from "./layout";
import { queueMescrollFinish } from "./paging";

interface MescrollBodyInstance {
  num: number;
  resetUpScroll: () => void;
  endSuccess: (dataSize?: number, hasNext?: boolean) => void;
  endErr: () => void;
  onPageScroll?: (e: unknown) => void;
  onReachBottom?: () => void;
}

const uiText = {
  searchPlaceholder: "\u8bf7\u8f93\u5165\u5173\u952e\u8bcd\u641c\u7d22\u6d3b\u52a8",
  search: "\u641c\u7d22",
  toggleGrid: "\u5207\u6362\u7f51\u683c\u89c6\u56fe",
  toggleList: "\u5207\u6362\u5217\u8868\u89c6\u56fe",
  loadingTitle: "\u52a0\u8f7d\u4e2d...",
  loadingSubtitle: "\u6b63\u5728\u83b7\u53d6\u6d3b\u52a8\u5217\u8868",
  errorTitle: "\u52a0\u8f7d\u5931\u8d25",
  retry: "\u91cd\u8bd5",
  emptyTitle: "\u672a\u627e\u5230\u76f8\u5173\u6d3b\u52a8",
  emptySubtitle: "\u8bf7\u66f4\u6362\u5173\u952e\u8bcd\u8bd5\u8bd5",
  loadingMore: "\u52a0\u8f7d\u66f4\u591a\u4e2d...",
  noMore: "\u6ca1\u6709\u66f4\u591a\u6d3b\u52a8\u4e86",
  loadMoreFail: "\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u4e0b\u62c9\u91cd\u8bd5"
} as const;

const store = useEventStore();
const { events, loading, error, viewMode, hasMore, keyword } = storeToRefs(store);

const keywordInput = ref("");
const searchShellWrapperHeight = ref(120);

const { mescrollInit, resetUpScroll } = useMescroll<MescrollBodyInstance>();

const listContainerHeight = computed(() => buildListContainerHeight(searchShellWrapperHeight.value));
const nextViewMode = computed(() => (viewMode.value === "list" ? "grid" : "list"));

const downOption = {
  auto: false,
  native: false
};

const upOption = {
  auto: true,
  page: {
    num: 1,
    size: 20
  },
  textLoading: uiText.loadingMore,
  textNoMore: uiText.noMore,
  textErr: uiText.loadMoreFail,
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
  resetUpScroll();
}

function handleDown(): void {
  resetUpScroll();
}

async function handleUp(instance: MescrollBodyInstance): Promise<void> {
  const isFirstPage = instance.num <= 1;
  const previousLength = events.value.length;

  if (isFirstPage) {
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
    url: `/pages/event-detail/index?id=${id}`
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
</script>

<template>
  <view class="home-page">
    <view class="search-shell-wrap">
      <view class="search-shell">
        <view class="search-row">
          <input
            v-model="keywordInput"
            class="search-input"
            :placeholder="uiText.searchPlaceholder"
            confirm-type="search"
            @confirm="handleSearch"
          />
          <button class="search-btn" size="mini" @tap="handleSearch">{{ uiText.search }}</button>
          <button
            class="layout-toggle"
            :aria-label="nextViewMode === 'grid' ? uiText.toggleGrid : uiText.toggleList"
            @tap="toggleViewMode"
          >
            <view class="layout-icon" :class="nextViewMode === 'grid' ? 'layout-icon-grid' : 'layout-icon-list'" />
          </button>
        </view>
      </view>
    </view>

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
        :ui-text="uiText"
        @open-detail="openDetail"
        @retry="retry"
      />
    </mescroll-body>
  </view>
</template>
