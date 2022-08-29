export function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.substring(1);
}

export function padLeadingZero(num: number) {
  return num < 10 ? "0" + num : num.toString();
}

export function itemTypeName(itemType: "event" | "deadline") {
  return itemType === "event" ? "event" : "task";
}
