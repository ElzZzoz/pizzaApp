import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity"; // 1. Import the component

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      {/* UI Improvement: Removed the "{quantity}×" from here because
        the UpdateItemQuantity component now displays the quantity.
      */}
      <p className="mb-1 sm:mb-0">{name}</p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        {/* 2. Use the component and pass the pizzaId */}
        <UpdateItemQuantity pizzaId={pizzaId} />

        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
