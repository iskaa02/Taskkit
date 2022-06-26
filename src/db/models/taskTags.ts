import { Model } from "@nozbe/watermelondb";
import { immutableRelation } from "@nozbe/watermelondb/decorators";
import { Associations } from "@nozbe/watermelondb/Model";
import Relation from "@nozbe/watermelondb/Relation";
import { Columns, Tables } from "./schema";
import Tag from "./tag";
import Task from "./Task";

const Column = Columns.taskTags;
export default class TaskTags extends Model {
  public static associations: Associations = {
    task: {
      type: "belongs_to",
      key: Column.taskID,
    },
    tag: {
      type: "belongs_to",
      key: Column.tagID,
    },
  };
  @immutableRelation(Tables.Tag, Column.tagID) tag!: Relation<Tag>;
  @immutableRelation(Tables.Task, Column.taskID) task!: Relation<Task>;
}
