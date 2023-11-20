import { describe, expect, it, vi } from "vitest";
import { Select } from "..";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Select Component", () => {
  it("should render a select component with label", () => {
    const labelText = "Test Select";
    const options = ["Option 1", "Option 2"];
    render(<Select label={labelText} options={options} />);

    const selectElement = screen.getByRole("combobox");
    const labelElement = screen.getByLabelText(labelText);

    expect(labelElement).toBeInTheDocument();
    expect(selectElement).toBeInTheDocument();
    options.forEach((option) => {
      const optionElement = screen.getByText(option);
      expect(optionElement).toBeInTheDocument();
    });
  });

  it("should select an option", async () => {
    const labelText = "Test Select";
    const options = ["Option 1", "Option 2"];
    const handleChange = vi.fn();
    render(
      <Select label={labelText} options={options} onChange={handleChange} />
    );

    const selectElement = screen.getByRole("combobox");
    await userEvent.selectOptions(selectElement, "Option 2");
    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "Option 2" }),
      })
    );
  });
});
