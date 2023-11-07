const resolveToNumber = (value: string) => {
  return parseInt(value.replace("K", "000").replace("M+", "000000"));
};

export default resolveToNumber;
