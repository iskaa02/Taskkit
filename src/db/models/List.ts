import { listThemes, listThemesEnum, listThemeType } from "@/theme/listThemes";
import {
  associations,
  Collection,
  Model,
  TableName,
} from "@nozbe/watermelondb";
import { children, json, writer } from "@nozbe/watermelondb/decorators";
import field from "@nozbe/watermelondb/decorators/field";
import { Columns, Tables } from "./schema";
import Task, { addTaskType } from "./Task";
import { uid } from "./utils";

const Column = Columns.list;
export default class List extends Model {
  public static table: TableName<List> = Tables.List;
  public static associations = associations([
    Tables.Task,
    { type: "has_many", foreignKey: "list_id" },
  ]);
  @field(Column.name) name!: string;
  @children(Tables.Task) tasks!: Collection<Task>;
  @json(Column.theme, json => json) theme!: listThemeType;

  @writer async addTask(t: addTaskType) {
    return await this.collections.get<Task>(Tables.Task).create(task => {
      if (t.reminder) task.reminder.setDate(t.reminder.valueOf());
      task.description = t.description;
      task.name = t.name;
      task.isCompleted = false;
      task.id = uid();
      task.list.set(this);
    });
  }
  @writer async changeTheme(newTheme: listThemeType | listThemesEnum) {
    this.update(r => {
      if (typeof newTheme === "string") {
        r.theme = listThemes[newTheme];
        return;
      }
      r.theme = newTheme;
    });
  }
  @writer async changeName(newName: string) {
    await this.update(r => {
      r.name = newName;
    });
  }
}
