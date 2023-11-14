import { useId, Ref, forwardRef, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  label: string;
  className?: string;
}
const Select = (
  { options, label, className = "", ...props }: SelectProps,
  ref: Ref<HTMLSelectElement>
) => {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label id={id} className="inline-block mb-1 pl-1">
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default forwardRef<HTMLSelectElement, SelectProps>(Select);
