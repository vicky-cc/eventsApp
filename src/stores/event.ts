import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { eventService } from "@/services/eventService";
import type { EventDetail, EventService, EventSummary, ViewMode } from "@/types/event";

export function createEventStore(service: EventService = eventService) {
  return defineStore("event", () => {
    const events = ref<EventSummary[]>([]);
    const detailMap = ref<Record<string, EventDetail>>({});
    const keyword = ref("");
    const page = ref(0);
    const size = ref(20);
    const totalPages = ref(1);
    const loading = ref(false);
    const refreshing = ref(false);
    const loadingMore = ref(false);
    const error = ref("");
    const viewMode = ref<ViewMode>("list");

    const hasMore = computed(() => page.value + 1 < totalPages.value);

    async function fetchPage(nextPage: number, append: boolean): Promise<void> {
      const result = await service.getEvents({
        keyword: keyword.value,
        page: nextPage,
        size: size.value
      });

      page.value = result.page;
      totalPages.value = result.totalPages;
      events.value = append ? [...events.value, ...result.items] : result.items;
    }

    async function search(nextKeyword: string): Promise<void> {
      if (loading.value || refreshing.value || loadingMore.value) {
        return;
      }

      keyword.value = nextKeyword.trim();
      loading.value = true;
      error.value = "";

      try {
        await fetchPage(0, false);
      } catch (err) {
        error.value = err instanceof Error ? err.message : "Search failed";
      } finally {
        loading.value = false;
      }
    }

    async function refresh(): Promise<void> {
      if (loading.value || refreshing.value || loadingMore.value) {
        return;
      }

      refreshing.value = true;
      error.value = "";

      try {
        await fetchPage(0, false);
      } catch (err) {
        error.value = err instanceof Error ? err.message : "Refresh failed";
      } finally {
        refreshing.value = false;
      }
    }

    async function loadMore(): Promise<void> {
      if (loading.value || refreshing.value || loadingMore.value || !hasMore.value) {
        return;
      }

      loadingMore.value = true;
      error.value = "";

      try {
        await fetchPage(page.value + 1, true);
      } catch (err) {
        error.value = err instanceof Error ? err.message : "Load more failed";
      } finally {
        loadingMore.value = false;
      }
    }

    async function fetchDetail(id: string): Promise<EventDetail> {
      if (detailMap.value[id]) {
        return detailMap.value[id];
      }

      const detail = await service.getEventDetail(id);
      detailMap.value = {
        ...detailMap.value,
        [id]: detail
      };

      return detail;
    }

    function setViewMode(mode: ViewMode): void {
      viewMode.value = mode;
    }

    return {
      events,
      detailMap,
      keyword,
      page,
      size,
      totalPages,
      hasMore,
      loading,
      refreshing,
      loadingMore,
      error,
      viewMode,
      search,
      refresh,
      loadMore,
      fetchDetail,
      setViewMode
    };
  });
}

export const useEventStore = createEventStore();
