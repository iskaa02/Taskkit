import {
  appSchema,
  columnName,
  tableName,
  tableSchema,
} from "@nozbe/watermelondb";
import Group from "./Group";
import List from "./List";
import Task from "./Task";

export const Tables = {
  Task: tableName<Task>("Task"),
  Group: tableName<Group>("Group"),
  List: tableName<List>("List"),
};
export const Columns = {
  task: {
    name: columnName("name"),
    taskID: columnName("task_id"),
    groupID: columnName("group_id"),
    listID: columnName("list_id"),
    description: columnName("description"),
    reminder: columnName("reminder"),
    isCompleted: columnName("is_completed"),
  },
  list: {
    name: columnName("name"),
    theme: columnName("theme"),
    listID: columnName("list_id"),
  },
  group: {
    name: columnName("name"),
    groupID: columnName("group_id"),
    listID: columnName("list_id"),
  },
};

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: Tables.List,
      columns: [
        { name: Columns.list.listID, type: "string" },
        { name: Columns.list.name, type: "string" },
        { name: Columns.list.theme, type: "string" },
      ],
    }),
    tableSchema({
      name: Tables.Group,
      columns: [
        { name: Columns.group.groupID, type: "string", isIndexed: true },
        { name: Columns.group.name, type: "string" },
      ],
    }),
    tableSchema({
      name: Tables.Task,
      columns: [
        { name: Columns.task.taskID, type: "string", isIndexed: true },
        { name: Columns.task.name, type: "string" },
        { name: Columns.task.description, type: "string" },
        { name: Columns.task.reminder, type: "number" },
        { name: Columns.task.listID, type: "string" },
        { name: Columns.task.groupID, type: "string", isOptional: true },
        { name: Columns.task.isCompleted, type: "boolean" },
      ],
    }),
  ],
});
