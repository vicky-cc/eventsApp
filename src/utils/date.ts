export function formatDateTime(dateTime?: string, localDate?: string, localTime?: string): string {
  if (localDate && localTime) {
    return `${localDate} ${localTime.slice(0, 5)}`;
  }

  if (localDate) {
    return localDate;
  }

  if (dateTime) {
    const date = new Date(dateTime);
    if (!Number.isNaN(date.getTime())) {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    }
  }

  return "TBA";
}
