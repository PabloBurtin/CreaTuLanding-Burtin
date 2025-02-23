import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../services/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import ItemList from '../ItemList/ItemList';
import Loader from '../Loader/Loader';
import BodegaContext from '../../Context/BodegaContext';
import CepaContext from '../../Context/CepaContext';


const ItemListContainer = () => {
  const [loading, setLoading] = useState(true);
  const { idBodega } = useParams();
  const navigate = useNavigate();
  const { setProductos, bodegas, setBodegas } = useContext(BodegaContext);
  const {cepas, setCepas, selectedCepa, setSelectedCepa} = useContext (CepaContext);
  const [orden, setOrden] = useState ('');

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const obtenerBodegas = async () => {
      try {
        const res = await getDocs(collection(db, 'productos'));
        const listaBodegas = new Set ();
       
        
        res.docs.forEach(doc => {
          const data = doc.data();
          if (data.Bodega) {
            listaBodegas.add(data.Bodega);
          }
        });

        setBodegas([...listaBodegas]);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerBodegas();
  }, [setBodegas]);

  useEffect(() => {
    setLoading(true);
    const obtenerCepasYProductos = async () => {
      try {
        const res = await getDocs(collection (db, 'productos'));
        let nuevosProductos = res.docs.map(doc=>({
          id: doc.id, ...doc.data()
        }));

        const bodegasConCepa = new Set();
        const cepasDisponibles = new Set();
        const listaBodegas = new Set();

        nuevosProductos.forEach(producto => {
          cepasDisponibles.add(producto.Cepa);
          listaBodegas.add(producto.Bodega)

          if (selectedCepa && producto.Cepa === selectedCepa){
            bodegasConCepa.add(producto.Bodega)
          }
        });

        setCepas([...cepasDisponibles])

        if (selectedCepa) {
          setBodegas ([...bodegasConCepa]);
        } else { 
          setBodegas ([...listaBodegas]);
        }

        if (selectedCepa){
          nuevosProductos = nuevosProductos.filter (producto => producto.Cepa === selectedCepa);
        }

        if (idBodega) {
          nuevosProductos = nuevosProductos.filter(producto => producto.Bodega === idBodega);
          
         
          const cepasFiltradas = new Set();
          nuevosProductos.forEach(producto => {
            cepasFiltradas.add(producto.Cepa);
          });
          setCepas([...cepasFiltradas]);
        }

        nuevosProductos = shuffleArray(nuevosProductos);


        if (orden === 'menor') {
          nuevosProductos.sort ((a, b) => a.Precio - b.Precio)
        } else if (orden === 'mayor') {
          nuevosProductos.sort((a, b) => b.Precio - a.Precio);
        }

        console.log ('Productos después del filtrado', nuevosProductos);
        
        setProductos(nuevosProductos); // Almacenar productos en el contexto
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    obtenerCepasYProductos();
  }, [idBodega, selectedCepa, setProductos, orden]);

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Mis Productos</h2>
      <div className='selectorBodega'>
        <p> Seleccionar bodega
        <select value={idBodega || ''} onChange={(e) => {
          const selected = e.target.value;
          navigate(selected ? `/Store/bodega/${selected}` : '/Store');
        }}>
          <option value="">Todas las Bodegas</option>
          {bodegas.map((bodega, index) => (
            <option key={index} value={bodega}>
              {bodega}
            </option>
          ))}
        </select>
        </p>
      </div>

      <div className='selectorCepa'>
        <p> Seleccionar Cepa
      <select value={selectedCepa || ''} onChange={(e) => {
    const selectedCepaValue = e.target.value;
    setSelectedCepa(selectedCepaValue);
    if (idBodega) {
      navigate(selectedCepaValue ? `/Store/bodega/${idBodega}/cepa/${selectedCepaValue}` : `/Store/bodega/${idBodega}`);
    } else {
      navigate('/Store'); // Navegar a la tienda si no se selecciona ninguna bodega
    }
  }}>
    <option className='OptionCepa'value="">Todas</option>
    {cepas.map((cepa, index) => (
      <option key={index} value={cepa}>
        {cepa}
      </option>
    ))}
  </select>
  </p>
</div>

      <div className='BotonDeOrdenMenor'>
        <button onClick={()=> setOrden('menor')}> Ordenar por Menor Precio ⬇️</button>
      </div>
      <div className='BotonDeOrdenMayor'>
        <button onClick={()=> setOrden('mayor')}> Ordenar por Mayor Precio ⬆️</button>
      </div>

      {loading ? <Loader /> : <ItemList />}
    </>
  );
}

export default ItemListContainer;