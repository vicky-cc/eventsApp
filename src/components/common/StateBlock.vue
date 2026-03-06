<script setup lang="ts">
const props = defineProps<{
  title: string;
  subtitle?: string;
  danger?: boolean;
  actionText?: string;
}>();

const emit = defineEmits<{
  retry: [];
}>();

function onActionTap(): void {
  emit("retry");
}
</script>

<template>
  <view class="state-block">
    <text class="state-title" :class="{ danger: props.danger }">{{ props.title }}</text>
    <view v-if="props.subtitle" class="state-subtitle">{{ props.subtitle }}</view>
    <button v-if="props.actionText" size="mini" @tap="onActionTap">
      {{ props.actionText }}
    </button>
  </view>
</template>

