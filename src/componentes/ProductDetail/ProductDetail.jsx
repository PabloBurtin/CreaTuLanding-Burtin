import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../../async';
import './ProductDetail.css'

const ProductDetail = () => {
    
    const {id} = useParams ();

    const [product, setProduct] = useState ({});

    useEffect(()=>{
        getSingleProduct(id).then(item => setProduct(item))
    }, [id])
  
    return (
    <section>
        <h2>Vista del product detail👔</h2>
        <h3>{product.title}</h3>
        <article>
            <img style={{width: 200 }} src={product.image} alt={product.title} />
        </article>
        <p>{product.description}</p>
        <p>Price $ {product.price}</p>

    </section>
  )
}

export default ProductDetail