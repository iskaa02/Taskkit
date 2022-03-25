import { Collection, Model, Relation, TableName } from "@nozbe/watermelondb";
import {
  immutableRelation,
  children,
  writer,
  field,
} from "@nozbe/watermelondb/decorators";
import { associations, Associations } from "@nozbe/watermelondb/Model";
import List from "./List";
import { Columns, Tables } from "./schema";
import Task, { addTaskType } from "./Task";

const Column = Columns.group;
export default class Group extends Model {
  public static table: TableName<Group> = Tables.Group;
  public static associations = associations(
    [Tables.Task, { type: "has_many", foreignKey: Column.groupID }],
    [Tables.List, { type: "belongs_to", key: Column.listID }]
  );

  @field(Column.groupID) groupID!: string;
  @field(Column.name) name!: string;
  @immutableRelation(Tables.List, Column.listID)
  list!: Relation<List>;
  @children(Tables.Task)
  task!: Collection<Task>;

  @writer async addTask(t: addTaskType) {
    return await this.collections.get<Task>(Tables.Task).create(async task => {
      task.reminder = t.reminder;
      task.description = t.description;
      task.name = t.name;
      task.isCompleted = false;
      const id = uid();
      task.id = id;
      task.taskID = id;
      const list = await this.list.fetch();
      task.list.set(list);
      task.group!.set(this);
    });
  }
}
