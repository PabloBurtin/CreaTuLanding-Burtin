import './Item.css';
import { Link } from 'react-router-dom';


const Item = ({id, Bodega, Precio, img, Linea, Cepa, stock}) => {

  return (
    
    <div className='cardProducto'>
        <img src={img} alt={Bodega + Linea + Cepa} />
        <h3>Bodega: {Bodega}</h3>
        <h4>Linea: {Linea} </h4>
        <p>Cepa: {Cepa}</p>
        <p>Precio: {Precio}</p>
        <p>Stock: {stock}</p>
        <Link to={`/item/${id}`}> Ver Detalles </Link>

        
    </div>
  )
}

export default Item