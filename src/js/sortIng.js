
const sortPri = (a, b) => {
  return b.priority - a.priority;
};

const sortNam = (a, b) => {

  if (a.title < b.title) {
    return -1;
  }
  return 1;
};

export { sortPri, sortNam };
