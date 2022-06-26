import { createTable, Migration } from "@nozbe/watermelondb/Schema/migrations";
import { tagSchema } from "../models/tag";
import { taskTagsSchema } from "../models/taskTags";

const ToVersion2: Migration = {
  toVersion: 2,
  steps: [createTable(tagSchema), createTable(taskTagsSchema)],
};
export default ToVersion2;
