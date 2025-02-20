import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { db } from '../../services/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import ItemList from '../ItemList/ItemList';
import Loader from '../Loader/Loader';

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bodegas, setBodegas] = useState([]);
  const { idBodega } = useParams();
  const navigate = useNavigate ();

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
      
      <div className='selectorBodega'>
       
        <select value={idBodega || ''} onChange={(e) => {
          const selected = e.target.value;
          if (selected){ 
            navigate (`/Store/bodega/${selected || ''}`);
          } else {
            navigate ('/Store');
          }
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