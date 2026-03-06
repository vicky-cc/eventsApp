<script setup lang="ts">
import StateBlock from "@/components/common/StateBlock.vue";
import EventGridItem from "@/components/event/EventGridItem.vue";
import EventListItem from "@/components/event/EventListItem.vue";
import type { EventSummary } from "@/types/event";

interface HomeUiText {
  loadingTitle: string;
  loadingSubtitle: string;
  errorTitle: string;
  retry: string;
  emptyTitle: string;
  emptySubtitle: string;
}

const props = defineProps<{
  events: EventSummary[];
  loading: boolean;
  error: string;
  viewMode: "list" | "grid";
  uiText: HomeUiText;
}>();

const emit = defineEmits<{
  retry: [];
  openDetail: [id: string];
}>();

function retry(): void {
  emit("retry");
}

function openDetail(id: string): void {
  emit("openDetail", id);
}
</script>

<template>
  <view class="events-content">
    <StateBlock
      v-show="loading && events.length === 0"
      :title="uiText.loadingTitle"
      :subtitle="uiText.loadingSubtitle"
    />

    <StateBlock
      v-show="!loading && !!error"
      :title="uiText.errorTitle"
      :subtitle="error"
      :danger="true"
      :action-text="uiText.retry"
      @retry="retry"
    />

    <StateBlock
      v-show="!loading && !error && events.length === 0"
      :title="uiText.emptyTitle"
      :subtitle="uiText.emptySubtitle"
    />

    <view v-show="events.length > 0 && !error">
      <view v-if="viewMode === 'list'" class="events-list">
        <EventListItem v-for="item in events" :key="item.id" :event="item" @select="openDetail" />
      </view>

      <view v-else class="events-grid">
        <EventGridItem v-for="item in events" :key="item.id" :event="item" @select="openDetail" />
      </view>
    </view>
  </view>
</template>
