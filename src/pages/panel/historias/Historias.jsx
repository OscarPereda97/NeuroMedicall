import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import '@popperjs/core'
import 'bootstrap'

const Historias = () => {
    const urlBase = 'http://localhost:8000'

    const [datos, setDatos] = useState([{
        pacienteId: "",
        servicioId: "",
        consultaId: "",
        especialista: ""
    }])
    const [dni, setDni] = useState()

    useEffect(() => {
        obtenerDatos();
    }, [])

    const obtenerDatos = async () => {
        const data = await fetch(`${urlBase}/getAtenciones`)
            .then(console.log("Peticion correcta"))
            .catch(console.log("Error"))
        const datos = await data.json()
        setDatos(datos.atenciones)
    }

    function formatearFecha(fechaa) {
        let fecha = new Date(fechaa)
        let dia = fecha.getDate()
        let mes = fecha.getMonth() + 1;
        let anio = fecha.getFullYear();

        return dia + "-" + mes + "-" + anio
    }

    const enviarHistorias = (event) => {
        event.preventDefault();
        obtenerHistorias();
    }

    const actualizarHistorias = (event) =>{
        document.getElementById("input-dni").value = ""
        event.preventDefault();
        obtenerDatos()
    }

    const obtenerHistorias = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dni })
        }
        console.log("AQUI")
        const response = await fetch(`${urlBase}/getAtenciones`, requestOptions)
        const respuesta = await response.json()

        setDatos(respuesta.atenciones ? respuesta.atenciones : [])
    }

    const handleDNI = (event) => {
        setDni(event.target.value)
        console.log(dni)
    }


    return (
        <Fragment>
            <div className="row">
                <div className="col-12">
                    <h2><strong>Historias clínicas</strong></h2>
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <form className="input-group mb-3" onSubmit={enviarHistorias}>
                                <input type="text" className="form-control" placeholder="Buscar por DNI..." id="input-dni" onChange={handleDNI} />
                                <button className="btn btn-outline-secondary" ><i class="fas fa-search    "></i></button>
                            </form>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-primary" onClick={actualizarHistorias}><i class="fas fa-redo    "></i></button>
                        </div>
                    </div>

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
                                datos.map(item => {
                                    console.log(item)
                                    return (
                                        <tr key={item.id}>
                                            <td>{formatearFecha(item.createdAt)}</td>
                                            <td>{item.pacienteId  ? item.pacienteId.apellidoPaterno : ""} {item.pacienteId ? item.pacienteId.apellidoMaterno : ""} {item.pacienteId ? item.pacienteId.nombres : ""}</td>
                                            <td>{item.servicioId ? item.servicioId.servicio : ""}</td>
                                            <td>
                                                <Link to={`/panel/historias/${item._id}`} className="btn btn-primary"><i className="fas fa-file-prescription"></i></Link>
                                                <Link to={`/panel/historias/edit/${item._id}`} className="ms-1 btn btn-primary"><i className="fas fa-pencil-alt"></i></Link>
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