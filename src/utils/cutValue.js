const cutString = (string) => {
  return string.length >= 21 ? string.slice(0, 21) + "..." : string;
};

export { cutString };
