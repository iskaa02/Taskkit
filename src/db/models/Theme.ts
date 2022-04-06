import { Model, TableName } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";
import { associations } from "@nozbe/watermelondb/Model";
import { Columns, Tables } from "./schema";

const Column = Columns.theme;

export default class Theme extends Model {
  public static table: TableName<Theme> = Tables.Theme;
  public static associations = associations([
    Tables.List,
    { type: "has_many", foreignKey: "list_id" },
  ]);

  @field(Column.mainColor)
  main!: string;
  @field(Column.secondary)
  secondary!: string | undefined;
}
