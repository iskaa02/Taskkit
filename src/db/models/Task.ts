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
import { storage } from "../db";
import List from "./List";
import { repeatType } from "./scheduleNotification";
import { Columns, Tables } from "./schema";

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
  reminderRepeat: repeatType;
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
  @text(Column.repeat) repeat!: repeatType;
  @immutableRelation(Tables.List, Column.listID) list!: Relation<List>;

  async markAsDeleted() {
    // to update the list number
    this.list.fetch().then(list => {
      list?.update(() => {});
    });
    await this.cancelNotification();
    await super.markAsDeleted();
  }
  async cancelNotification() {
    await cancelScheduledNotificationAsync(this.id);
  }

  @writer async updateSubtasks(newSubtasks: subtaskObject) {
    await this.update(r => {
      r.subtasks = newSubtasks;
    });
  }

  @writer async setIsCompleted(t: boolean = false) {
    await this.update(r => {
      r.isCompleted = t;
    });

    const shouldCancelNotification = storage.getBoolean(
      "send-notification-even-when-completed"
    );
    if (shouldCancelNotification) this.cancelNotification();

    this.list.fetch().then(list => {
      list?.update(() => {});
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
  @writer async editTask({
    name,
    description,
    reminder,
    repeat,
  }: editTaskType) {
    this.update(r => {
      if (name) r.name = name;
      if (description) r.description = description;
      if (typeof repeat !== "undefined") {
        r.repeat = repeat;
      }
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
  repeat: repeatType;
};
