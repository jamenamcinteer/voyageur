const useSortAscendingAlphabetical = (array, field) => {
  let arr = array;
  arr.sort((a, b) =>
    a[field].toUpperCase() > b[field].toUpperCase() ? 1 : -1
  );
  return arr;
};

export default useSortAscendingAlphabetical;
