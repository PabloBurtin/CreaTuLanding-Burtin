import { createContext, useState } from "react";

export const CarritoContext = createContext ({
    carrito: [],
    total: 0,
    cantidadTotal: 0
});

export const carritoProvider = ({children}) => {

    const [carrito, setCarrito] = useState([])
    const [tota, setTotal] = useState(0)
    const [cantidadTotal, setCantidadTotal] = useState (0)

    const agregarAlCarrito = (item, cantidad) => {
        const productoExistente =carrito.find (prod => prod.item.id === item.id)

        if (!productoExistente) {
            setCarrito(prev=> [...prev, {item, cantidad}])
            setCantidadTotal(prev=> prev+cantidad)
            setTotal (prev => prev + (item.precio * cantidad))
        } else {
            const carritoActualizado = carrito.map (prod => {
                if (prod.item.id == item.id){
                    return {...prod, cantidad: prod.cantidad + cantidad}
                    
                }else {return prod}
            })
            setCarrito(carritoActualizado)
            setCantidadTotal(prev => prev+cantidad)
            setTotal(prev => prev + (item.precio * cantidad))
        }
    }
    const vaciarCarrito = () => {
        setCarrito([])
        setCantidadTotal(0)
        setTotal(0)
    }
    
    //Funcion eleminar un producto
    
    const eliminarProducto = (id) => {
        const productoEleminado = carrito.find (prod => prod.item.id === id)
        const carritoActualizado = carrito.filter(prod => prod.item.id !== id)
    
        setCarrito(carritoActualizado)
        setCantidadTotal(prev => prev - productoEleminado.cantidad)
        setTotal (prev => prev - (productoEleminado.item.precio * productoEleminado.cantidad))
    }

    
}

//Para vaciar el carrito

