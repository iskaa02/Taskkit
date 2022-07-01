import { Model, Q, TableName } from "@nozbe/watermelondb";
import { lazy, text, writer } from "@nozbe/watermelondb/decorators";
import { associations } from "@nozbe/watermelondb/Model";
import { Columns, Tables } from "./schema";

const Column = Columns.tag;
type editTag = {
  name?: string;
  color?: string;
};
export default class Tag extends Model {
  public static table: TableName<Tag> = Tables.Tag;
  public static associations = associations([
    Tables.TaskTags,
    { type: "has_many", foreignKey: Columns.taskTags.tagID },
  ]);

  @text(Column.name) name!: string;
  @text(Column.color) color!: string;
  @lazy tasks = this.collection.query(
    Q.on(Tables.TaskTags, Columns.taskTags.tagID, this.id)
  );

  @writer async editTag({ name, color }: editTag) {
    this.update(t => {
      if (name) t.name = name;
      if (color) t.color = color;
    });
  }
}
