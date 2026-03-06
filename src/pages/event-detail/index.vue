<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

import StateBlock from "@/components/common/StateBlock.vue";
import { useEventStore } from "@/stores";
import type { EventDetail } from "@/types/event";

const store = useEventStore();
const detail = ref<EventDetail | null>(null);
const loading = ref(false);
const error = ref("");

function formatValue(value: string): string {
  return value || "N/A";
}

onLoad(async (options) => {
  const id = options?.id;

  if (!id || Array.isArray(id)) {
    error.value = "缺少活动ID";
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
  <view class="app-page">
    <StateBlock v-if="loading" title="加载中..." subtitle="正在获取活动详情" />

    <StateBlock
      v-else-if="error"
      title="详情加载失败"
      :subtitle="error"
      :danger="true"
    />

    <view v-else-if="detail" class="card">
      <image :src="detail.image" mode="aspectFill" style="width: 100%; height: 360rpx" />
      <view class="card-body">
        <view class="card-title">{{ detail.name }}</view>
        <view class="card-meta">时间：{{ detail.dateTimeText }}</view>
        <view class="card-meta">地点：{{ detail.venue }} · {{ detail.city }}</view>
        <view class="card-meta">类别：{{ formatValue(detail.category) }}</view>
        <view class="card-meta">票价：{{ formatValue(detail.priceRange) }}</view>
        <view class="card-meta">说明：{{ formatValue(detail.info) }}</view>
        <view class="card-meta">官方链接：{{ formatValue(detail.url) }}</view>
      </view>
    </view>
  </view>
</template>
