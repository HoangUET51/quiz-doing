import clsx from "clsx";

export interface ButtonProps {
  id?: string;
  label?: string;
  type?: "button" | "submit";
  size?: "xs" | "s" | "m" | "l";
  theme?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "danger"
    | "dangerSolid"
    | "dark"
    | "none";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  width?: number | string;
}

export function Button({
  id,
  label,
  type = "button",
  className = "",
  theme = "primary",
  size = "s",
  disabled = false,
  onClick = () => {},
  width = 80,
}: ButtonProps) {
  return (
    <div style={{ width }}>
      <button
        className={clsx(`w-full rounded ${className}`, {
          "text-white": theme !== "secondary",
          "leading-[26px]": size === "xs",
          "h-[26px]": size === "xs",
          "leading-[36px]": size === "s",
          "h-[36px]": size === "s",
          "leading-[48px]": size === "m",
          "h-[48px]": size === "m",
          "leading-[60px]": size === "l",
          "h-[60px]": size === "l",
          "bg-[#e54e87]": theme === "danger",
          "bg-[#29a2ea]": theme === "primary",
          "bg-[#29b6f6] hover:bg-[#81d4fa]": theme === "tertiary",
          "bg-white": theme === "secondary",
          "border border-solid border-[#29a2ea]": theme === "secondary",
          "text-[#29a2ea]": theme === "secondary",
          "!bg-[#dadada] text-white": disabled,
        })}
        id={id}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}
