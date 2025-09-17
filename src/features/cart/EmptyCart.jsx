import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6 text-center">
      <Link
        to="/menu"
        className="flex items-center gap-1 font-medium text-blue-600 hover:text-blue-800"
      >
        <span className="text-lg">&larr;</span> Back to menu
      </Link>

      <p className="text-lg text-gray-700">
        Your cart is still empty.{" "}
        <span className="font-semibold">Start adding some pizzas 🍕</span>
      </p>
    </div>
  );
}

export default EmptyCart;
