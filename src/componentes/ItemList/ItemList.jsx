import React from 'react'
import Item from '../Item/Item'
import './ItemList.css'

const ItemList = ({productos}) => {
  return (
    <div className='contenedorProductos'>
      {productos.map(item => <Item key={item.ID} {...item}/>)}
    </div>
  )
}

export default ItemList