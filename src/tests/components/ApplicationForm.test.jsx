import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { vi, describe, it, expect, beforeEach } from "vitest";
import ApplicationForm from "../../components/jobs/ApplicationForm";
import applicationsSlice from "../../store/slices/applicationsSlice";
import authSlice from "../../store/slices/authSlice";

vi.mock("../../utils/validation", () => ({
  validateEmail: vi.fn(),
  validatePhone: vi.fn(),
}));

const mockFile = new File(["resume content"], "resume.pdf", {
  type: "application/pdf",
});

const mockJob = {
  id: "1",
  title: "Software Engineer",
  company: "RISA",
};

const mockUser = {
  name: "Ange Karara",
  email: "ange@example.com",
};

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      applications: applicationsSlice,
      auth: authSlice,
    },
    preloadedState: {
      applications: {
        applications: [],
        isLoading: false,
        error: null,
        success: null,
        ...initialState.applications,
      },
      auth: {
        user: mockUser,
        token: "mock-token",
        isLoading: false,
        error: null,
        isAuthenticated: true,
        ...initialState.auth,
      },
    },
  });
};

const TestWrapper = ({ children, initialState = {} }) => {
  const store = createTestStore(initialState);
  return <Provider store={store}>{children}</Provider>;
};

describe("ApplicationForm", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockOnClose.mockClear();
  });

  it("renders application form with all essential elements", () => {
    render(
      <TestWrapper>
        <ApplicationForm job={mockJob} onClose={mockOnClose} />
      </TestWrapper>
    );

    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("RISA")).toBeInTheDocument();

    expect(screen.getByText("Full Name")).toBeInTheDocument();
    expect(screen.getByText("Email Address")).toBeInTheDocument();
    expect(screen.getByText("Phone Number")).toBeInTheDocument();
    expect(screen.getByText("Resume/CV")).toBeInTheDocument();
    expect(screen.getByText(/Years of Experience/)).toBeInTheDocument();
    expect(screen.getByText(/Cover Letter/)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Submit Application" })
    ).toBeInTheDocument();
  });

  it("initializes form with user data and handles input changes", () => {
    render(
      <TestWrapper>
        <ApplicationForm job={mockJob} onClose={mockOnClose} />
      </TestWrapper>
    );

    const nameInput = screen.getByPlaceholderText("Your full name");
    const emailInput = screen.getByPlaceholderText("your.email@example.com");
    const phoneInput = screen.getByPlaceholderText("(250) 786 456 709");
    const experienceSelect = screen.getByDisplayValue(
      "Select experience level"
    );
    const coverLetterTextarea = screen.getByPlaceholderText(
      /Tell us why you're interested in this position/
    );

    expect(nameInput).toHaveValue("Ange Karara");
    expect(emailInput).toHaveValue("ange@example.com");

    fireEvent.change(nameInput, { target: { value: "happy Gikundiro" } });
    fireEvent.change(phoneInput, { target: { value: "+250756789067" } });
    fireEvent.change(experienceSelect, { target: { value: "4-5" } });
    fireEvent.change(coverLetterTextarea, {
      target: { value: "Hello world" },
    });

    expect(nameInput).toHaveValue("happy Gikundiro");
    expect(phoneInput).toHaveValue("+250756789067");
    expect(experienceSelect).toHaveValue("4-5");
    expect(screen.getByText("11/500 characters")).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    const { validateEmail, validatePhone } = await import(
      "../../utils/validation"
    );
    validateEmail.mockReturnValue(true);
    validatePhone.mockReturnValue(true);

    render(
      <TestWrapper>
        <ApplicationForm job={mockJob} onClose={mockOnClose} />
      </TestWrapper>
    );

    const experienceSelect = screen.getByDisplayValue(
      "Select experience level"
    );
    const coverLetterTextarea = screen.getByPlaceholderText(
      /Tell us why you're interested in this position/
    );
    const submitButton = screen.getByRole("button", {
      name: "Submit Application",
    });

    fireEvent.change(experienceSelect, { target: { value: "2-3" } });
    fireEvent.change(coverLetterTextarea, {
      target: {
        value:
          "I am a passionate software engineer with 2-3 years of experience in web development. I am excited about this opportunity at RISA and believe my skills in React, Node.js, and modern web technologies would be a great fit for your team.",
      },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText("Name is required")).not.toBeInTheDocument();
      expect(screen.queryByText("Email is required")).not.toBeInTheDocument();
      expect(
        screen.queryByText("Cover letter is required")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Experience is required")
      ).not.toBeInTheDocument();
    });
  });

  it("handles Redux state changes (loading, error, success)", () => {
    const { rerender } = render(
      <TestWrapper initialState={{ applications: { isLoading: true } }}>
        <ApplicationForm job={mockJob} onClose={mockOnClose} />
      </TestWrapper>
    );

    let submitButton = screen.getByRole("button", {
      name: "Submit Application",
    });
    expect(submitButton).toBeDisabled();
    expect(submitButton.querySelector("svg")).toBeInTheDocument();


    rerender(
      <TestWrapper
        initialState={{
          applications: { error: "Failed to submit application" },
        }}
      >
        <ApplicationForm job={mockJob} onClose={mockOnClose} />
      </TestWrapper>
    );

    expect(
      screen.getByText("Failed to submit application")
    ).toBeInTheDocument();

  
    rerender(
      <TestWrapper
        initialState={{
          applications: { success: "Application submitted successfully!" },
        }}
      >
        <ApplicationForm job={mockJob} onClose={mockOnClose} />
      </TestWrapper>
    );

    expect(
      screen.getByText("Application Submitted Successfully!")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Thank you for applying. We'll get back to you soon.")
    ).toBeInTheDocument();
  });

  it("handles user interactions (cancel, file upload)", () => {
    render(
      <TestWrapper>
        <ApplicationForm job={mockJob} onClose={mockOnClose} />
      </TestWrapper>
    );


    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalled();

    const fileInputs = screen
      .getAllByDisplayValue("")
      .filter((input) => input.type === "file");
    const fileInput = fileInputs[0];
    fireEvent.change(fileInput, { target: { files: [mockFile] } });
    expect(fileInput.files[0]).toBe(mockFile);
  });
});
