import {
  appSchema,
  columnName,
  ColumnSchema,
  TableName,
  tableName,
  tableSchema,
} from "@nozbe/watermelondb";
import List from "./List";
import { tagSchema } from "./tag";
import Task from "./Task";
import { taskTagsSchema } from "./taskTags";
export const Tables = {
  Task: tableName<Task>("task"),
  List: tableName<List>("list"),
  Tag: tableName("tag"),
  TaskTags: tableName("task_tags"),
};
export type tableSchema = { name: TableName<any>; columns: ColumnSchema[] };
export const Columns = {
  task: {
    name: columnName("name"),
    subtasks: columnName("subtasks"),
    listID: columnName("list_id"),
    description: columnName("description"),
    reminder: columnName("reminder"),
    repeat: columnName("repeat"),
    isCompleted: columnName("is_completed"),
  },
  list: {
    name: columnName("name"),
    theme: columnName("theme"),
  },
  tag: {
    name: columnName("name"),
    color: columnName("color"),
  },
  taskTags: {
    taskID: columnName("task_id"),
    tagID: columnName("tag_id"),
  },
};

export default appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: Tables.List,
      columns: [
        { name: Columns.list.name, type: "string", isIndexed: true },
        { name: Columns.list.theme, type: "string" },
      ],
    }),
    tableSchema({
      name: Tables.Task,
      columns: [
        { name: Columns.task.name, type: "string" },
        { name: Columns.task.description, type: "string" },
        { name: Columns.task.subtasks, type: "string" },
        { name: Columns.task.reminder, type: "number", isOptional: true },
        { name: Columns.task.repeat, type: "string", isOptional: true },
        { name: Columns.task.listID, type: "string" },
        { name: Columns.task.isCompleted, type: "boolean" },
      ],
    }),
    tableSchema(tagSchema),
    tableSchema(taskTagsSchema),
  ],
});
