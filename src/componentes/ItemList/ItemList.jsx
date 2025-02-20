import React, { useContext } from 'react';
import Item from '../Item/Item';
import './ItemList.css';
import BodegaContext from '../../Context/BodegaContext';

const ItemList = () => {
  const { productos } = useContext(BodegaContext);

  return (
    <div className='contenedorProductos'>
      {productos.map(item => <Item key={item.id} {...item} />)}
    </div>
  );
}

export default ItemList;