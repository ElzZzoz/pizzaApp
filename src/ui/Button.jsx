import { Link } from "react-router-dom";
import clsx from "clsx";

function Button({ children, disabled, to, type = "primary", onClick }) {
  // Base styles for all button types
  const baseStyles =
    "inline-block rounded-full font-semibold tracking-wide transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  // A map of styles for different button types
  const typeStyles = {
    primary:
      "bg-yellow-400 text-stone-800 hover:bg-yellow-300 focus:bg-yellow-300 px-4 py-3 sm:px-6 sm:py-4",
    secondary:
      "border-2 border-stone-300 text-stone-400 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 px-4 py-2.5 sm:px-6 sm:py-3.5",
    // NEW: Small variant, uses primary colors with less padding
    small:
      "bg-yellow-400 text-stone-800 hover:bg-yellow-300 focus:bg-yellow-300 px-4 py-2 md:px-5 md:py-2.5 text-xs",
    // NEW: Round variant for UI controls like +/-
    round:
      "bg-yellow-400 text-stone-800 hover:bg-yellow-300 focus:bg-yellow-300 px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
  };

  // Use clsx to combine base styles with the specific type style
  const className = clsx(baseStyles, typeStyles[type]);

  if (to) {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button className={className} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    );
  }

  return (
    <button className={className} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
