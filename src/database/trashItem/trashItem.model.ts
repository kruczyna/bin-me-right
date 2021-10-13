import { model } from "mongoose";
import trashItemSchema from "./trashItem.schema";
import { TrashItemDocument } from "./trashItem.types";

export const TrashItemModel = model<TrashItemDocument>('trashItem', trashItemSchema);
