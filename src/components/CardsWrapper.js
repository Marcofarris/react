import Card from "./Card";
import { numbers, colors, symbols } from "../data";
import useRandomValueFromArray from "../hooks/useRandomValueFromArray";

const CardsWrapper = ({ cardValue }) => {
  const cardNumbers = 1;
  const { randomValueFromArray } = useRandomValueFromArray();

  return (
    <div className="card-wrapper">
      {[...Array(Number(cardNumbers))].map((_numb, index) => {
        index += 1;
        const randomSymbols =
          symbols[Math.floor(Math.random() * symbols.length)];

        return (
          <Card
            key={index}
            name={randomSymbols.name}
            number={cardValue}
            color={
              randomSymbols.name === "spade" || randomSymbols.name === "club"
                ? `${colors[1].color}`
                : `${colors[0].color}`
            }
            symbol={randomSymbols.symbol}
          />
        );
      })}
    </div>
  );
};

export default CardsWrapper;
