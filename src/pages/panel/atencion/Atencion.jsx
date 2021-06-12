import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '@popperjs/core'
import 'bootstrap'

const Atencion = () => {
    const urlBase = 'http://localhost:8000'

    const [datos, setDatos] = useState([])

    useEffect(() => {
        obtenerDatos();
    },[])

    const obtenerDatos = async () => {
        const data = await fetch(`${urlBase}/getConsultas`)
            .then(console.log("Peticion correcta"))
            .catch(console.log("Error"))
        const datos = await data.json()
        setDatos(datos.consultas)
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12">
                    <h2><strong>Atención de pacientes</strong></h2>
                </div>
                <div className="col-12 text-end">
                    <Link to="/panel/atencion/add" className="btn btn-success"><i className="fas fa-plus    "></i> Añadir</Link>
                </div>
                <div className="col-12">
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Servicio</th>
                                <th>Especialista</th>
                                <th>Paciente</th>
                                <th>Costo</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                datos.map(item=>{
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.createdAt}</td>
                                            <td>{item.servicio}</td>
                                            <td>{item.especialista}</td>
                                            <td>{item.paciente}</td>
                                            <td>{item.costo}</td>
                                            <td>
                                                <Link to={`/panel/atencion/add/${item._id}`} className="btn btn-primary"><i className="fas fa-file"></i></Link>
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
};

export default Atencion;