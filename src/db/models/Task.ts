import { Model, Relation, TableName } from "@nozbe/watermelondb";
import {
  field,
  immutableRelation,
  json,
  text,
  writer,
} from "@nozbe/watermelondb/decorators";
import date from "@nozbe/watermelondb/decorators/date";
import { associations } from "@nozbe/watermelondb/Model";
import { cancelScheduledNotificationAsync } from "expo-notifications";
import List from "./List";
import { Columns, Tables } from "./schema";
import { uid } from "./utils";

const Column = Columns.task;
export type subtaskObject = { [x: string]: subtask };
export type subtask = {
  name: string;
  isCompleted: boolean;
};
export type addTaskType = {
  name: string;
  description: string;
  reminder?: Date;
  subtasks: string[];
};

const sanitize = (subtasks: any): subtaskObject => {
  if (typeof subtasks !== "object") return {};
  return subtasks;
};
export default class Task extends Model {
  public static table: TableName<Task> = Tables.Task;
  public static associations = associations([
    Tables.List,
    { type: "belongs_to", key: Column.listID },
  ]);

  @text(Column.name) name!: string;
  @field(Column.isCompleted) isCompleted!: boolean;
  @text(Column.description) description!: string;
  @json(Column.subtasks, sanitize) subtasks!: subtaskObject;
  @date(Column.reminder) reminder!: Date | null;

  @immutableRelation(Tables.List, Column.listID) list!: Relation<List>;

  @writer async addSubTask(name: string) {
    await this.update(r => {
      let newSubtasks = r.subtasks;
      const id = uid(6);
      newSubtasks[id] = { name, isCompleted: false };
      r.subtasks = newSubtasks;
    });
  }
  async markAsDeleted() {
    await this.cancelNotification();
    await super.markAsDeleted();
  }
  async cancelNotification() {
    await cancelScheduledNotificationAsync(this.id);
  }
  @writer async changeSubtaskName(id: string, name: string) {
    let newSubtasks = this.subtasks;
    if (name) {
      newSubtasks[id].name = name;
    } else {
      delete newSubtasks[id];
    }
    await this.update(r => {
      r.subtasks = newSubtasks;
    });
  }
  @writer async toggleTask() {
    this.update(r => {
      r.isCompleted = !r.isCompleted;
    });
    this.list.fetch().then(list => {
      list?.update(() => {});
    });
  }
  @writer async toggleSubtask(id: string) {
    let newSubtasks = this.subtasks;
    newSubtasks[id].isCompleted = !newSubtasks[id].isCompleted;
    await this.update(r => {
      r.subtasks = newSubtasks;
    });
  }
  @writer async deleteSubtask(subTaskID: string) {
    let newSubtasks = this.subtasks;
    delete newSubtasks[subTaskID];
    await this.update(r => {
      r.subtasks = newSubtasks;
    });
  }
  @writer async editTask({ name, description, reminder }: editTaskType) {
    this.update(r => {
      if (name) r.name = name;
      if (description) r.description = description;
      if (!(typeof reminder === "undefined")) {
        if (reminder) {
          r.reminder = new Date(reminder);
        } else {
          r.reminder = null;
        }
      }
    });
  }
}
type editTaskType = {
  name?: string;
  description?: string;
  reminder?: Date | null;
};
