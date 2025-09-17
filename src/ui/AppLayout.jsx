import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      {/* Header fixed at top */}
      <Header />

      {/* Scroll only inside Outlet */}
      <main className="mx-auto h-full w-full max-w-3xl overflow-y-auto">
        <Outlet />
      </main>

      {/* Footer fixed at bottom */}
      <CartOverview />
    </div>
  );
}

export default AppLayout;
