export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  defaultPageSize: 20,
  maxPageSize: 100,
  searchDebounceMs: 300,
  toastDurationMs: 4000,
} as const;

export type Config = typeof config;