import React, { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearItem, deleteItem, getCart, getTotalCartPrice } from "../cart/CartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from '../../store'
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  // const cart = fakeCart;
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  const dispatch = useDispatch();

  const formErrors = useActionData();
  const {username,status:addressStatus,position,address,error:errorAddress} = useSelector((store)=>store.user)

  const isLoadingAddress = addressStatus === 'loading';

  const cart = useSelector(getCart);
  if(!cart.length)return <EmptyCart />
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priority = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priority;


  return (
    <div className="px-6 py-4">

      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input type="text" name="customer" defaultValue={username} required className="input grow"/>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
          </div>
          {formErrors?.phone && (
            <p className="mt-2 rounded-md text-xs p-2 bg-red-100 text-red-700">{formErrors.phone}</p>
          )}
        </div>

        <div className="mb-5 flex  flex-col gap-2 relative sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input type="text" name="address" required className="input w-full" disabled={isLoadingAddress} defaultValue={address}/>

            {addressStatus ==='error' && (
            <p className="mt-2 rounded-md text-xs p-2 bg-red-100 text-red-700">{errorAddress}</p>
          )}
          </div>
          {!position.latitude && !position.longitude &&<span className="absolute right-[3px] top-[3px] z-50 md:right-[3px] md:top-[3px]">
          <Button type='small' disabled={isLoadingAddress} onClick={(e)=>{
            e.preventDefault();
            dispatch(fetchAddress())}}>Get Position</Button>
            </span>}

        </div>

        <div className="mb-10 flex gap-2 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className=" w-6 h-6 accent-yellow-400 
            focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2

            " value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}

          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.latitude && position.longitude ? `${position.latitude},${position.longitude}`: ""}/>
          <Button type="primary" disabled={submitting || isLoadingAddress}>
            {submitting ? "Placing Order..." : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  // console.log(request)
  const data = Object.fromEntries(formData);
  // console.log(data)
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = `Please Give us your correct Phone number. we might need it to contact you`;

    if (Object.keys(errors).length > 0) return errors;
  }
  // If every thing is Okay create new Order and redirect
  const newOrder = await createOrder(order);
  console.log(newOrder);
  store.dispatch(clearItem());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
