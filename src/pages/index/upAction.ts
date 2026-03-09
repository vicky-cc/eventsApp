export interface ShouldRunSearchInput {
  isFirstPage: boolean;
  forceSearch: boolean;
  inputKeyword: string;
  storeKeyword: string;
}

export function shouldRunSearch({
  isFirstPage,
  forceSearch,
  inputKeyword,
  storeKeyword
}: ShouldRunSearchInput): boolean {
  if (isFirstPage || forceSearch) {
    return true;
  }

  return inputKeyword.trim() !== storeKeyword.trim();
}
