import React from 'react'
import { Link } from 'react-router-dom';

function Button({children,disabled,to,type,onClick}) {

  const base = 'mt-2  text-sm cursor-pointer inline-block rounded-full bg-yellow-400 px-3 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300  focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed'

  const styles ={
    primary: base + ' px-4 py-3 md:px-6 md:py-4',
    small:base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    round: base + ' px-2.5 py-1 md:px-3.5 md:py-2.5 text-sm',
   secondary:'inline-block rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-500 transition-colors duration-300 hover:bg-stone-200 hover:text-stone-900 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 cursor-pointer md:px-6 md:py-3.5'
  }

  if(to) return<Link to={to} className={styles[type]}>{children}</Link>
  if(onClick) return<button onClick={onClick} className={styles[type]}>{children}</button>
  return (
    <button disabled={disabled} className={styles[type]}>
        {children}
      
    </button>
  )
}

export default Button
