import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./Components/SingleCard";

const cardsImages = [
  { src: "img/helmet.jpg", isMatched: false },
  { src: "img/potion.jpg", isMatched: false },
  { src: "img/ring.jpg", isMatched: false },
  { src: "img/scroll.jpg", isMatched: false },
  { src: "img/shield.jpg", isMatched: false },
  { src: "img/sword.jpg", isMatched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [matchedCount, setMatchedCount] = useState(0);
  const shuffleCards = () => {
    const shuffledCards = [...cardsImages, ...cardsImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setGameOver(false);
    setDisabled(false);
    setMatchedCount(0);
  };

  const handleChoice = (card) => {
    if (choiceOne) {
      setChoiceTwo(card);
    } else {
      setChoiceOne(card);
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, isMatched: true };
            } else return card;
          });
        });
        setMatchedCount((prevCount) => prevCount + 2);
        resetChoices();
      } else {
        setTimeout(() => resetChoices(), 1000);
        console.log("Not a match, try again!");
      }
    }
  }, [choiceOne, choiceTwo]);

  // console.log(cards);

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (matchedCount > 0 && matchedCount === cardsImages.length * 2) {
      setGameOver(true);
    }
  }, [matchedCount, cardsImages]);

  const resetChoices = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((turns) => turns + 1);
    setDisabled(false);
    setGameOver(false);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.isMatched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
      {gameOver && (
        <div className="popup">
          <div className="popup-content">
            <h2>🎉 Game Over!</h2>
            <p>You completed the game in {turns} turns.</p>
            <button onClick={shuffleCards}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
