type ButtonProps = {
  expand?: boolean;
  icon?: JSX.Element;
  onClick?: () => void;
  outline?: boolean;
  text?: string;
};

export default function Button(props: ButtonProps) {
  const { expand, icon, onClick, outline, text } = props;

  let conditionalStyles = `${
    icon && !text ? 'rounded-full h-7 w-7' : 'px-2 py-1 rounded-md'
  }`;

  conditionalStyles += `${expand === true ? ' grow' : ''}`;
  conditionalStyles += `${
    outline === true ? '' : ' bg-purple-300 flex hover:bg-purple-400'
  }`;

  return (
    <button
      className={`border-purple-300 border-2 justify-center ${conditionalStyles}`}
      onClick={onClick ? () => onClick() : undefined}
    >
      {icon ? <span className="h-4 m-auto w-4">{icon}</span> : null}
      {text ? <span className={`${icon ? 'ml-1' : ''}`}>{text}</span> : null}
    </button>
  );
}
