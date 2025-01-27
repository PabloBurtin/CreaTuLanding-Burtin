const misProductos = [
 {id: 1, nombre: "Fideos", precio: 500},
 {id: 2, nombre: "Aceite", precio: 500},
 {id: 3, nombre: "Lata de tomate", precio: 500},

]

export const getProductos = () => {
    return new Promise ((resolve)=>{
        setTimeout(()=>{
            resolve(misProductos)
        },2000)
    })
}