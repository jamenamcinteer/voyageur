const useSortDescendingNumerical = (array, field) => {
  let arr = array;
  arr.sort((a, b) => parseInt(b[field]) - parseInt(a[field]));
  return arr;
};

export default useSortDescendingNumerical;
