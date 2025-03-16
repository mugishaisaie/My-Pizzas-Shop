import React from "react";
import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div>
      <p>
        <span>23 pizzas</span>
        <span>$23.45</span>
        <Link to='/order'>Order Now</Link>
      </p>
      <Link to='/cart/:orderId'>Open cart &rarr;</Link>
      <p>Visit Menu Items</p>
      <Link to='/menu'>Open Menu &rarr;</Link>
    </div>
  );
}

export default CartOverview;
