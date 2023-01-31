import { DateTime } from "luxon";

export const getHoursMinutes = (timestamp) => {
  let date = DateTime.fromJSDate(new Date(timestamp));

  return `${date.toFormat("HH:mm")}`;
};
