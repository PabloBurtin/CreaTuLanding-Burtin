import React from 'react'
import './NavBar.css'
import CartWidget from '../CarWidget/CartWidget'

const NavBar = () => {
  return (
    <header>
        <ul>
            <li>Home</li>
            <li>Nosotros</li>
            <li>Store</li>
            <li>Bodegas</li>
        </ul>
        <img className='logo' src="../../Imagenes/logo.png" alt="Logo" />
        <CartWidget/>
    </header>
  )
}

export default NavBar