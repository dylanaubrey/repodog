import sortObjectKeys from "sort-object-keys";
import { JsonObject } from "type-fest";
import { SortObjectComparator } from "../type-defs";

export default function sortObject<O extends JsonObject>(obj: O, comparator?: SortObjectComparator<O>) {
  return sortObjectKeys(obj, comparator);
}
