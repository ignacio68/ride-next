import { fireEvent, render, screen } from "@testing-library/react-native";

import SignIn from "@/app/(auth)/sign-in";

// Mock del hook useSignIn
jest.mock("@clerk/clerk-expo", () => ({
  useSignIn: () => ({
    signIn: {
      create: jest
        .fn()
        .mockResolvedValue({ status: "complete", createdSessionId: "123" }),
    },
    setActive: jest.fn(),
    isLoaded: true,
  }),
  useOAuth: () => ({
    startOAuthFlow: jest.fn().mockResolvedValue({ code: "success" }),
  }),
}));

// jest.mock("react-i18next", () => ({
//   useTranslation: () => ({
//     t: (key: string) => key, // Devuelve la clave de traducción como texto
//   }),
// }));

describe("SignIn", () => {
  test("renders correctly", () => {
    render(<SignIn />);
    expect(screen.getByText("sign-in.sign-in")).toBeDefined();
  });

  test("updates email and password fields", () => {
    render(<SignIn />);
    const emailInput = screen.getByPlaceholderText("sign-in.email-placeholder");
    const passwordInput = screen.getByPlaceholderText(
      "sign-in.password-placeholder",
    );

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");

    expect(emailInput.props.value).toBe("test@example.com");
    expect(passwordInput.props.value).toBe("password123");
  });

  test("calls onSignInPress on button press", () => {
    const { signIn } = require("@clerk/clerk-expo").useSignIn();
    render(<SignIn />);
    const signInButton = screen.getByText("sign-in.sign-in");

    fireEvent.press(signInButton);

    expect(signIn.create).toHaveBeenCalled();
  });

  test("toggles password visibility", () => {
    render(<SignIn />);
    const passwordInput = screen.getByPlaceholderText(
      "sign-in.password-placeholder",
    );
    const toggleButton = screen.getByTestId("toggle-password-visibility");

    // Initial state should be secure
    expect(passwordInput.props.secureTextEntry).toBe(true);

    fireEvent.press(toggleButton);

    // After toggle, it should not be secure
    expect(passwordInput.props.secureTextEntry).toBe(false);
  });
});

