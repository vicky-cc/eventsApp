const DEFAULT_SEARCH_SHELL_HEIGHT = 120;

export function buildListContainerHeight(searchShellHeight: number): string {
  const normalizedHeight = Number.isFinite(searchShellHeight) && searchShellHeight > 0
    ? Math.ceil(searchShellHeight)
    : DEFAULT_SEARCH_SHELL_HEIGHT;

  return `calc(100vh - ${normalizedHeight}px - env(safe-area-inset-bottom))`;
}
