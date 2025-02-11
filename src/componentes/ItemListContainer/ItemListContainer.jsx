import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { db } from '../../services/config'
import { collection, getDocs, query, where } from 'firebase/firestore'
import ItemList from '../ItemList/ItemList'
import Loader from '../Loader/Loader'


const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState (true)

    const {idCategoria} = useParams();

    useEffect(()=>{
      setLoading(true)
        const misProductos = idCategoria ? query(collection(db,"productos"), where ("idCat", "==", idCategoria)) : collection(db, "productos")

        getDocs(misProductos)
          .then(res => {
            const nuevosProductos = res.docs.map(doc => {
                const data= doc.data()
                return {id: doc.id, ...data}
            })
            setProductos(nuevosProductos)
          })
          .catch(error => console.log(error))
          .finally(()=>{
            console.log("Proceso terminado")
            setLoading(false)}
          )

    },[idCategoria])


  return (
    <>
    <h2 style={{textAlign: "center" }}>Mis Productos</h2>
    <ul>
      <li>
        <NavLink to="/categoria/lacteos">Lacteos</NavLink>
      </li>
      <li>
        <NavLink to="/categoria/almacen">Almacen</NavLink>
      </li>
    </ul>
    {loading ? <Loader/> : <ItemList productos={productos} />}
    </>
  )
}

export default ItemListContainer