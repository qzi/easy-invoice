import { render, screen } from '@testing-library/react';
import App from './App';

test('renders invoice title', () => {
  render(<App />);
  const titleElement = screen.getByText('Invoice');
  expect(titleElement).toBeInTheDocument();
});
