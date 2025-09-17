import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../service/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { clearCart, getCartItems, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// ... isValidPhone function remains the same ...
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData()?.errors;
  const dispatch = useDispatch();

  const {
    username,
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";

  const cart = useSelector(getCartItems);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  function handleGetPosition(e) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    // THE FIX: Added pb-24 to this container div
    <div className="mx-auto mt-10 max-w-lg rounded-lg bg-white p-6 pb-24 shadow-lg">
      <h2 className="mb-6 text-center text-3xl font-bold text-stone-800">
        Ready to order? Let’s go!
      </h2>

      {/* The rest of your form component remains exactly the same... */}
      <Form method="POST" className="space-y-6">
        {/* ... Customer Name */}
        <div className="space-y-2">
          <label
            htmlFor="customer"
            className="block text-left text-sm font-semibold text-stone-700"
          >
            First Name
          </label>
          <input
            id="customer"
            name="customer"
            defaultValue={username}
            type="text"
            required
            className="input w-full rounded-md border border-stone-300 p-3 text-stone-800 shadow-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300"
          />
        </div>

        {/* ... Phone Number */}
        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="block text-left text-sm font-semibold text-stone-700"
          >
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="input w-full rounded-md border border-stone-300 p-3 text-stone-800 shadow-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300"
          />
          {formErrors?.phone && (
            <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
          )}
        </div>

        {/* ... Address */}
        <div className="space-y-2">
          <label
            htmlFor="address"
            className="block text-left text-sm font-semibold text-stone-700"
          >
            Address
          </label>
          <div className="relative">
            <input
              id="address"
              name="address"
              type="text"
              required
              defaultValue={address}
              disabled={isLoadingAddress}
              className="input w-full rounded-md border border-stone-300 p-3 text-stone-800 shadow-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300"
            />
            {!(position.latitude && position.longitude) && (
              <span className="absolute top-[6px] right-[3px] z-10 md:top-[5px] md:right-[5px]">
                <Button
                  type="small"
                  onClick={handleGetPosition}
                  disabled={isLoadingAddress}
                >
                  Get position
                </Button>
              </span>
            )}
          </div>
          {addressStatus === "error" && (
            <p className="mt-1 text-sm text-red-600">{addressError}</p>
          )}
        </div>

        {/* ... Priority Checkbox, Hidden Inputs, and Submit Button */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-5 w-5 rounded-md accent-yellow-500 focus:ring-yellow-300"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label
            htmlFor="priority"
            className="text-sm font-medium text-stone-700"
          >
            Want to give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
        </div>

        <div className="pt-4">
          <Button
            disabled={isSubmitting || isLoadingAddress}
            className="w-full"
          >
            {isSubmitting
              ? "Placing order..."
              : `Order now! (${formatCurrency(totalPrice)})`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// ... action function remains the same ...
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    priority: data.priority === "on",
    cart: JSON.parse(data.cart),
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
