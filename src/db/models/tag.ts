import { Model, Q } from "@nozbe/watermelondb";
import { lazy, text } from "@nozbe/watermelondb/decorators";
import { Associations } from "@nozbe/watermelondb/Model";
import { Columns, Tables } from "./schema";

const Column = Columns.tag;
export default class Tag extends Model {
  public static associations: Associations = {
    taskTags: {
      type: "has_many",
      foreignKey: Columns.taskTags.tagID,
    },
  };
  @text(Column.name) name!: string;
  @text(Column.color) color!: string;
  @lazy tasks = this.collection.query(
    Q.on(Tables.TaskTags, Columns.taskTags.tagID, this.id)
  );
}
