// @vitest-environment happy-dom
import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';

test('it should render the component', () => {
  render(<Counter />);
});

test('it should increment when the "Increment" button is pressed', async () => {
  const user = userEvent.setup();
  render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount.textContent).toBe('0');
  const button = screen.getByRole('button', { name: 'Increment' }); // name is the display value NOT the attribute
  await user.click(button); // user.click simulates the way a human would trigger events
  expect(currentCount.textContent).toBe('1');
});
