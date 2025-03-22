import React from 'react'
import Button from '../../ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseItemQuantity, increaseItemQuantity } from './CartSlice'

function UpdateItemQuantity({pizzaId,CurrentQuantity}) {

    const dispatch = useDispatch()
  return (
    <div className='flex items-center gap-1 md:gap-3'>
      <Button type='round' onClick={()=>dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
      <span className='text-stone-800 font-semibold text-sm'>{CurrentQuantity}</span>
      <Button type='round' onClick={()=>
        dispatch(increaseItemQuantity(pizzaId))}>+</Button>
    </div>
  )
}

export default UpdateItemQuantity
