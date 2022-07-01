import { Model, TableName } from "@nozbe/watermelondb";
import { immutableRelation } from "@nozbe/watermelondb/decorators";
import { associations } from "@nozbe/watermelondb/Model";
import Relation from "@nozbe/watermelondb/Relation";
import { Columns, Tables } from "./schema";
import Tag from "./tag";
import Task from "./Task";

const Column = Columns.taskTags;
export default class TaskTags extends Model {
  public static table: TableName<TaskTags> = Tables.TaskTags;
  public static associations = associations(
    [Tables.Tag, { type: "belongs_to", key: Column.tagID }],
    [Tables.Task, { type: "belongs_to", key: Column.taskID }]
  );
  @immutableRelation(Tables.Tag, Column.tagID) tag!: Relation<Tag>;
  @immutableRelation(Tables.Task, Column.taskID) task!: Relation<Task>;
}
