import { Schema } from "mongoose";

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

export default trashItemSchema;
