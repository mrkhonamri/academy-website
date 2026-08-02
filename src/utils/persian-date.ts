import moment from "moment-jalaali";

// Load Persian locale
moment.loadPersian({ usePersianDigits: true });

/**
 * Format a date to Persian format
 * Example: formatDate('2026-07-29') → '۱۴۰۵/۰۵/۰۷'
 */
export function formatDate(date: string | Date, format: string = "jYYYY/jMM/jDD"): string {
  return moment(date).format(format);
}

/**
 * Format a date to long Persian format
 * Example: formatDateLong('2026-07-29') → '۷ مرداد ۱۴۰۵'
 */
export function formatDateLong(date: string | Date): string {
  return moment(date).format("jD jMMMM jYYYY");
}

/**
 * Format a date relative to now (Persian)
 * Example: formatDateRelative('2026-07-28') → '۱ روز پیش'
 */
export function formatDateRelative(date: string | Date): string {
  return moment(date).fromNow();
}

/**
 * Format a time range
 * Example: formatTimeRange('2026-07-29T16:00', '2026-07-29T18:30') → '۱۶:۰۰ تا ۱۸:۳۰'
 */
export function formatTimeRange(start: string | Date, end: string | Date): string {
  return `${moment(start).format("HH:mm")} تا ${moment(end).format("HH:mm")}`;
}

/**
 * Get current Persian year
 */
export function getCurrentPersianYear(): number {
  return moment().jYear();
}

/**
 * Get Persian month names
 */
export function getPersianMonthName(month: number): string {
  const months = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
  ];
  return months[month - 1] || "";
}