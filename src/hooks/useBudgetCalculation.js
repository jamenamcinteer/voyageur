const useBudgetCalculation = (type, items) => {
  let cost = 0;

  items.map(item => {
    cost =
      type === "actual"
        ? cost + parseFloat(item.cost)
        : cost + parseFloat(item.estimatedCost);
    return true;
  });

  return cost;
};

export default useBudgetCalculation;
