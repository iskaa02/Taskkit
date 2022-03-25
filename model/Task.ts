import { Collection, Model, Relation, TableName } from "@nozbe/watermelondb";
import { field, immutableRelation, text } from "@nozbe/watermelondb/decorators";
import action, { writer } from "@nozbe/watermelondb/decorators/action";
import date from "@nozbe/watermelondb/decorators/date";
import { associations } from "@nozbe/watermelondb/Model";
import Group from "./Group";
import List from "./List";
import { Columns, Tables } from "./schema";

const Column = Columns.task;
export type addTaskType = {
  name: string;
  description: string;
  reminder: Date;
};

export default class Task extends Model {
  public static table: TableName<Task> = Tables.Task;
  public static associations = associations(
    [Tables.List, { type: "belongs_to", key: "list_id" }],
    [Tables.Group, { type: "belongs_to", key: "group_id" }]
  );

  @text(Column.name)
  name!: string;
  @field(Column.taskID)
  taskID!: string;
  @field(Column.isCompleted)
  isCompleted!: boolean;
  @field(Column.description)
  description!: string;
  @date(Column.reminder) reminder!: Date;
  @immutableRelation(Tables.Group, Column.groupID)
  group?: Relation<Group>;
  @immutableRelation(Tables.List, Column.listID)
  list!: Relation<List>;
}
