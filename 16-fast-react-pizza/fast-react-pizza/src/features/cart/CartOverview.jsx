import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartItem, getTotalPrize } from "./cartSlice";

function CartOverview() {
  const totalCartQuantity  = useSelector(getTotalCartItem);
  const totalPrize = useSelector(getTotalPrize);
  if(!totalCartQuantity) return null;
  return (
    <div className="bg-stone-800 text-stone-200 uppercase px-4 py-4 text-sm flex items-center justify-between sm:px-6 md:text-base">
      <p className="font-semibold text-stone-300 space-x-4 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>${totalPrize}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
