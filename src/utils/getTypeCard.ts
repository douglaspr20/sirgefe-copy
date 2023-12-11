export const getTypeCard = (cardNumber: string) => {
  const firstNumber = Number(cardNumber[0]);

  const typeCards: Record<number, string> = {
    3: "amex",
    4: "visa",
    5: "mastercard",
    6: "discover",
  };

  return typeCards[firstNumber];
};
