const Button = ({ text, color, action, ...props }) => {
  return (
    <button style={{ color: color, borderColor: color }} onClick={action} className="button" {...props}>
      {text}
    </button>
  );
};

export default Button;
