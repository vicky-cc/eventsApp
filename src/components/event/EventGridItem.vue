<script setup lang="ts">
import type { EventSummary } from "@/types/event";

const props = defineProps<{
  event: EventSummary;
}>();

const emit = defineEmits<{
  select: [id: string];
}>();

function openDetail(): void {
  emit("select", props.event.id);
}
</script>

<template>
  <view class="card" @tap="openDetail">
    <image :src="props.event.image" mode="aspectFill" style="width: 100%; height: 210rpx" />
    <view class="card-body">
      <view class="card-title card-title-grid">{{ props.event.name }}</view>
      <view class="card-meta">{{ props.event.dateTimeText }}</view>
    </view>
  </view>
</template>
