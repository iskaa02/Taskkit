import {
  associations,
  Collection,
  Model,
  TableName,
} from "@nozbe/watermelondb";
import { children, writer } from "@nozbe/watermelondb/decorators";
import field from "@nozbe/watermelondb/decorators/field";
import Group from "./Group";
import { Columns, Tables } from "./schema";
import Task, { addTaskType } from "./Task";

const Column = Columns.list;
enum themeEnum {
  "Purple",
}
export default class List extends Model {
  public static table: TableName<List> = Tables.List;
  public static associations = associations(
    [Tables.Task, { type: "has_many", foreignKey: Column.listID }],
    [Tables.Group, { type: "has_many", foreignKey: Column.listID }]
  );

  @field(Column.name) name!: string;
  @field(Column.theme) theme!: themeEnum;
  @field(Column.listID) listID!: string;

  @children(Tables.Task)
  tasks!: Collection<Task>;
  @children(Tables.Group)
  groups!: Collection<Group>;

  @writer async addTask(t: addTaskType) {
    return await this.collections.get<Task>(Tables.Task).create(task => {
      task.reminder.setDate(t.reminder.valueOf());
      task.description = t.description;
      task.name = t.name;
      task.isCompleted = false;
      const id = uid();
      task.id = id;
      task.taskID = id;
      task.list.set(this);
    });
  }
  @writer async addGroup(name: string) {
    return await this.collections.get<Group>(Tables.Group).create(group => {
      group.list.set(this);
      group.name = name;
      const id = uid();
      group.id = id;
      group.groupID = id;
    });
  }
  @writer changeTheme(theme: themeEnum) {
    this.theme = theme;
  }
}
