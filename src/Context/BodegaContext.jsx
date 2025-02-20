import React, { children, createContext, useState } from 'react'

const BodegaContext = createContext();
export const BodegaProvider = ({children}) => {
    const [productos, setProductos] = useState([]);
    const [bodegas, setBodegas] = useState([]); 

  return (
    <BodegaContext.Provider value = {{productos, setProductos, bodegas, setBodegas}}>
        {children}
    </BodegaContext.Provider>
  );
}

export default BodegaContext