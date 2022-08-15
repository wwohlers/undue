export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}

export function padLeadingZero(num: number) {
  return num < 10 ? "0" + num : num.toString();
}
