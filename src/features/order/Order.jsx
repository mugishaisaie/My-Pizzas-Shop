// Test ID: IIDSAT
import React, { useEffect } from "react";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { getOrder } from "../../services/apiRestaurant";
import { useFetcher, useLoaderData } from "react-router-dom";
import CartItem from "../cart/CartItem";
import OrderItem from "./OrderItem";
import UpdateOrder from "./UpdateOrder";

// const order = {
//   id: "ABCDEF",
//   customer: "Jonas",
//   phone: "123456789",
//   address: "Arroios, Lisbon , Portugal",
//   priority: true,
//   estimatedDelivery: "2027-04-25T10:00:00",
//   cart: [
//     {
//       pizzaId: 7,
//       name: "Napoli",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: "Diavola",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: "Romana",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: "-9.000,38.000",
//   orderPrice: 95,
//   priorityPrice: 19,
// };

function Order() {
  const order = useLoaderData();

  const fetcher = useFetcher();

  useEffect(()=>{
    if(!fetcher.data && fetcher.state ==='idle')
      fetcher.load('/menu');
  },[fetcher])
  // console.log(fetcher.data)
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
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

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2 ">
        <h2 className="text-xl font-semibold"> Order #{id} Status</h2>

        <div className="space-x-2">
          {priority && <span className="rounded-full bg-red-500 px-3 py-1 text-red-50 font-semibold uppercase tracking-wide">Priority</span>}
          <span className="rounded-full bg-green-500 px-3 py-1 text-green-50 font-semibold uppercase tracking-wide">{status} order</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 py-5 px-4 rounded-lg">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
      <ul className="divide-stone-200 divide-y border-b border-t border-stone-200">
        {cart.map((item)=><OrderItem item={item} key={item.pizzaId}
        isLoadingIngredients={fetcher.state === 'loading'}
        ingredients={fetcher.data?.find((el)=>el.id === item.pizzaId).ingredients ?? []}/>)}
      </ul>

      <div className="space-y-2 bg-stone-200 py-5 px-6">
        <p className="text-sm text-stone-600 font-medium">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm text-stone-600 font-medium">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
      {!priority && <UpdateOrder order={order}/>}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);

  return order;
}

export default Order;
