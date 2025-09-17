import { Link } from "react-router-dom";

function LinkButton({ to, children, onClick }) {
  const className = "text-sm text-blue-500 hover:text-blue-900 hover:underline";
  if (onClick) {
    return (
      <button className={className} onClick={onClick}>
        {children}
      </button>
    );
  }
  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
}

export default LinkButton;
