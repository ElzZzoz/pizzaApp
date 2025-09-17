import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button"; // Assuming you have a reusable Button component
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  getCurrentQuantity,
} from "./cartSlice";

function UpdateItemQuantity({ pizzaId }) {
  const dispatch = useDispatch();

  // Use the provided selector to get the quantity for this specific item
  const currentQuantity = useSelector(getCurrentQuantity(pizzaId));

  function handleIncrease() {
    // Dispatch the action with the pizzaId as the payload
    dispatch(increaseItemQuantity(pizzaId));
  }

  function handleDecrease() {
    // Dispatch the action with the pizzaId as the payload
    dispatch(decreaseItemQuantity(pizzaId));
  }

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={handleDecrease}>
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button type="round" onClick={handleIncrease}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
