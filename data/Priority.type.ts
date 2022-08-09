export enum Priority {
  HIGH = "HIGH",
  MED = "MEDIUM",
  LOW = "LOW",
}

export function sortByPriority<K extends { priority: Priority }>(arr: K[]): K[] {
  return [...arr].sort((a, b) => {
    if (a.priority === Priority.HIGH) return -1;
    else if (a.priority === Priority.LOW) return 1;
    if (b.priority === Priority.HIGH) return 1;
    return -1;
  })
}