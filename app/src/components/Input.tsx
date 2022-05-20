type InputProps = {
  onChange: (v: string) => void;
  placeholder?: string;
  value: string;
};

export default function Input(props: InputProps) {
  const { onChange, placeholder, value } = props;

  return (
    <input
      className="border border-gray-100 dark:bg-slate-400 dark:border-slate-700 dark:placeholder:text-white dark:text-white focus:outline-none py-1 px-2 rounded-md shadow-sm w-full"
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      value={value}
    />
  );
}
