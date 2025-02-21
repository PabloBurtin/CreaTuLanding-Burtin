
import React from 'react'
import Home from './componentes/Home/Home'
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer'
import NavBar from './componentes/NavBar/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CarritoProvider } from './Context/CarritoContext'
import { BodegaProvider } from './Context/BodegaContext'
import { CepaProvider } from './Context/CepaContext'
import Cart from './componentes/Cart/Cart'
import Checkout from './componentes/Checkout/Checkout'
import ItemDetailContainer from './componentes/ItemDetailContainer/ItemDetailContainer'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  

  
  return (
    <>
   <BrowserRouter>
   <CarritoProvider>
    <BodegaProvider>
      <CepaProvider>
      <NavBar/>
      <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route path='/Store' element={<ItemListContainer/>}/>
        <Route path='item/:idItem' element={<ItemDetailContainer/>}/>
        <Route path='/Store/bodega/:idBodega' element={<ItemListContainer/>}/>
        <Route path='/Sore/cepa/:idCepa' element={<ItemListContainer/>}/>
        <Route path="/Store/bodega/:idBodega/cepa/:selectedCepa" element={<ItemListContainer/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='*' element={<h2>Sitio en contrucción</h2>}/>
      </Routes>
    </CepaProvider>
    </BodegaProvider>
    </CarritoProvider>
    </BrowserRouter>

    </>
  )
}

export default App
