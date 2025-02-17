import React, { useContext } from 'react'
import { CarritoContext } from '../../Context/CarritoContext'

const Cartitem = ({item,cantidad}) => {
    const {eliminarProducto} = useContext(CarritoContext)

  return (
    <>
        <h4>{item.Bodega} {item.Linea} {item.Cepa}</h4>
        <p>Cantidad: {cantidad}</p>
        <p>Precio: {item.Precio}</p>
        <button onClick={()=>eliminarProducto(item.id)}>Eliminar</button>
    </>
  )
}

export default Cartitem