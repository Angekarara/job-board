import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { vi, describe, it, expect, beforeEach } from "vitest";
import LoginForm from "../../components/auth/LoginForm";
import authSlice from "../../store/slices/authSlice";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authSlice,
    },
    preloadedState: {
      auth: {
        user: null,
        token: null,
        isLoading: false,
        error: null,
        isAuthenticated: false,
        ...initialState,
      },
    },
  });
};

const TestWrapper = ({ children, initialState = {} }) => {
  const store = createTestStore(initialState);
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
  });

  it("renders login form with all essential elements", () => {
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    expect(
      screen.getByRole("heading", { name: "Sign In" })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your password")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();

    expect(screen.getAllByText("*")).toHaveLength(2);
  });

  it("handles form state management and input changes", () => {
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");

    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("name", "email");
    expect(emailInput).toBeRequired();

    expect(passwordInput).toHaveAttribute("type", "password");
    expect(passwordInput).toHaveAttribute("name", "password");
    expect(passwordInput).toBeRequired();
  });

  it("submits form with valid data", async () => {
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);
  });

  it("handles Redux state changes (loading, error, authentication)", () => {

    const { rerender } = render(
      <TestWrapper initialState={{ isLoading: true }}>
        <LoginForm />
      </TestWrapper>
    );

    let submitButton = screen.getByRole("button", { name: "Sign In" });
    expect(submitButton).toBeDisabled();
    expect(submitButton.querySelector("svg")).toBeInTheDocument();

    rerender(
      <TestWrapper initialState={{ error: "Invalid credentials" }}>
        <LoginForm />
      </TestWrapper>
    );

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();

    rerender(
      <TestWrapper initialState={{ isAuthenticated: true }}>
        <LoginForm />
      </TestWrapper>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("handles user interactions and navigation", () => {
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    const signUpLink = screen.getByText("Sign up");
    expect(signUpLink).toHaveAttribute("href", "/register");

    const submitButton = screen.getByRole("button", { name: "Sign In" });
    fireEvent.click(submitButton);

  });
});
