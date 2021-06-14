import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '@popperjs/core'
import 'bootstrap'

const AddRegistroConsulta = () => {
    const urlBase = 'http://localhost:8000'
    const [documento, setDocumento] = useState()
    const [paciente, setPaciente] = useState()
    const [pacienteId, setPacienteId] = useState()
    const [servicios, setServicios] = useState([])
    const [servicioId, setServicioId] = useState()
    const [costo, setCosto] = useState()
    const [especialista, setEspecialista] = useState()

    //Obtener servicios
    useEffect(() => {
        obtenerServicios()
    }, [])

    const obtenerServicios = async () => {
        const data = await fetch(`${urlBase}/getServicios`)
            .then(console.log("Peticion correcta"))
            .catch(console.log("Error"))
        const datos = await data.json()
        setServicios(datos.servicios)
    }

    //Obtener paciente según DNI
    const handleDNI = (event) => {
        setDocumento(event.target.value)
        console.log(documento)
    }

    const enviarDNI = (event) => {
        event.preventDefault()
        consultarDNI(documento);
    }

    const consultarDNI = async (dni) => {
        const response = await fetch(`${urlBase}/getPacienteByDNI/${dni}`)
        const respuesta = await response.json()
        setPaciente(`${respuesta.apellidoPaterno} ${respuesta.apellidoMaterno} ${respuesta.nombres} `)
        setPacienteId(respuesta._id)
    }

    //Obtener monto y servicio
    const handleChangeServicio = (event) => {
        let index = event.target.selectedIndex;
        if (event.target.options[index].value !== "none") {
            setServicioId(event.target.options[index].value)
            let servicioActual = servicios.find(servicio => servicio._id === event.target.options[index].value)
            console.log(servicioActual)
            setCosto(servicioActual.costo)
        } else {
            setServicioId("")
            setCosto("")
        }
    }

    //Guardar consulta
    const handleEspecialista = (event) => {
        setEspecialista(event.target.value)
    }

    const enviarEspecialista = (event) => { 
        event.preventDefault()
        guardarConsulta();
    }

    const guardarConsulta = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pacienteId,
                servicioId,
                especialista
            })
        }
        const response = await fetch(`${urlBase}/setConsultas`, requestOptions)
        const respuesta = await response.json()

        console.log(respuesta)
        if (respuesta.error === "1") {
            alert("Error: " + respuesta.mensaje)
        } else if (respuesta.error === "2") {
            alert("Error: " + respuesta.mensaje)
        } else {
            alert(respuesta.mensaje)
            window.location.href = "/panel/registro-consulta";
        }
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12">
                    <h2><strong>Añadir registro de consulta</strong></h2>
                </div>
                <div className="col-12 text-end">
                    <Link to="/panel/registro-consulta" className="btn btn-outline-primary"><i className="fas fa-arrow-left    "></i> Regresar</Link>
                </div>
                <div className="col-12">
                    <div className="row gy-3">
                        <form className="col-md-6 col-12" onSubmit={enviarDNI}>
                            <div className="form-group">
                                <label className="form-label">Número documento(*)</label>
                                <div className="input-group">
                                    <input type="text" name="documento" id="documento" className="form-control" maxLength="8" onChange={handleDNI} />
                                    <button className="btn btn-primary">Consultar</button>
                                </div>
                            </div>
                        </form>
                        <div className="col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Paciente(*)</label>
                                <input type="text" name="paciente" id="paciente" className="form-control" value={paciente} disabled />
                            </div>
                        </div>
                        <form onSubmit={enviarEspecialista} className="row  gy-3">
                            <div className="col-md-4 col-12">
                                <div className="form-group">
                                    <label className="form-label">Servicio(*)</label>
                                    <select name="servicio" id="servicio" className="form-control" onChange={handleChangeServicio}>
                                        <option value="none">-Seleccione un servicio-</option>
                                        {
                                            servicios.map(item => {
                                                return (
                                                    <option key={item._id} value={item._id}>{item.servicio}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="form-group">
                                    <label className="form-label">Especialista(*)</label>
                                    <input type="text" name="especialista" id="especialista" className="form-control" onChange={handleEspecialista}/>
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Costo(*)</label>
                                    <input type="text" name="costo" id="costo" className="form-control" value={costo} disabled />
                                </div>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-success"><i className="fas fa-save    "></i> Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default AddRegistroConsulta