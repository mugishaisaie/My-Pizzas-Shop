import React from "react";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantity } from "../cart/CartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const CurrentQuantity = useSelector(getCurrentQuantity(id))
  console.log(CurrentQuantity)
  const isInCart = CurrentQuantity > 0;

  function handleAddToCart(){
    const newItem ={
      pizzaId :id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice : unitPrice * 1,

    }
    dispatch(addItem(newItem))

  }

  return (
    <li className="flex h-25 gap-5 py-2">
      <img src={imageUrl} alt={name} className={`h-25 ${soldOut? 'opacity-72 grayscale': ''}`} />
      <div className="flex flex-col grow pt-0.5">
        <p className="font-bold">{name}</p>
        <p className="text-sm italic capitalize text-stone-600">{ingredients.join(", ")}</p>
        <div className="mt-auto flex justify-between items-center">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase text-stone-500 font-bold">Sold out</p>}


         {isInCart && <div className="flex items-center gap-3 md:gap-8">
          <UpdateItemQuantity pizzaId={id} CurrentQuantity={CurrentQuantity}/>
          <DeleteItem pizzaId={id}/>
          </div> }
         {!soldOut && !isInCart && <Button type="small" onClick ={handleAddToCart}>Add to Cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
