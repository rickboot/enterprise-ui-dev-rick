import { render, screen, cleanup } from 'test/utilities';
import PackingList from '.';

afterEach(() => {
  cleanup();
});

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  const input = screen.getByPlaceholderText(/new item/i);
  expect(input).toBeDefined();
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />);
  const button = screen.getByRole('button', { name: /add new item/i });
  const input = screen.getByPlaceholderText(/new item/i);
  expect(input).toHaveValue('');
  expect(button).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = render(<PackingList />);
  const button = screen.getByRole('button', { name: /add new item/i });
  const input = screen.getByPlaceholderText(/new item/i);
  await user.type(input, 'Howdy');
  expect(button).toBeEnabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);
  const addItemInput = screen.getByPlaceholderText(/new item/i);
  const addItemButton = screen.getByRole('button', { name: /Add New Item/i });

  await user.type(addItemInput, 'Eat churros');
  await user.click(addItemButton);
  expect(screen.getByLabelText('Eat churros')).not.toBeChecked();
});

it('removes an item when the remove button is clicked', async () => {
  const { user } = render(<PackingList />);
  const addItemInput = screen.getByLabelText(/New Item Name/i);
  const addItemButton = screen.getByRole('button', { name: /Add New Item/i });
  const removeItemButton = screen.getByRole('button', { name: /Remove/i });

  await user.type(addItemInput, 'Eat churros');
  await user.click(addItemButton);
  const item = screen.getAllByLabelText('Eat churros')[0];

  await user.click(removeItemButton);
  expect(item).not.toBeInTheDocument();
});
