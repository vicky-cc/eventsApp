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
  <view class="event-card event-card-list" @tap="openDetail">
    <view class="event-media event-media-list">
      <image class="event-image event-image-list" :src="props.event.image" mode="aspectFill" />
      <view class="event-media-overlay" />
      <view class="event-chip event-chip-top">{{ props.event.dateTimeText }}</view>
    </view>

    <view class="event-body event-body-list">
      <view class="event-title">{{ props.event.name }}</view>
      <view class="event-meta-row">
        <text class="event-tag">{{ props.event.venue }}</text>
        <text class="event-tag">{{ props.event.city }}</text>
      </view>
    </view>
  </view>
</template>
