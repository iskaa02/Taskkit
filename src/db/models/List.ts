import { listThemeType } from "@/theme/listThemes";
import { Model, Query } from "@nozbe/watermelondb";
import { children, json, text, writer } from "@nozbe/watermelondb/decorators";
import { associations } from "@nozbe/watermelondb/Model";
import { Columns, Tables } from "./schema";
import Task from "./Task";

const Column = Columns.list;
export default class List extends Model {
  public static table = Tables.List;
  public static associations = associations([
    Tables.Task,
    { type: "has_many", foreignKey: Columns.task.listID },
  ]);
  @text(Column.name) name!: string;
  @children("task") tasks!: Query<Task>;
  @json(Column.theme, json => json) theme!: listThemeType;

  @writer async markAsDeleted() {
    const tasks = await this.tasks.fetch();
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
