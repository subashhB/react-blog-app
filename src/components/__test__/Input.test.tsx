import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
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

  it("should handle input change", async () => {
    const handleChange = vi.fn();
    render(<Input label="Email" onChange={handleChange} />);

    const inputElement = screen.getByLabelText("Email") as HTMLInputElement;
    const inputValue = "test@example.com";
    await userEvent.type(inputElement, inputValue);

    expect(handleChange).toHaveBeenCalledTimes(inputValue.length);
    expect(inputElement.value).toBe(inputValue);
  });
});
