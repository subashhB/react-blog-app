import { ButtonHTMLAttributes } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  bgColor?: string | undefined;
  textColor?: string;
  className?: string;
}
const Button = ({
  children,
  type = "button",
  bgColor = "bg-button",
  textColor = "text-buttonText",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rouded-lg ${bgColor} ${textColor} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
