export interface ResolveHomeContentStateInput {
  loading: boolean;
  error: string;
  eventsLength: number;
}

export interface HomeContentState {
  showLoading: boolean;
  showError: boolean;
  showEmpty: boolean;
  showList: boolean;
}

export function resolveHomeContentState({
  loading,
  error,
  eventsLength
}: ResolveHomeContentStateInput): HomeContentState {
  const showLoading = loading && eventsLength === 0;
  const showError = !loading && !!error && eventsLength === 0;
  const showEmpty = !loading && !error && eventsLength === 0;
  const showList = eventsLength > 0;

  return {
    showLoading,
    showError,
    showEmpty,
    showList
  };
}
