import { ref } from "vue";
import { onPageScroll, onReachBottom } from "@dcloudio/uni-app";

interface MescrollLike {
  resetUpScroll?: () => void;
  onPageScroll?: (event: unknown) => void;
  onReachBottom?: () => void;
}

export function useMescroll<T extends MescrollLike>() {
  const mescrollRef = ref<MescrollLike | null>(null);

  function mescrollInit(instance: T): void {
    mescrollRef.value = instance;
  }

  function getMescroll(): T | null {
    return mescrollRef.value as T | null;
  }

  function resetUpScroll(): void {
    mescrollRef.value?.resetUpScroll?.();
  }

  onPageScroll((event) => {
    mescrollRef.value?.onPageScroll?.(event);
  });

  onReachBottom(() => {
    mescrollRef.value?.onReachBottom?.();
  });

  return {
    mescrollInit,
    getMescroll,
    resetUpScroll
  };
}
