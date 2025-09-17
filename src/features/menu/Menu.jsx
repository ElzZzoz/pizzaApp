import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../service/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();

  return (
    // SUGGESTION 1: Added bottom padding to prevent overlap with the cart bar
    <ul className="divide-y divide-stone-200 px-2 pb-24">
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

// SUGGESTION 2: Renamed from `Loader` to `loader` to follow convention
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
