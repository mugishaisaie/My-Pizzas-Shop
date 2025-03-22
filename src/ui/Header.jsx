import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <header className="flex items-center justify-between text-xl bg-yellow-500 px-8 py-3 border-b border-stone-900 font-sans">
      <Link to="/" className="uppercase tracking-widest font-sans">
        🍕My Pizzas
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
