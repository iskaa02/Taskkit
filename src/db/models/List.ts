import { listThemeType } from "@/theme/listThemes";
import {
  associations,
  Collection,
  Model,
  TableName,
} from "@nozbe/watermelondb";
import { children, relation, writer } from "@nozbe/watermelondb/decorators";
import field from "@nozbe/watermelondb/decorators/field";
import Relation from "@nozbe/watermelondb/Relation";
import { Columns, Tables } from "./schema";
import Task, { addTaskType } from "./Task";
import Theme from "./Theme";
import { uid } from "./utils";

const Column = Columns.list;
export default class List extends Model {
  public static table: TableName<List> = Tables.List;
  public static associations = associations(
    [Tables.Task, { type: "has_many", foreignKey: Column.listID }],
    [Tables.Theme, { type: "belongs_to", key: Column.themeID }]
  );

  @field(Column.name) name!: string;
  @field(Column.listID) listID!: string;

  @children(Tables.Task)
  tasks!: Collection<Task>;
  @relation(Tables.Theme, Column.themeID)
  theme!: Relation<Theme>;

  @writer async addTask(t: addTaskType) {
    return await this.collections.get<Task>(Tables.Task).create(task => {
      if (t.reminder) task.reminder.setDate(t.reminder.valueOf());
      task.description = t.description;
      task.name = t.name;
      task.isCompleted = false;
      const id = uid();
      task.id = id;
      task.taskID = id;
      task.list.set(this);
    });
  }
  @writer async changeTheme({ theme, themeID }: changeThemeType) {
    if (themeID)
      this.update(async r => {
        const t = await this.database.get<Theme>(Tables.Theme).find(themeID);
        r.theme.set(t);
      });
    if (theme) {
      const t = await this.database.get<Theme>(Tables.Theme).create(r => {
        r.main = theme.main;
        r.secondary = theme.secondary;
        r.id = uid();
      });
      this.update(r => {
        r.theme.set(t);
      });
    }
  }
  @writer async changeName(newName: string) {
    await this.update(r => {
      r.name = newName;
    });
  }
}

type changeThemeType = {
  theme?: listThemeType;
  themeID?: string;
};
