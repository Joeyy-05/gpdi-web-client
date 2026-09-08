const trimTrailingSlash = (value) => value?.replace(/\/$/, "") || "";

export const contentStorageUrl = trimTrailingSlash(
  import.meta.env.VITE_CONTENT_STORAGE_URL,
);

export const eventStorageUrl = trimTrailingSlash(
  import.meta.env.VITE_EVENT_STORAGE_URL,
);
