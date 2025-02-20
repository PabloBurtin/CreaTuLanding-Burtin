import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../services/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import ItemList from '../ItemList/ItemList';
import Loader from '../Loader/Loader';
import BodegaContext from '../../Context/BodegaContext';


const ItemListContainer = () => {
  const [loading, setLoading] = useState(true);
  const { idBodega } = useParams();
  const navigate = useNavigate();
  const { setProductos, bodegas, setBodegas } = useContext(BodegaContext);

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
  }, [setBodegas]);

  useEffect(() => {
    setLoading(true);
    const obtenerProductos = async () => {
      try {
        let misProductosQuery = collection(db, 'productos');
        
        if (idBodega) {
          misProductosQuery = query(misProductosQuery, where('Bodega', '==', idBodega));
        }

        const res = await getDocs(misProductosQuery);
        const nuevosProductos = res.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log ('Productos después del filtrado', nuevosProductos);
        
        setProductos(nuevosProductos); // Almacenar productos en el contexto
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    obtenerProductos();
  }, [idBodega, setProductos]);

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Mis Productos</h2>
      <div className='selectorBodega'>
        <select value={idBodega || ''} onChange={(e) => {
          const selected = e.target.value;
          if (selected) { 
            navigate(`/Store/bodega/${selected}`);
          } else {
            navigate('/Store');
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

      {loading ? <Loader /> : <ItemList />}
    </>
  );
}

export default ItemListContainer;