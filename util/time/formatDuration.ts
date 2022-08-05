import humanizeDuration from "humanize-duration";

export function formatDuration(minutes: number): string {
  return humanizeDuration(minutes * 60000);
}
