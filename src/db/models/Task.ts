import { Collection, Model, Relation, TableName } from "@nozbe/watermelondb";
import {
  children,
  field,
  immutableRelation,
  text,
  writer,
} from "@nozbe/watermelondb/decorators";
import date from "@nozbe/watermelondb/decorators/date";
import { associations } from "@nozbe/watermelondb/Model";
import List from "./List";
import { Columns, Tables } from "./schema";
import { uid } from "./utils";

const Column = Columns.task;
export type subtask = {
  name: string;
  id: string;
  isCompleted: boolean;
};
export type addTaskType = {
  name: string;
  description: string;
  reminder: Date | null;
  subtasks: subtask[];
};

export default class Task extends Model {
  public static table: TableName<Task> = Tables.Task;
  public static associations = associations([
    Tables.List,
    { type: "belongs_to", key: "list_id" },
  ]);

  @text(Column.name)
  name!: string;
  @field(Column.taskID)
  taskID!: string;
  @field(Column.isCompleted)
  isCompleted!: boolean;
  @field(Column.description)
  description!: string;
  @field(Column.subtasks)
  subTasks!: subtask[];
  @date(Column.reminder) reminder!: Date;

  @immutableRelation(Tables.List, Column.listID)
  list!: Relation<List>;

  @children(Tables.Task)
  tasks!: Collection<Task>;

  @writer async addSubTask(name: string) {
    await this.update(r => {
      r.subTasks.push({ name, isCompleted: false, id: uid() });
    });
  }
  @writer async toggleSubTask(subTaskID: string) {
    await this.update(r => {
      const i = r.subTasks.findIndex(s => s.id == subTaskID);
      r.subTasks[i].isCompleted = !r.subTasks[i].isCompleted;
    });
  }
  @writer async deleteSubTask(subTaskID: string) {
    await this.update(r => {
      r.subTasks = r.subTasks.filter(s => s.id == subTaskID);
    });
  }
  @writer async changeName(newName: string) {
    await this.update(r => {
      r.name = newName;
    });
  }
  @writer async deleteTask() {
    await this.destroyPermanently();
  }
  @writer async changeDate(newDate: Date) {
    this.update(r => {
      r.reminder.setDate(newDate.valueOf());
    });
  }
}
