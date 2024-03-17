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
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
//import userEvent from '@testing-library/user-event';
import Login from '../app/login/page.js'; // Adjust this import path to where your Login component is located
//import * as auth from '../app/lib/authenticateUsers'; // Adjust this path to where your authenticateUsers module is located

// Mock the Next.js useRouter hook
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

// // Mock the authenticateUsers module if your component makes use of it for logging in
// jest.mock('../app/lib/authenticateUsers', () => ({
//   loginUsers: jest.fn(),
// }));

describe('Login Component', () => {
  // Test for static content: "PSW Support and Care" heading
  test('renders PSW Support and Care heading', () => {
    render(<Login />);
    const headingElement = screen.getByText(/PSW Support and Care/i);
    expect(headingElement).toBeInTheDocument();
  });
})