export const getHoursMinutes = (timestamp) => {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  return `${hours}:${minutes.substring(1, 4)}`;
};
