import React from 'react';
import axios from 'axios';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';


afterEach(cleanup);

it('renders without crashing', () => {
  render(<App />);
});

it('matches snapshot', () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

it('draws cards when the draw button is clicked', async () => {
  axios.get.mockResolvedValueOnce({
    data: { deck_id: 'test_deck', remaining: 52 },
  });
  axios.get.mockResolvedValueOnce({
    data: {
      cards: [{ image: 'test_image', value: 'test_value', suit: 'test_suit' }],
    },
  });

  const { getByText } = render(<App />);
  const drawButton = getByText('Start Drawing');

  fireEvent.click(drawButton);

  await waitFor(() =>
    expect(getByText('test_value of test_suit')).toBeInTheDocument()
  );
});
