import { Document } from "mongoose";
import { TrashItemDocument } from './trashItem.types';

export async function setLastUpdated(this: TrashItemDocument): Promise<void> {
  const now = new Date();
  if (!this.lastUpdated || this.lastUpdated < now) {
    this.lastUpdated = now;
    await this.save();
  }
}

export async function sameName(this: TrashItemDocument): Promise<Document[]> {
  return this.model('trashItem').find({ name: this.name });
}
