import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { LogBox } from "react-native";
import Group from "./models/Group";
import List from "./models/List";
import schema from "./models/schema";
import Task from "./models/Task";

const adapter = new SQLiteAdapter({
  schema,
  dbName: "taskkit",
  // jsi: true,
  onSetUpError: error => {},
});

export const database = new Database({
  adapter,
  modelClasses: [Task, List, Group],
});
