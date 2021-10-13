import { Document, Model } from "mongoose";

export interface TrashItem {
  name: string;
  binAssignment: string;
  isBreakable: boolean;
  dateOfEntry?: Date;
  lastUpdated?: Date;
}

export interface TrashItemDocument extends TrashItem, Document {
  setLastUpdated: (this: TrashItemDocument) => Promise<void>;
  sameName: (this: TrashItemDocument) => Promise<Document[]>;
}
export interface TrashItemModel extends Model<TrashItemDocument> {
  findOneOrCreate: (
    {
      name,
      binAssignment,
      isBreakable,
    }: { name: string; binAssignment: string; isBreakable: number; }
  ) => Promise<TrashItemDocument>;
}
