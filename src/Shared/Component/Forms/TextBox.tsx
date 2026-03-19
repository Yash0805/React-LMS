interface TextBoxProps {
  label: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  disabled?: boolean;
}

export default function TextBox(props: TextBoxProps) {
  return (
    <div className="mb-4">
      <label
        className="block text-slate-300 text-sm font-medium mb-1"
        htmlFor={props.name}
      >
        {props.label}
      </label>

      <input
        id={props.name}
        name={props.name}
        type="text"
        placeholder={props.placeholder}
        value={props.value ?? ""}
        onChange={(e) => props.onChange?.(e.target.value)}
        disabled={props.disabled}
        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white 
        focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
      />
    </div>
  );
}