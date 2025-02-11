import React from 'react'
import './NavBar.css'
import CartWidget from '../CarWidget/CartWidget'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <header>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Nosotros">Nosotros</Link></li>
            <li><Link to="/Store">Store</Link> </li>
            <li><Link to="/Bodegas">Bodegas</Link></li>
        </ul>
  
        <img className='logo' src="../../public/Imagenes/logo.jpg" alt="Logo" />
        <CartWidget/>
    </header>
  )
}

export default NavBar