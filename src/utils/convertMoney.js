const ConvertMoney = (money) => {
  if (money > 100) {
    return `${money.toLocaleString()} VND`;
  } else {
    return `${money} %`;
  }
};
const ConvertMoney2 = (money) => {
  if (money > 100) {
    return `${money.toLocaleString()}`;
  } else {
    return `${money} %`;
  }
};

export { ConvertMoney, ConvertMoney2 };
