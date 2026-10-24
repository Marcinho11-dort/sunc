const nf = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 });

export const fmt = (n: number): string => nf.format(n);

export const fmtDays = (days: number): string => {
  if (days >= 365 * 2) return `${fmt(days / 365.25)} лет`;
  return `${fmt(days)} сут.`;
};

export const fmtHours = (h: number): string => {
  if (h >= 48) return `${fmt(h / 24)} сут.`;
  return `${fmt(h)} ч`;
};

export const clamp = (v: number, min: number, max: number): number => Math.min(max, Math.max(min, v));
