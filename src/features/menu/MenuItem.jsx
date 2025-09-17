import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantity } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantity(id));

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }
  return (
    <li
      key={id}
      style={{ opacity: soldOut ? 0.5 : 1 }}
      className="flex gap-4 py-2"
    >
      <img src={imageUrl} alt={name} className="h-24" />
      <div className="flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-stone-500 italic">
          {ingredients.join(", ")}
        </p>

        {/* This flex container pushes price & button to the bottom */}
        <div className="mt-auto flex flex-col items-start gap-3 border-t border-stone-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Add to cart button */}
          {currentQuantity === 0 && (
            <Button
              disabled={soldOut}
              onClick={handleAddToCart}
              className="rounded bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-stone-300 sm:self-end"
            >
              Add to cart
            </Button>
          )}
          {/* Price or Sold out */}
          {!soldOut ? (
            <p className="text-base font-medium text-stone-700 sm:text-sm">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="text-base font-semibold text-red-500 sm:text-sm">
              Sold out
            </p>
          )}

          {/* Delete button */}
          {currentQuantity > 0 && <DeleteItem pizzaId={id} />}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
