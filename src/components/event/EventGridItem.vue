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
  <view class="event-card event-card-grid" @tap="openDetail">
    <view class="event-media event-media-grid">
      <image class="event-image event-image-grid" :src="props.event.image" mode="aspectFill" />
      <view class="event-media-overlay" />
      <view class="event-chip event-chip-top">{{ props.event.dateTimeText }}</view>
    </view>

    <view class="event-body event-body-grid">
      <view class="event-title event-title-grid">{{ props.event.name }}</view>
      <view class="event-meta-row">
        <text class="event-tag event-tag-compact">{{ props.event.city }}</text>
      </view>
    </view>
  </view>
</template>
