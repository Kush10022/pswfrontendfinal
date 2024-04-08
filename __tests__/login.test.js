// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom'; // For extended matchers
// import Login from '../app/loginuser/page.js';
// import { useRouter } from "next/navigation";

// // Mock the useRouter hook. Without mock the code will error when
// //we create object from useRouter
// jest.mock('next/router', () => ({
//   useRouter: jest.fn(),
// }));


// //test for the first paragraph, aysnc and await to make sure page is loaded 
// // test('Login Component', async () => {
// //   render(<Login />);
// //   const loginText = await screen.findByText(/PSW Support and Care/i);
// //   expect(loginText).toBeInTheDocument();
// // });


// describe('Login Component', () => {
//   test('renders PSW Support and Care heading', () => {
//     render(<Login />);
//     const headingElement = screen.getByText(/PSW Support and Care/i);
//     expect(headingElement).toBeInTheDocument();
//   });
// });.


import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; //without this line, the toBeInTheDocument() method will not work
import Login from '../app/login/page.js'; // Adjust this import path to where your Login component is located
import { useRouter } from "next/navigation";
import { AssitiveFetch} from '../app/lib/assitivefetch.js'; // Adjust this import path to where your AssitiveFetch function is located


// Mock the Next.js useRouter hook
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn()
    };
  },
}));


// Mock AssitiveFetch to simulate a failed login attempt
// Assuming AssitiveFetch is exported from '../lib/assitivefetch'
// jest.mock('../app/lib/assitivefetch', () => ({
//   AssitiveFetch: jest.fn(),
// }));

// Test for static content: "PSW Support and Care" heading
describe('Login Component', () => {

  // beforeEach(() => {
  //   // Reset mocks before each test
  //   jest.clearAllMocks();

  //   AssitiveFetch.mockResolvedValue({
  //     status: 403, // Example status code for a failed login
  //   });
  // });


  // Test for static content: "PSW Support and Care" heading
  test('renders PSW Support and Care heading', () => {
    render(<Login />);
    const headingElement = screen.getByText(/PSW Support and Care/i);
    expect(headingElement).toBeInTheDocument();
  });
  

  // test('displays error message on wrong username and password', async () => {
  //   render(<Login />);

  //   // Simulate user input for the username and password fields
  //   fireEvent.change(screen.getByPlaceholderText(/Email Address/i), {
  //     target: { value: 'wrong@example.com' }
  //   });
  //   fireEvent.change(screen.getByPlaceholderText(/Password/i), {
  //     target: { value: 'wrongPassword' }
  //   });

  //   // Simulate form submission
  //   fireEvent.click(screen.getByTestId('login-button'));



  //   // Wait for AssitiveFetch to be called
  //   await waitFor(() => expect(AssitiveFetch).toHaveBeenCalled());

  //   // Now check if AssitiveFetch was called with the expected 403 status
  //   // This part assumes AssitiveFetch returns a promise that resolves with an object containing the status code
  //   expect(AssitiveFetch).toHaveReturnedWith(expect.objectContaining({
  //     status: 403
  //   }));
  // })
  
  // test('displays error message on 403 Forbidden response', async () => {
  //   // Mock fetch to simulate 403 Forbidden response
  //   fetch.mockResolvedValueOnce({
  //     status: 403,
  //     ok: false,
  //     json: async () => ({}),
  //   });

  //   render(<Login />);

  //   // Simulate user input and form submission as before
  //   fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'test@example.com' } });
  //   fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongPassword' } });
  //   fireEvent.submit(screen.getByTestId('form-button'));

  //   // Check for the display of the status message
  //   await waitFor(() => screen.getByText(/Please verify your email before logging in or check your email for verification link./i));
  //   expect(screen.getByText(/Please verify your email before logging in or check your email for verification link./i)).toBeInTheDocument();
  // });

})
