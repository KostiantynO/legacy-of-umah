// src\components\PreviewList\lib\fromNow.ts
export const fromNow = (time: Date): string => {
  const diffMs = Date.now() - new Date(time).getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const monthsApprox = Math.floor(days / 30);
  const yearsApprox = Math.floor(days / 365);

  if (yearsApprox > 0) return `${yearsApprox.toString(10)}y`;
  if (monthsApprox > 0) return `${monthsApprox.toString(10)}mon`;
  if (weeks > 0) return `${weeks.toString(10)}w`;
  if (days > 0) return `${days.toString(10)}d`;
  if (hours > 0) return `${hours.toString(10)}h`;
  if (minutes > 0) return `${minutes.toString(10)}min`;
  return `${seconds.toString(10)}sec`;
};
