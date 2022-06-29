import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import Tag from "./models/tag";
import migrations from "./migrations/migrations";
import List from "./models/List";
import schema from "./models/schema";
import Task from "./models/Task";
import TaskTags from "./models/taskTags";
const adapter = new SQLiteAdapter({
  schema,
  dbName: "taskkit",
  jsi: false,
  migrations: migrations,
  onSetUpError: err => {
    console.log(err);
  },
});
export const database = new Database({
  adapter,
  modelClasses: [Task, List, Tag, TaskTags],
});
