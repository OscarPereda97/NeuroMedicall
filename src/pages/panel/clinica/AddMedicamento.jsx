import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '@popperjs/core'
import 'bootstrap'

const AddMedicamento = () => {
    const urlBase = 'http://localhost:8000'
    const [medicamento, setMedicamento] = useState({})

    useEffect(() => {

    }, [])

    const enviarMedicamento = (event) => {
        event.preventDefault();
        document.getElementById("btn-form").setAttribute('disabled', 'true');
        guardarMedicamento();
    }

    const guardarMedicamento = async () => {
        console.log(medicamento)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicamento)
        }
        const response = await fetch(`${urlBase}/setMedicamentos`, requestOptions)
        const respuesta = await response.json()

        console.log(respuesta)
        if (respuesta.error === "1") {
            alert("Error: " + respuesta.mensaje)
        } else if (respuesta.error === "2") {
            alert("Error: " + respuesta.mensaje)
        } else {
            alert(respuesta.mensaje)
            window.location.href = "/panel/clinica/medicamentos";
        }
    }

    const handleChange = (event) => {
        setMedicamento({
            ...medicamento,
            [event.target.name]: event.target.value
        })
        console.log(medicamento)
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12">
                    <h2><strong>Añadir medicamento</strong></h2>
                </div>
                <div className="col-12 text-end">
                    <Link to="/panel/clinica/medicamentos" className="btn btn-outline-primary"><i className="fas fa-arrow-left    "></i> Regresar</Link>
                </div>
                <div className="col-12">
                    <form className="row gy-3" onSubmit={enviarMedicamento}>
                        <div className="col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Medicamento</label>
                                <input type="text" name="nombre" id="nombre" className="form-control" onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Presentación</label>
                                <input type="text" name="presentacion" id="presentacion" className="form-control" onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-success" id="btn-form"><i className="fas fa-save"></i> Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default AddMedicamento