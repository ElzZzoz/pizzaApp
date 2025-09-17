import { use } from "react";
import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCartItems } from "./cartSlice";
import EmptyCart from "./EmptyCart";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = useSelector(getCartItems);
  const userName = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="my-10 px-4 text-center sm:my-16 sm:px-6">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-4 text-xl font-semibold text-stone-700">
        Your cart, {userName}
      </h2>
      <ul className="mt-3 divide-y divide-stone-200 border-t border-b border-stone-200 text-left">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button to="/order/new">Order pizzas</Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
