
import Home from './componentes/Home/Home'
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer'
import NavBar from './componentes/NavBar/NavBar'
import ProductDetail from './componentes/ProductDetail/ProductDetail'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  

  return (
    <>
   <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route exact path='/' element= {<Home/>}/>
        <Route exact path='/Store' element={<ItemListContainer/>}/>
        <Route exact path='/product/:id' element={<ProductDetail/>}/>
        <Route exact path='*' element={<h2>Sitio en contrucción</h2>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
