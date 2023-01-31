import { DateTime } from "luxon";
export const getISOFormat = (dateTime) => {
  let dateFormat = DateTime.fromJSDate(new Date(dateTime)).toISO();

  return dateFormat;
};
