import { listThemes, listThemesEnum, listThemeType } from "@/theme/listThemes";
import {
  associations,
  Collection,
  Model,
  TableName,
} from "@nozbe/watermelondb";
import { children, json, text, writer } from "@nozbe/watermelondb/decorators";
import { Columns, Tables } from "./schema";
import Task, { addTaskType, subtaskObject } from "./Task";
import { scheduleNotification, uid } from "./utils";

const Column = Columns.list;
export default class List extends Model {
  public static table: TableName<List> = Tables.List;
  public static associations = associations([
    Tables.Task,
    { type: "has_many", foreignKey: Columns.task.listID },
  ]);
  @text(Column.name) name!: string;
  @children(Tables.Task) tasks!: Collection<Task>;
  @json(Column.theme, json => json) theme!: listThemeType;

  @writer async addTask(t: addTaskType) {
    await this.database.get<Task>(Tables.Task).create(task => {
      const id = uid();
      if (t.reminder) {
        task.reminder = new Date(t.reminder);
        scheduleNotification({
          name: t.name,
          id,
          date: t.reminder,
          description: t.description,
        });
      } else {
        task.reminder = null;
      }
      task.list.set(this);
      task.description = t.description;
      task.name = t.name;
      task.isCompleted = false;
      const subtasks: subtaskObject = {};
      t.subtasks.map(i => {
        const id = uid(8);
        subtasks[id] = {
          isCompleted: false,
          name: i,
          id: id,
        };
        task.subtasks = subtasks;
      });
      task.id = id;
    });
  }
  @writer changeTheme(newTheme: listThemeType | listThemesEnum) {
    return this.update(r => {
      if (typeof newTheme === "string") {
        r.theme = listThemes[newTheme];
        return;
      }
      r.theme = newTheme;
    });
  }
  @writer changeName(newName: string) {
    return this.update(r => {
      r.name = newName;
    });
  }
}
