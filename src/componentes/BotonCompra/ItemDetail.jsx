import React from 'react'
import InputCount from './InputCount'
import ButtonCount from './ButtonCount'


const ItemDetail = ({item, inputType='input'}) => {
    const Count = inputType === "input" ? InputCount : ButtonCount;
    // const max = item.max

    const addToCart = (quantity) => {
        alert (`Agregaste ${quantity} unidades de ${product.title} al carrito.`)
    }

  return (
    <div>
        <Count onConfirm = {addToCart} maxQuantity={10}/>
    </div>
  )
}

export default ItemDetail