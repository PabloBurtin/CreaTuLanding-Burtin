import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ItemDetail.css'
import { CarritoContext } from '../../Context/CarritoContext'
import { useContext } from 'react';
import ButtonCount from '../BotonCompra/ButtonCount';

const ItemDetail = ({ id, Bodega, Linea, Cepa, stock, Precio, img }) => {

  const {agregarAlCarrito} = useContext(CarritoContext)

  const [agregarCantidad, setAgregarCantidad] = useState(0);


  const manejadorCantidad = (cantidad) => {
    setAgregarCantidad(cantidad);

    const item = {id,Bodega, Linea, Cepa, Precio}
    agregarAlCarrito(item,cantidad)
    
  }


  return (
    <div className='contenedorItem'>
      <h2>Nombre: {Bodega} </h2>
      <h3>Linea: {Linea}</h3>
      <h4>Cepa: {Cepa}</h4>
      <h5>Precio: {Precio} </h5>
      <img src={img} alt={img} />
      <p></p>



      {
        agregarCantidad > 0 ? (<Link to="/cart">Terminar Compra</Link>) : (<ButtonCount inicial={1} stock={stock} funcionAgregar={manejadorCantidad}/>)
      }



    </div>
  )
}

export default ItemDetail