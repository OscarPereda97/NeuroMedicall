import React, { Fragment, useEffect, useState }from 'react';
import { Link } from 'react-router-dom'
import '@popperjs/core'
import 'bootstrap'

const Historias = () => {
    const urlBase = 'https://neuromedicall-backend.herokuapp.com'

    const [datos, setDatos] = useState([])

    useEffect(() => {
        obtenerDatos();
    },[])

    const obtenerDatos = async () => {
        const data = await fetch(`${urlBase}/getAtenciones`)
            .then(console.log("Peticion correcta"))
            .catch(console.log("Error"))
        const datos = await data.json()
        setDatos(datos.atenciones)
    }

    const imprimirPDF = async(id)=>{
        alert("Error al enviar solicitud de impresión")
        const data = await fetch(`${urlBase}/imprimirPDF/${id}`)
            .then(console.log("Peticion correcta"))
            .catch(console.log("Error"))
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12">
                    <h2><strong>Historias clínicas</strong></h2>
                </div>
                <div className="col-12">
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Paciente</th>
                                <th>Consulta</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                datos.map(item=>{
                                    console.log(item)
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.createdAt}</td>
                                            <td>{item.pacienteId.apellidoPaterno} {item.pacienteId.apellidoMaterno} {item.pacienteId.nombres}</td>
                                            <td>{item.servicioId.servicio}</td>
                                            <td>
                                               <button onClick={()=>{imprimirPDF(item._id)}} className="btn btn-primary"><i class="fas fa-print    "></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )
}

export default Historias