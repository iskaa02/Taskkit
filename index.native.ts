import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { registerRootComponent } from "expo";
import { LogBox } from "react-native";
import App from "./App";
import Group from "./model/Group";
import List from "./model/List";
import schema from "./model/schema";
import Task from "./model/Task";

// const adapter = new SQLiteAdapter({
//   schema,
//   // dbName: 'myapp',
//   // jsi: true,
//   // (optional, but you should implement this method)
//   onSetUpError: error => {
//     // Database failed to load -- offer the user to reload the app or log out
//   },
// });
// LogBox.ignoreLogs(["Require cycle are allowed", "Require cycle:"]);

// export const database = new Database({
//   adapter,
//   modelClasses: [
//     Task,
//     List,
//     Group,
//     // Post, // ⬅️ You'll add Models to Watermelon here
//   ],
// });
registerRootComponent(App);
