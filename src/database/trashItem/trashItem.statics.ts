import { TrashItemDocument, TrashItemModel } from './trashItem.types';



export async function findOneOrCreate(this: any,
  name: string
): Promise<TrashItemDocument> {
  const record = await this.findOne({ name });
  if (record) {
    return record;
  } else {
    return this.create({ name });
  }
}
