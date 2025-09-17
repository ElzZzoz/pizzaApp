export function formatCurrency(value) {
  if (typeof value !== "number" || isNaN(value)) return "€0.00";
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date)) return "Invalid Date"; // Prevents crash
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function calcMinutesLeft(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date)) return 0; // Default to 0 minutes if invalid
  const d1 = Date.now();
  const d2 = date.getTime();
  return Math.round((d2 - d1) / 60000);
}
