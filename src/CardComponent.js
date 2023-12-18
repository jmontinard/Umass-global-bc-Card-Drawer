import React from 'react';
import { Card } from 'react-bootstrap';

const CardComponent = ({ card, angle }) => (
  <Card
    style={{
      width: '18rem',
      position: 'absolute',
      transform: `rotate(${angle}deg)`,
    }}
  >
    <Card.Img variant="top" src={card.image} />
    <Card.Body>
      <Card.Title>
        {card.value} of {card.suit}
      </Card.Title>
    </Card.Body>
  </Card>
);

export default CardComponent;
