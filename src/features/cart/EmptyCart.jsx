
import React from "react";
import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="py-4 px-6">
 <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <p className="mt-10 font-semibold text-2xl text-stone-700">Your cart is  empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
