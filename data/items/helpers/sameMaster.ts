import { Item } from "../Item.type";

export function sameMaster(item: Item, other: Item): boolean {
  return item.masterId === other.masterId;
}
