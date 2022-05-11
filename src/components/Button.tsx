type ButtonProps = {
  expand?: boolean;
  icon?: JSX.Element;
  onClick?: () => void;
  text?: string;
  variant?: Variant;
};

const variants = {
  default: 'bg-gray-50 border-gray-100 hover:bg-gray-100 hover:border-gray-200',
  primary:
    'bg-blue-300 border-blue-400 hover:bg-blue-400 hover:border-blue-500 hover:text-white',
  danger:
    'bg-red-300 border-red-400 hover:bg-red-400 hover:border-red-500 hover:text-white',
};

type Variant = keyof typeof variants;

export default function Button(props: ButtonProps) {
  const { expand, icon, onClick, text, variant } = props;

  const classes = `border flex focus:outline-none font-medium justify-center px-3 py-1 rounded-md shadow-sm ${
    variant ? variants[variant] : variants.default
  } ${expand ? 'grow' : ''}`;

  return (
    <button className={classes} onClick={onClick ? () => onClick() : undefined}>
      <span className="my-auto">{icon}</span>
      {text && <span className={`${icon ? 'ml-1' : ''}`}>{text}</span>}
    </button>
  );
}
