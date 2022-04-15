import { listThemeType } from "@/theme/listThemes";
import { Model, Query } from "@nozbe/watermelondb";
import { children, json, text, writer } from "@nozbe/watermelondb/decorators";
import { Associations } from "@nozbe/watermelondb/Model";
import { Columns, Tables } from "./schema";
import Task, { addTaskType, subtaskObject } from "./Task";
import { scheduleNotification, uid } from "./utils";

const Column = Columns.list;
export default class List extends Model {
  public static table = Tables.List;
  public static associations: Associations = {
    task: {
      type: "has_many",
      foreignKey: Columns.task.listID,
    },
  };
  @text(Column.name) name!: string;
  @children("task") tasks!: Query<Task>;
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
        const id = uid(6);
        subtasks[id] = {
          isCompleted: false,
          name: i,
        };
        task.subtasks = subtasks;
      });
      task.id = id;
    });
  }
  @writer async markAsDeleted() {
    const tasks = await this.collections.get<Task>(Tables.Task).query().fetch();
    const deleted = tasks.map(task => {
      task.cancelNotification();
      return task.prepareMarkAsDeleted();
    });
    await this.database.batch(...deleted, super.prepareMarkAsDeleted());
  }

  @writer async editList({ name, theme }: editListType) {
    this.update(r => {
      if (name) r.name = name;
      if (theme) r.theme = theme;
    });
  }
}
type editListType = {
  name?: string;
  theme?: listThemeType;
};
