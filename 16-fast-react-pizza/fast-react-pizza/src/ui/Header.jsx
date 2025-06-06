import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/username";

function Header() {
  return (
    <header className="flex items-center justify-between bg-yellow-500 uppercase px-4 pyy-3 border-b border-stone-500 sm:px-6 font-serif">
      <Link to="/" className="tracking-widest">Fast React Pizza</Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;