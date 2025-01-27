import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import './Home.css'



const Home = () => {

const [nombre, setNombre] = useState ("")
const [email, setEmail] = useState ("")
const [telefono, setTelefono] = useState ("")
const [mensaje, setMensaje] = useState ("")

const enviarMensaje = (e) => {
    e.preventDefault()

    const templateParams = {
        from_name: nombre,
        from_email: email,
        from_tel: telefono,
        message: mensaje
    }

    emailjs.send(
        //id del servicio
        "service_k7e1l5q", 
        //id de la template
        "template_nsufa7m",
        //objeto con los datos del formulario
        templateParams,
        // id del usuario (keypublica)
        "qFYthUyxJTbR-p9NK"

    )
    .then (()=>console.log ("Mensaje enviado"))
    .catch(error => console.log (error))

    setNombre("")
    setMensaje("")
    setTelefono("")
    setEmail("")

}
  
    return (
    <div className='Home'>
    <form onSubmit={enviarMensaje}>
        <label htmlFor="">Nombre</label>
        <input type="text" value={nombre} onChange={(e)=>setNombre(e.target.value)} />

        <label htmlFor="">Dirección de mail</label>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>

        <label htmlFor="">Teléfono</label>
        <input type="tel" pattern='[0-9]{10}' placeholder='1234567890' onChange={(e)=>setTelefono(e.target.value)} />

        <label htmlFor="">Mensaje:</label>
        <textarea name="" id="" cols="30" rows="10" value={mensaje} onChange={(e)=>setMensaje(e.target.value)}></textarea>
    
        <button type='submit'> Enviar Mensaje</button>

    </form>
    </div>
  )
}

export default Home