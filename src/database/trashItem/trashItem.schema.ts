import { Schema } from "mongoose";
import { findOneOrCreate } from "./trashItem.statics";
import { setLastUpdated, sameName } from "./trashItem.methods";


const trashItemSchema = new Schema({
  name: String,
  binAssignment: String,
  isBreakable: Boolean,
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
