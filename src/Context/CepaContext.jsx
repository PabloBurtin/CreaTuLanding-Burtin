import React, { createContext, useState } from 'react'

const CepaContext = createContext ();

export const CepaProvider = ({ children }) => {
    const [cepas, setCepas] = useState ([]);
    const [selectedCepa, setSelectedCepa] = useState ('');


  return (
    <CepaContext.Provider value={{cepas, setCepas, selectedCepa, setSelectedCepa}}>
        {children}
    </CepaContext.Provider>
  )
}

export default CepaContext