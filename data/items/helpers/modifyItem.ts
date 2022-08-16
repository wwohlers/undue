import { Item } from "../types/Item.type";

export function modifyItem(item: Item, partial: Partial<Item>): Item {
  return {
    ...item,
    ...partial,
    reminders: partial.reminders ?? item.reminders,
    repeatData: partial.repeatData ?? item.repeatData,
    metadata: partial.metadata ?? item.metadata,
  } as Item;
}
