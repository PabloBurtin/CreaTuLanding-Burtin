import React, { useEffect, useState } from 'react'
// import './ItemListContainer.css'
import Item from '../Item/Item'

const ItemListContainer = ({}) => {
  
  return (
    <section
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 20,
      justifyContent: "center",
      width: "100%",
      backgroundColor: "grey",
      border: "1px solid black",
      borderRadius: 5,
      marginTop: 30,
      height: "600px",
    }}>
    <h2>Mis Productos</h2>
    <Item />
    </section>
  )
}

export default ItemListContainer