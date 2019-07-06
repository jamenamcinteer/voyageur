const useSortAscendingNumerical = (array, field) => {
  let arr = array;
  arr.sort((a, b) => parseInt(a[field]) - parseInt(b[field]));
  return arr;
};

export default useSortAscendingNumerical;
