import React, { useContext } from 'react'
import { CarritoContext } from '../../Context/CarritoContext'
import { Link } from 'react-router-dom'
import Cartitem from "../CartItem/Cartitem"

const Cart = () => {
    const {carrito, vaciarCarrito, total, cantidadTotal} = useContext (CarritoContext)

    if (cantidadTotal === 0) {
        return (
            <>
            <h2 className='carrito-vacio'> No hay productos en el carrito. Ve a nuestra tienda.</h2>
            <Link className='boton-store' to = "/Store">Ir a Store</Link>
            </>
        )
    }
  return (
    <>
        {
            carrito.map (producto => <Cartitem key={producto.id} {...producto}/>)
        }
            <h3 className='total-precio-compra'>Total: ${total}</h3>
            <h3 className='total-cantidad-compra'>Cantidad total: {cantidadTotal}</h3>
            <button className='boton-vaciar' onClick={()=> vaciarCarrito()}> Vaciar Carrito</button>
            <Link className='boton-confirmar' to="/checkout">Finalizar compra</Link>
    </>
  )
}

export default Cart