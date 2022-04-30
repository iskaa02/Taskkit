import { Q } from "@nozbe/watermelondb";
import { Clause } from "@nozbe/watermelondb/QueryDescription";
import dayjs from "dayjs";
import { database } from "./db";
import { Columns, Tables } from "./models/schema";
import Task from "./models/Task";

type getTasksByDateProps = {
  from?: number;
  to?: number;
  withNull?: boolean;
};
export function queryTasks(
  { from, to, withNull }: getTasksByDateProps,
  ...extend: Clause[]
) {
  let q: Clause = Q.and();

  if (from) {
    if (!to) {
      q = Q.where(Columns.task.reminder, Q.gte(from));
    } else {
      q = Q.where(Columns.task.reminder, Q.between(from, to));
    }
  }
  if (to && !from) {
    q = Q.where(Columns.task.reminder, Q.lte(to));
  }
  if (withNull) {
    q = Q.or(q, Q.where(Columns.task.reminder, Q.eq(null)));
  }
  return database
    .get<Task>(Tables.Task)
    .query(q)
    .extend(...extend);
}

type getIntervalDateProps = {
  before?: number;
  beforeDays?: number;
  day?: Date | number | string;
  after?: number;
  afterDays?: number;
};
type getIntervalDateReturnType = {
  from?: number;
  to?: number;
};
export function getIntervalDate({
  day,
  after,
  afterDays,
  before,
  beforeDays,
}: getIntervalDateProps): getIntervalDateReturnType {
  let t: getIntervalDateReturnType = {
    to: undefined,
    from: undefined,
  };
  if (day) {
    const d = dayjs(day);
    return {
      from: d.startOf("day").valueOf(),
      to: d.endOf("day").valueOf(),
    };
  }
  if (beforeDays)
    t.to = dayjs().subtract(beforeDays, "day").endOf("day").valueOf();
  if (before) {
    t.to = dayjs().subtract(before).valueOf();
  }

  if (afterDays) {
    t.from = dayjs().add(afterDays, "day").startOf("day").valueOf();
  }
  if (after) {
    t.from = dayjs().add(after).valueOf();
  }
  return t;
}
