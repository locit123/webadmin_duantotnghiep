export const convertDates = (dateArray) => {
  if (dateArray && dateArray.length > 0) {
    let months = dateArray.map((date) => {
      return date.split("-")[0].replace(/^0/, "");
    });

    let year = dateArray[0].split("-")[1];

    return `${months.join(",")}-${year}`;
  }
};
