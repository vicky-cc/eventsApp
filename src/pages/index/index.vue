<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { onLoad, onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";

import StateBlock from "@/components/common/StateBlock.vue";
import EventGridItem from "@/components/event/EventGridItem.vue";
import EventListItem from "@/components/event/EventListItem.vue";
import { useEventStore } from "@/stores";

const store = useEventStore();
const { events, loading, refreshing, loadingMore, error, viewMode, hasMore, keyword } = storeToRefs(store);

const keywordInput = ref("");

async function handleSearch(): Promise<void> {
  await store.search(keywordInput.value);
}

function openDetail(id: string): void {
  uni.navigateTo({
    url: `/pages/event-detail/index?id=${id}`
  });
}

function switchView(mode: "list" | "grid"): void {
  store.setViewMode(mode);
}

async function retry(): Promise<void> {
  if (keyword.value) {
    await store.search(keyword.value);
    return;
  }

  await store.search(keywordInput.value);
}

onLoad(async () => {
  await store.search("");
});

onPullDownRefresh(async () => {
  await store.refresh();
  uni.stopPullDownRefresh();
});

onReachBottom(async () => {
  await store.loadMore();
});
</script>

<template>
  <view class="app-page">
    <view class="toolbar-card">
      <view class="search-row">
        <input
          v-model="keywordInput"
          class="search-input"
          placeholder="请输入关键词搜索活动"
          confirm-type="search"
          @confirm="handleSearch"
        />
        <button class="btn-primary" size="mini" @tap="handleSearch">搜索</button>
      </view>

      <view class="view-switch">
        <button :class="viewMode === 'list' ? 'btn-primary' : 'btn-secondary'" size="mini" @tap="switchView('list')">
          列表
        </button>
        <button :class="viewMode === 'grid' ? 'btn-primary' : 'btn-secondary'" size="mini" @tap="switchView('grid')">
          网格
        </button>
      </view>
    </view>

    <StateBlock
      v-if="loading && events.length === 0"
      title="加载中..."
      subtitle="正在获取活动列表"
    />

    <StateBlock
      v-else-if="error"
      title="加载失败"
      :subtitle="error"
      :danger="true"
      action-text="重试"
      @retry="retry"
    />

    <StateBlock
      v-else-if="events.length === 0"
      title="未找到相关活动"
      subtitle="请更换关键词试试"
    />

    <template v-else>
      <view v-if="viewMode === 'list'">
        <EventListItem v-for="item in events" :key="item.id" :event="item" @select="openDetail" />
      </view>

      <view v-else class="events-grid">
        <EventGridItem v-for="item in events" :key="item.id" :event="item" @select="openDetail" />
      </view>

      <view class="footer-text" v-if="refreshing">ˢ����...</view>
      <view class="footer-text" v-else-if="loadingMore">加载更多中...</view>
      <view class="footer-text" v-else-if="!hasMore">没有更多活动了</view>
    </template>
  </view>
</template>
