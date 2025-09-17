import { useLoaderData, useFetcher } from "react-router-dom";
import { useEffect } from "react";
import { getOrder, updateOrder } from "../../service/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") {
        fetcher.load("/menu");
      }
    },
    [fetcher],
  );

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  const isUpdating = fetcher.state === "submitting";

  return (
    // THE FIX IS HERE: Increased bottom padding to push content above the fixed cart footer.
    <div className="space-y-8 px-4 pt-6 pb-24">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} Status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold tracking-wide text-red-50 uppercase">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold tracking-wide text-green-50 uppercase">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-t border-b">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher.data?.find((el) => el.id === item.pizzaId)?.ingredients ??
              []
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && (
        <div className="text-right">
          <fetcher.Form method="PATCH">
            <button
              className="w-full rounded-lg bg-yellow-500 px-3 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-yellow-600 focus:ring focus:ring-yellow-300 focus:outline-none disabled:cursor-not-allowed disabled:bg-yellow-300 sm:w-auto sm:px-5 sm:py-3 sm:text-base"
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Make Priority"}
            </button>
          </fetcher.Form>
        </div>
      )}
    </div>
  );
}

// Action and Loader functions remain the same
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export async function action({ params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}

export default Order;
