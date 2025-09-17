import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Menu, { loader as MenuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as CreateOrderAction,
} from "./features/order/CreateOrder";
// 1. Import the new action and give it a unique alias
import Order, {
  loader as OrderLoader,
  action as updateOrderAction,
} from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/menu",
          element: <Menu />,
          loader: MenuLoader,
          errorElement: <Error />,
        },
        { path: "/cart", element: <Cart /> },
        {
          path: "/order/new",
          element: <CreateOrder />,
          action: CreateOrderAction,
        },
        {
          path: "/order/:orderId",
          element: <Order />,
          loader: OrderLoader,
          errorElement: <Error />,
          // 2. Connect the action to the route
          action: updateOrderAction,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
