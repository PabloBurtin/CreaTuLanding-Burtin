// import React, { useEffect, useState } from 'react'
// import { NavLink, useParams } from 'react-router-dom'
// import { db } from '../../services/config'
// import { collection, getDocs, query, where } from 'firebase/firestore'
// import ItemList from '../ItemList/ItemList'
// import Loader from '../Loader/Loader'


// const ItemListContainer = () => {
//   const [productos, setProductos] = useState([]);
//   const [loading, setLoading] = useState (true)

//     const {idCategoria} = useParams();

//     useEffect(()=>{
//       setLoading(true)
//         const misProductos = idCategoria ? query(collection(db,"productos"), where ("idCat", "==", idCategoria)) : collection(db, "productos")

//         getDocs(misProductos)
//           .then(res => {
//             const nuevosProductos = res.docs.map(doc => {
//                 const data= doc.data()
//                 return {id: doc.id, ...data}
//             })
//             setProductos(nuevosProductos)
//           })
//           .catch(error => console.log(error))
//           .finally(()=>{
//             console.log("Proceso terminado")
//             setLoading(false)}
//           )

//     },[idCategoria])


//   return (
//     <>
//     <h2 style={{textAlign: "center" }}>Mis Productos</h2>
//     <ul>
//       <li>
//         <NavLink to="/categoria/lacteos">Lacteos</NavLink>
//       </li>
//       <li>
//         <NavLink to="/categoria/almacen">Almacen</NavLink>
//       </li>
//     </ul>
//     {loading ? <Loader/> : <ItemList productos={productos} />}
//     </>
//   )
// }

// export default ItemListContainer

import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { db } from '../../services/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import ItemList from '../ItemList/ItemList';
import Loader from '../Loader/Loader';

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bodegas, setBodegas] = useState([]);
  const [selectedBodega, setSelectedBodega] = useState('');
  const { idBodega } = useParams();

  useEffect(() => {
    const obtenerBodegas = async () => {
      try {
        const res = await getDocs(collection(db, 'productos'));
        const listaBodegas = [];
        
        res.docs.forEach(doc => {
          const data = doc.data();
          if (data.Bodega && !listaBodegas.includes(data.Bodega)) {
            listaBodegas.push(data.Bodega);
          }
        });
        
        setBodegas(listaBodegas);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerBodegas();
  }, []);

  useEffect(() => {
    setLoading(true);
    let misProductosQuery = collection(db, 'productos');

    if (idBodega) {
      misProductosQuery = query(misProductosQuery, where('Bodega', '==', idBodega));
    }

    getDocs(misProductosQuery)
      .then(res => {
        const nuevosProductos = res.docs.map(doc => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });
        setProductos(nuevosProductos);
      })
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [idBodega]);


  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Mis Productos</h2>
      
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        {/* Menú desplegable para seleccionar bodega */}
        <select value={idBodega || ''} onChange={(e) => {
          const selected = e.target.value
          window.location.href =`/Store/bodega/${selected || ''}`
        }}>
          <option value="">Todas las Bodegas</option>
          {bodegas.map((bodega, index) => (
            <option key={index} value={bodega}>
              {bodega}
            </option>
          ))}
        </select>
      </div>

      {loading ? <Loader /> : <ItemList productos={productos} />}
    </>
  );
}

export default ItemListContainer;