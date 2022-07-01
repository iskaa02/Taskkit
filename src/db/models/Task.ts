import { Database, Model, Q, Relation, TableName } from "@nozbe/watermelondb";
import {
  field,
  json,
  lazy,
  relation,
  text,
  writer,
} from "@nozbe/watermelondb/decorators";
import date from "@nozbe/watermelondb/decorators/date";
import { associations } from "@nozbe/watermelondb/Model";
import { cancelScheduledNotificationAsync } from "expo-notifications";
import { storage } from "../storage";
import List from "./List";
import { repeatType, scheduleNotification } from "./scheduleNotification";
import { Columns, Tables } from "./schema";
import Tag from "./tag";
import TaskTags from "./taskTags";
import { uid } from "./uid";

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
  tagsIDs: string[];
  listID: string;
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
  @relation(Tables.List, Column.listID) list!: Relation<List>;

  @writer async markAsDeleted() {
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
  @writer async changeList(listID: string) {
    const list = await this.database.get<List>(Tables.List).find(listID);
    this.update(() => {
      this.list.set(list);
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
      if (typeof description !== "undefined") r.description = description;
      if (typeof repeat !== "undefined") {
        r.repeat = repeat;
      }
      if (typeof reminder !== "undefined") {
        if (reminder) {
          r.cancelNotification();
          scheduleNotification({
            name: r.name,
            id: r.id,
            date: reminder,
            description: r.description,
            repeat: r.repeat,
          });
          r.reminder = new Date(reminder);
        } else {
          r.reminder = null;
        }
      }
    });
  }
  @writer async addTag(tagID: string) {
    const tag = await this.database.get<Tag>(Tables.Tag).find(tagID);
    await this.database.get<TaskTags>(Tables.TaskTags).create(tt => {
      tt.tag.set(tag);
      tt.task.set(this);
    });
  }
  @lazy tags = this.collection.query(
    Q.on(Tables.TaskTags, Columns.taskTags.taskID, this.id)
  );
}
type editTaskType = {
  name?: string;
  description?: string;
  reminder?: Date | null;
  repeat?: repeatType;
};

export async function createTask(database: Database, t: addTaskType) {
  const task = database.get<Task>(Tables.Task).prepareCreate(task => {
    const id = uid();
    if (t.reminder) {
      task.reminder = new Date(t.reminder);
      task.repeat = t.reminderRepeat;
      scheduleNotification({
        name: t.name,
        id,
        date: t.reminder,
        description: t.description,
        repeat: t.reminderRepeat,
      });
    } else {
      task.reminder = null;
      task.repeat = null;
    }
    task.list.id = t.listID;
    task.description = t.description;
    task.name = t.name;
    task.isCompleted = false;
    const subtasks: subtaskObject = {};
    t.subtasks.map(i => {
      const id = uid(10);
      subtasks[id] = {
        isCompleted: false,
        name: i,
      };
      task.subtasks = subtasks;
    });
    task.id = id;
    return task;
  });
  const taskTags = t.tagsIDs.map(tagID => {
    return database.get<TaskTags>(Tables.TaskTags).prepareCreate(taskTag => {
      taskTag.tag.id = tagID;
      taskTag.task.set(task);
      return taskTag;
    });
  });
  await database.write(() => {
    return database.batch(task, ...taskTags);
  });
}
