export function toDateInputValue(value) {
  if (!value) {
    return "";
  }

  const date =
    typeof value.toDate === "function"
      ? value.toDate()
      : value instanceof Date
        ? value
        : new Date(value);

  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

export function formatStoredDate(value) {
  const inputValue = toDateInputValue(value);
  if (!inputValue) {
    return "Not recorded";
  }

  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${inputValue}T00:00:00.000Z`));
}

export function dateFromInputValue(value) {
  return value ? new Date(`${value}T00:00:00.000Z`) : null;
}
