import React from 'react'
import Header from './Header'
import { Link, Outlet, useNavigation } from 'react-router-dom'
import CartOverview from '../features/cart/CartOverview'
import Loader from './Loader';

function PageLayout() {
    const navigation = useNavigation();

    const isLoading = navigation.state === 'loading';
    
  return (
    <div className='layout'>
        <Header />
        <h2 className='text-fuchsia-900 font-serif border-lime-500'>Pizza App</h2>
        <main>
            {isLoading && <Loader />}
            <Outlet />
        </main>

        <CartOverview />
    </div>
  )
}

export default PageLayout
