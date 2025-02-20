
import React from 'react'
import Home from './componentes/Home/Home'
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer'
import NavBar from './componentes/NavBar/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CarritoProvider } from './Context/CarritoContext'
import Cart from './componentes/Cart/Cart'
import Checkout from './componentes/Checkout/Checkout'
import ItemDetailContainer from './componentes/ItemDetailContainer/ItemDetailContainer'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  

  
  return (
    <>
   <BrowserRouter>
   <CarritoProvider>
      <NavBar/>
      <Routes>
        <Route exact path='/' element= {<Home/>}/>
        <Route exact path='/Store' element={<ItemListContainer/>}/>
        <Route path='item/:idItem' element={<ItemDetailContainer/>}/>
        <Route path='/Store/bodega/:idBodega' element={<ItemListContainer/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route exact path='*' element={<h2>Sitio en contrucción</h2>}/>
      </Routes>
    </CarritoProvider>
    </BrowserRouter>

    </>
  )
}

export default App
