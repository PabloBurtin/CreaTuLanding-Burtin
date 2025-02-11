import React from 'react'
import './CartWidget.css'
import { useContext } from 'react'
import { CarritoContext } from '../../Context/CarritoContext'
import { Link } from 'react-router-dom'

const CartWidget = () => {

  const {cantidadTotal} = useContext (CarritoContext)
  
  return (
    <>

    <Link to = "/cart">
    <img className= 'carrito' src="../../public/Imagenes/logo-carrito.jpg" alt="carrito" />
    {cantidadTotal > 0 && <strong>{cantidadTotal}</strong>}
    </Link>
    </>
  )
}

export default CartWidget