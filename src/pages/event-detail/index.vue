<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

import StateBlock from "@/components/common/StateBlock.vue";
import { useEventStore } from "@/stores";
import { parseEventIdFromLoadOptions } from "@/pages/event-detail/route";
import type { EventDetail } from "@/types/event";

const store = useEventStore();
const detail = ref<EventDetail | null>(null);
const loading = ref(false);
const error = ref("");

function formatValue(value: string): string {
  return value || "N/A";
}

onLoad(async (options) => {
  const id = parseEventIdFromLoadOptions(options);

  if (!id) {
    error.value = "缺少或无效的活动ID";
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    detail.value = await store.fetchDetail(id);
  } catch (err) {
    error.value = err instanceof Error ? err.message : "详情加载失败";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <view class="app-page detail-page">
    <StateBlock v-if="loading" title="加载中..." subtitle="正在获取活动详情" />

    <StateBlock
      v-else-if="error"
      title="详情加载失败"
      :subtitle="error"
      :danger="true"
    />

    <view v-else-if="detail" class="detail-layout">
      <view class="detail-hero">
        <image class="detail-hero-image" :src="detail.image" mode="aspectFill" />
        <view class="detail-hero-overlay" />
        <view class="detail-hero-content">
          <view class="detail-pill">{{ detail.dateTimeText }}</view>
          <view class="detail-title">{{ detail.name }}</view>
        </view>
      </view>

      <view class="detail-section-card">
        <view class="detail-section-title">活动信息</view>
        <view class="detail-meta-grid">
          <view class="detail-meta-item">
            <view class="detail-meta-label">场馆</view>
            <view class="detail-meta-value">{{ formatValue(detail.venue) }}</view>
          </view>
          <view class="detail-meta-item">
            <view class="detail-meta-label">城市</view>
            <view class="detail-meta-value">{{ formatValue(detail.city) }}</view>
          </view>
          <view class="detail-meta-item">
            <view class="detail-meta-label">类别</view>
            <view class="detail-meta-value">{{ formatValue(detail.category) }}</view>
          </view>
          <view class="detail-meta-item">
            <view class="detail-meta-label">票价</view>
            <view class="detail-meta-value">{{ formatValue(detail.priceRange) }}</view>
          </view>
        </view>
      </view>

      <view class="detail-section-card">
        <view class="detail-section-title">活动说明</view>
        <view class="detail-copy">{{ formatValue(detail.info) }}</view>
      </view>

      <view v-if="detail.seatmap" class="detail-section-card">
        <view class="detail-section-title">座位示意图</view>
        <image class="detail-seatmap-image" :src="detail.seatmap" mode="aspectFit" />
      </view>

      <view class="detail-section-card">
        <view class="detail-section-title">官方链接</view>
        <view class="detail-link">{{ formatValue(detail.url) }}</view>
      </view>
    </view>
  </view>
</template>
