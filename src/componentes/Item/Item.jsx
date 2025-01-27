import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { getProd } from '../../async';
import { Link } from 'react-router-dom';

// import './Item.css'

const Item = () => {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    getProd().then ((data)=>setProducts(data))
  }, [])

  return (
    <section
    style={{
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      height: "100vh",
      overflowY: "auto",
      gap: 20,
      justifyContent: "center",

    }}>
      {products.map((product)=>(
        <article style={{
          display: "flex",
          flexDirection: "column",
          padding: 20,
          gap: 20,
          border: "1px solid white",
          borderRadius: 5,
          backgroundColor: 'white',
        }
        } key={product.id}>
          <img style={{width: 100, height:100}} 
          src={product.image} alt={product.title} />
          <button><Link to ={`/product/${product.id}`}>Ver mas detalles</Link></button>
        </article>
      ))}
    </section>
  )
}

export default Item