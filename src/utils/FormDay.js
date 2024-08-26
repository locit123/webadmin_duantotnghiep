import moment from "moment";

const FormatDay = (value) => {
  return moment(value).format("DD-MM-YYYY HH:mm:ss");
};

const FormatDay2 = (value) => {
  return moment(value).format("DD-MM-YYYY");
};

const FormatTimeNow = (value) => {
  return moment(value).format("HH:mm:ss");
};
const Regex = () => {
  return /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.000Z)/;
};

const FormatDay3 = (value) => {
  return moment.utc(value).format("DD-MM-YYYY HH:mm:ss");
};

const FormatDay4 = (value) => {
  return moment(value).format("YYYY");
};
const FormatDay5 = (value) => {
  return moment(value).format("MM-YYYY");
};
const FormatDay6 = (value) => {
  return moment(value).format("MM");
};
const FormatDay7 = (value) => {
  return moment(value).format("DD-MM");
};

export const checkDate = /^\d{1,2}-\d{1,2}-\d{4}$/;

export {
  FormatDay,
  FormatDay2,
  FormatTimeNow,
  Regex,
  FormatDay3,
  FormatDay4,
  FormatDay5,
  FormatDay6,
  FormatDay7,
};
