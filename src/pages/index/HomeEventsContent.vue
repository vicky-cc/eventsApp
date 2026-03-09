<script setup lang="ts">
import StateBlock from "@/components/common/StateBlock.vue";
import EventGridItem from "@/components/event/EventGridItem.vue";
import EventListItem from "@/components/event/EventListItem.vue";
import { resolveHomeContentState } from "@/pages/index/contentState";
import type { EventSummary } from "@/types/event";
import { computed } from "vue";

const props = defineProps<{
  events: EventSummary[];
  loading: boolean;
  error: string;
  viewMode: "list" | "grid";
}>();

const emit = defineEmits<{
  retry: [];
  openDetail: [id: string];
}>();

const skeletonRows = [1, 2, 3, 4];

function retry(): void {
  emit("retry");
}

function openDetail(id: string): void {
  emit("openDetail", id);
}

const contentState = computed(() =>
  resolveHomeContentState({
    loading: props.loading,
    error: props.error,
    eventsLength: props.events.length
  })
);
</script>

<template>
  <view class="events-content">
    <view v-show="contentState.showLoading" class="skeleton-wrap">
      <view v-if="viewMode === 'list'" class="skeleton-list">
        <view v-for="row in skeletonRows" :key="row" class="skeleton-card skeleton-card-list">
          <view class="skeleton-block skeleton-media" />
          <view class="skeleton-body">
            <view class="skeleton-block skeleton-title" />
            <view class="skeleton-block skeleton-subtitle" />
          </view>
        </view>
      </view>

      <view v-else class="skeleton-grid">
        <view v-for="row in skeletonRows" :key="row" class="skeleton-card skeleton-card-grid">
          <view class="skeleton-block skeleton-media" />
          <view class="skeleton-body">
            <view class="skeleton-block skeleton-title" />
            <view class="skeleton-block skeleton-subtitle" />
          </view>
        </view>
      </view>
    </view>

    <StateBlock
      v-show="contentState.showError"
      title="加载失败"
      :subtitle="error"
      :danger="true"
      action-text="重试"
      @retry="retry"
    />

    <StateBlock
      v-show="contentState.showEmpty"
      title="未找到相关活动"
      subtitle="请更换关键词试试"
    />

    <view v-show="contentState.showList">
      <view v-if="viewMode === 'list'" class="events-list">
        <EventListItem v-for="item in events" :key="item.id" :event="item" @select="openDetail" />
      </view>

      <view v-else class="events-grid">
        <EventGridItem v-for="item in events" :key="item.id" :event="item" @select="openDetail" />
      </view>
    </view>
  </view>
</template>
