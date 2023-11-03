// Sorting
const sortPri = (a, b) => {
  return b.priority - a.priority;
};
const sortNam = (a, b) => {
  return a.title < b.title ? -1 : 1;
};

export { sortPri, sortNam };
