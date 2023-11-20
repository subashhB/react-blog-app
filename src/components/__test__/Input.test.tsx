import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "..";

describe("Input Component", () => {
  it("should render text input with label", async () => {
    render(<Input label="Username" />);
    const inputElement = screen.getByLabelText("Username");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
  });
  it("should render input with specified type", () => {
    render(<Input type="password" label="Password" />);

    const passwordInputElement = screen.getByLabelText(
      "Password"
    ) as HTMLInputElement;

    expect(passwordInputElement).toBeInTheDocument();
    expect(passwordInputElement.type).toBe("password");
  });
});
