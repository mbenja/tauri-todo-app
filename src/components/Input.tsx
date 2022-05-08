type InputProps = {
  onChange: (v: string) => void;
  placeholder?: string;
  value: string;
};

export default function Input(props: InputProps) {
  const { onChange, placeholder, value } = props;

  return (
    <input
      className="py-1 px-2 rounded-md"
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      value={value}
    />
  );
}
