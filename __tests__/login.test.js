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



// Mock the Next.js useRouter hook
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn()
    };
  },
}));


// Test for static content: "PSW Support and Care" heading
describe('Login Component', () => {

  // Test for static content: "PSW Support and Care" heading
  test('renders PSW Support and Care heading', () => {
    render(<Login />);
    const headingElement = screen.getByText(/PSW Support and Care/i);
    expect(headingElement).toBeInTheDocument();
  });


  
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

// Test for the login form
// describe('Login Component', () => {
//   test('redirects to dashboard on successful login', async () => {
//     // render(<Login onSubmit={onSubmit}/>);
  
//     // Simulate user input
//     // fireEvent.change(screen.getByPlaceholderText('Email Address'), {
//     //   target: { value: 'tsumiksh@gmail.com' },
//     // });
//     // fireEvent.change(screen.getByPlaceholderText('Password'), {
//     //   target: { value: 'ss' },
//     // });

//     const mockSubmit = jest.fn();
//     render(<Login onSubmit={mockSubmit} />);

//     fireEvent.change(screen.getByPlaceholderText('Email Address'), {
//       target: { value: 'testuser' },
//     });
//     fireEvent.change(screen.getByPlaceholderText('Password'), {
//       target: { value: 'testpass' },
//     });
    
//     fireEvent.submit(screen.getByRole('form'));

//     // Assertions
//     await waitFor(() => {
//       // expect(mockSubmit).toHaveBeenCalledTimes(1);
//       expect(mockSubmit).toHaveBeenCalledWith('testuser', 'testpass');
//     });
//     // // Simulate form submission
//     // fireEvent.click(screen.getByRole('button', { name: 'Login' }));
  
//     // const geoLocationHeading = await screen.findByRole('heading', {
//     //   name: /Geo-Location/i,
//     // });
  
//     // // Assert that the heading is in the document
//     // expect(geoLocationHeading).toBeInTheDocument();
//   });
// });