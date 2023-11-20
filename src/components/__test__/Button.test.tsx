import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "..";
import userEvent from "@testing-library/user-event";

describe("Button Component", () => {
  it("should should render a button", () => {
    const buttonText = "Test Button";
    const { getByText } = render(<Button>{buttonText}</Button>);

    const buttonElement = getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();
  });
  it("should render button with specific type", () => {
    const buttonText = "Test Button";
    const { getByText } = render(<Button type="submit">{buttonText}</Button>);

    const buttonElement = getByText(buttonText) as HTMLButtonElement;
    expect(buttonElement.type).toBe("submit");
  });
  it("should handle the click events", async () => {
    const buttonText = "Test Button";
    const handleClick = vi.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>{buttonText}</Button>
    );
    const buttonElement = getByText(buttonText);
    await userEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalled();
  });
});
