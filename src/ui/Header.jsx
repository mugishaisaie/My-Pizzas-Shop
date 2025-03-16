import React from 'react'
import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'

function Header() {
  return (
    <header>
        <Link to="/" className='text-3xl text-red-700'>Pizza App</Link>
        <SearchOrder />
    </header>
  )
}

export default Header
