const getPercentageChange = (budget: number, amountSpent: number) => {
  let percentage = '';
  if (amountSpent === 0) {
    return `${0}%`;
  } else if (amountSpent >= budget) {
    return `${100}%`;
  } else {
    percentage = ((amountSpent / budget) * 100).toFixed(2);

    return `${percentage}%`;
  }
};

export default getPercentageChange;
