import {
  appSchema,
  columnName,
  tableName,
  tableSchema,
} from "@nozbe/watermelondb";
import List from "./List";
import Task from "./Task";
import Theme from "./Theme";

export const Tables = {
  Task: tableName<Task>("Task"),
  List: tableName<List>("List"),
  Theme: tableName<Theme>("List"),
};
export const Columns = {
  task: {
    name: columnName("name"),
    taskID: columnName("task_id"),
    subtasks: columnName("subtasks"),
    listID: columnName("list_id"),
    description: columnName("description"),
    reminder: columnName("reminder"),
    isCompleted: columnName("is_completed"),
  },
  list: {
    name: columnName("name"),
    themeID: columnName("theme_id"),
    listID: columnName("list_id"),
  },
  subtask: {
    name: columnName("name"),
    isCompleted: columnName("is_completed"),
  },
  theme: {
    themeID: columnName("theme_id"),
    mainColor: columnName("main_color"),
    secondary: columnName("secondary_color"),
  },
};

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: Tables.List,
      columns: [
        { name: Columns.list.listID, type: "string" },
        { name: Columns.list.name, type: "string", isIndexed: true },
        { name: Columns.list.themeID, type: "string" },
      ],
    }),
    tableSchema({
      name: Tables.Task,
      columns: [
        { name: Columns.task.taskID, type: "string", isIndexed: true },
        { name: Columns.task.name, type: "string" },
        { name: Columns.task.description, type: "string" },
        { name: Columns.task.reminder, type: "number", isOptional: true },
        { name: Columns.task.listID, type: "string" },
        { name: Columns.task.isCompleted, type: "boolean" },
      ],
    }),

    tableSchema({
      name: Tables.Theme,
      columns: [
        { name: Columns.theme.mainColor, type: "string" },
        { name: Columns.theme.secondary, type: "string", isOptional: true },
      ],
    }),
  ],
});
