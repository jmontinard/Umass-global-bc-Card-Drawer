import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardComponent from './CardComponent';

afterEach(cleanup);

it('renders without crashing', () => {
  const card = { image: 'test_image', value: 'test_value', suit: 'test_suit' };
  render(<CardComponent card={card} angle={0} />);
});

it('matches snapshot', () => {
  const card = { image: 'test_image', value: 'test_value', suit: 'test_suit' };
  const { asFragment } = render(<CardComponent card={card} angle={0} />);
  expect(asFragment()).toMatchSnapshot();
});
