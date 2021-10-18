import { Schema } from "mongoose";
import { findOneOrCreate } from "./trashItem.statics";
import { setLastUpdated, sameName } from "./trashItem.methods";
import { server } from "../../server";


const trashItemSchema = new Schema({
  name: { type: String, required: true },
  binAssignment: { type: String, required: true },
  isBreakable: { type: Boolean, required: true },
  dateOfEntry: {
    type: Date,
    default: new Date()
  },
  lastUpdated: {
    type: Date,
    default: new Date()
  }
});

trashItemSchema.statics.findOneOrCreate = findOneOrCreate;
trashItemSchema.methods.setLastUpdated = setLastUpdated;
trashItemSchema.methods.sameLastName = sameName;

export default trashItemSchema;
