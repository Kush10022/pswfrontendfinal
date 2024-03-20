import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '../app/registeruser/page.js'; // Adjust the import path according to your file structure

// Mock the Next.js useRouter hook
jest.mock('next/navigation', () => ({
    useRouter() {
      return {
        push: jest.fn(),
      };
    },
  }));

// Test for static content on the Register page
describe('Register Page', () => {
  test('renders the registration form with all fields', () => {
    render(<Register />);

    //Test to see labels first name, last name, email, password, and isPSW fields
    expect(screen.getByText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByText(/Is PSW/i)).toBeInTheDocument();

  });
});



// Test for user input on the Register page
// User input is tested by simulating user input and then checking if the input fields are updated accordingly
describe('Register Page', () => {
  test('updates input fields on user input', () => {
    const { getByLabelText } = render(<Register />);

    const firstNameInput = getByLabelText(/First Name/i);
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput.value).toBe('John');

    // const lastNameInput = getByLabelText(/Last Name/i);
    // fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    // expect(lastNameInput.value).toBe('Doe');

    // const emailInput = getByLabelText(/Email:/i);
    // fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    // expect(emailInput.value).toBe('john.doe@example.com');

    // const passwordInput = getByLabelText(/Password:/i);
    // fireEvent.change(passwordInput, { target: { value: 'password123' } });
    // expect(passwordInput.value).toBe('password123');
  });
});