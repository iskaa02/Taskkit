import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import List from "./models/List";
import schema from "./models/schema";
import Task from "./models/Task";
const adapter = new SQLiteAdapter({
  schema,
  dbName: "taskkit",
  jsi: false,
  onSetUpError: err => {
    console.log(err);
  },
});
export const database = new Database({
  adapter,
  modelClasses: [Task, List],
});
