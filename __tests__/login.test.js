import { render, screen } from "@testing-library/react";
import Login from "../app/login/page"; // Adjust the path to your Login component
import '@testing-library/jest-dom';

// Mock the router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Login Page", () => {
  it("renders the login page with email and password inputs", () => {
    // Render the Login component
    render(<Login />);

    // Assert that the email input, password input, and login button are present
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
