import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import CardComponent from './CardComponent';
import './style.css';

function App() {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const drawInterval = useRef(null);

  useEffect(() => {
    async function getData() {
      let deck = await axios.get(
        'https://deckofcardsapi.com/api/deck/new/shuffle/'
      );
      setDeck(deck.data);
    }
    getData();
  }, []);

  useEffect(() => {
    const drawCard = async () => {
      if (deck.remaining === 0) {
        alert('Error: no cards remaining!');
        setIsDrawing(false);
        return;
      }

      let cardRes = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/`
      );
      setDeck(cardRes.data);
      setDrawn((prevDrawn) => [...prevDrawn, cardRes.data.cards[0]]);
    };

    if (isDrawing) {
      drawInterval.current = setInterval(drawCard, 1000);
    } else {
      clearInterval(drawInterval.current);
      drawInterval.current = null;
    }

    return () => {
      if (drawInterval.current) {
        clearInterval(drawInterval.current);
      }
    };
  }, [deck, isDrawing]);

  const toggleDrawing = () => setIsDrawing((prevIsDrawing) => !prevIsDrawing);

  const cards = drawn.map((c, i) => (
    <CardComponent
      key={c.code}
      card={c}
      angle={i % 2 === 0 ? i * 10 : i * -10}
    />
  ));

  return (
    <div className="App">
      <h1>Deck of Cards</h1>
      {deck ? (
        <div className="button-container">
          <Button
  onClick={toggleDrawing}
  style={{
    marginBottom: '10px',
    backgroundColor: isDrawing ? '#dc3545' : '#28a745',
    borderColor: isDrawing ? '#dc3545' : '#28a745',
    padding:'8px',
    borderRadius: '8px',
    outline:'none',
    color: "white",
    cursor: "pointer"
  }}
  className="mb-3"
>
  {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
</Button>

        </div>
      ) : null}
      <div className="card-container">{cards}</div>
    </div>
  );
}

export default App;
