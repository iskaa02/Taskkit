import { scheduleNotificationAsync } from "expo-notifications";

export function uid(num = 14) {
  return (performance.now().toString(num) + Math.random().toString(14)).replace(
    /\./g,
    ""
  );
}

type scheduleNotification = {
  name: string;
  id: string;
  date: Date;
  description: string;
};
export function scheduleNotification({
  name,
  id,
  date,
  description,
}: scheduleNotification) {
  scheduleNotificationAsync({
    identifier: id,
    content: {
      title: name,
      body: description,
    },
    trigger: date,
  });
}
