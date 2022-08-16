import { Item } from "../types/Item.type";

export function sameMaster(item: Item, other: Item): boolean {
  if (item.repeatData.repeats && other.repeatData.repeats) {
    return item.repeatData.masterId === other.repeatData.masterId;
  }
  return false;
}
