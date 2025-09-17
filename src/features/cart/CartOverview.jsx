import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  // const cartItems = useSelector(getCartItems);

  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-between border-t border-stone-700 bg-stone-900 px-6 py-4 shadow-lg md:px-10">
      {/* Cart Info */}
      <p className="space-x-6 text-sm text-stone-200 md:text-lg">
        <span className="font-medium text-yellow-400">{totalCartQuantity}</span>
        <span className="text-stone-300">pizzas</span>
        <span className="font-semibold text-white">
          ${totalCartPrice.toFixed(2)}
        </span>
      </p>

      {/* CTA Link */}
      <Link
        to="/cart"
        className="rounded-full bg-yellow-500 px-5 py-2 text-sm font-semibold text-stone-900 transition duration-300 hover:bg-yellow-400 focus:ring focus:ring-yellow-300 focus:outline-none md:px-6 md:text-base"
      >
        Open Cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
