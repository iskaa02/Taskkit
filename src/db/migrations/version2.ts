import { createTable, Migration } from "@nozbe/watermelondb/Schema/migrations";
import { tagSchema, taskTagsSchema } from "../models/schema";

const ToVersion2: Migration = {
  toVersion: 2,
  steps: [createTable(tagSchema), createTable(taskTagsSchema)],
};
export default ToVersion2;
