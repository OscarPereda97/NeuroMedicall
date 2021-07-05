import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '@popperjs/core'
import 'bootstrap'
import '../../css/ViewAtencion.css'

const Atencion = () => {
    const urlBase = 'https://neuromedicall-backend.herokuapp.com'

    const [datos, setDatos] = useState([])

    useEffect(() => {
        obtenerDatos();
    }, [])

    const obtenerDatos = async () => {
        const data = await fetch(`${urlBase}/getConsultas`)
            .then(console.log("Peticion correcta"))
            .catch(console.log("Error"))
        const datos = await data.json()
        setDatos(datos.consultas)
    }

    function formatearFecha(fechaa){
        let fecha = new Date(fechaa)
        let dia = fecha.getDate()
        let mes = fecha.getMonth() + 1;
        let anio = fecha.getFullYear();

        return dia + "-" + mes + "-" + anio
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12">
                    <h2><strong>Atención de pacientes</strong></h2>
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
                                datos.map(item => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{formatearFecha(item.createdAt)}</td>
                                            <td>{item.servicioId ? item.servicioId.servicio : ""}</td>
                                            <td>{item.especialista ? item.especialista : ''}</td>
                                            <td>{item.pacienteId ? item.pacienteId.apellidoPaterno : ""} {item.pacienteId ? item.pacienteId.apellidoMaterno : ""} {item.pacienteId ? item.pacienteId.nombres : ""}</td>
                                            <td>{item.servicioId ? item.servicioId.costo : ""}</td>
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