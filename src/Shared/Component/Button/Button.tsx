interface ButtonProps {
  caption: string;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  caption,
  type = "submit",
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg 
      transition disabled:opacity-50"
    >
      {caption}
    </button>
  );
}