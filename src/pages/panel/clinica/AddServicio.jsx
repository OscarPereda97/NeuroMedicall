import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '@popperjs/core'
import 'bootstrap'

const AddServicio = () => {
    const urlBase = 'https://neuromedicall-backend.herokuapp.com'
    
    const [servicio, setServicio] = useState({})

    useEffect(() => {

    }, [])

    const enviarServicio = (event) => {
        event.preventDefault();
        guardarServicio()
    }

    const guardarServicio = async () => {
        console.log(servicio)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(servicio)
        }
        const response = await fetch(`${urlBase}/setServicios`, requestOptions)
        const respuesta = await response.json()

        console.log(respuesta)
        if (respuesta.error === "1") {
            alert("Error: " + respuesta.mensaje)
        } else if (respuesta.error === "2") {
            alert("Error: " + respuesta.mensaje)
        } else {
            alert(respuesta.mensaje)
            window.location.href = "/panel/clinica/servicios";
        }

    }

    const handleChange = (event) => {

        setServicio({
            ...servicio,
            [event.target.name]: event.target.value
        })
        console.log(servicio)
    }

    const handleChangeSelect = (event) => {
        let index = event.target.selectedIndex;
        setServicio({
            ...servicio,
            [event.target.name]: event.target.options[index].text
        })
        console.log(servicio)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        guardarServicio()
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12">
                    <h2>Añadir servicio</h2>
                </div>
                <div className="col-12 text-end">
                    <Link to="/panel/clinica/servicios" className="btn btn-outline-primary"><i className="fas fa-arrow-left    "></i> Regresar</Link>
                </div>
                <div className="col-12">
                    <form onSubmit={enviarServicio}>
                        <div className="row gy-3">
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">Servicio</label>
                                    <input type="text" name="servicio" id="servicio" className="form-control" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">Costo</label>
                                    <input type="number" name="costo" id="costo" className="form-control" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-success"><i className="fas fa-save    "></i> Guardar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default AddServicio;