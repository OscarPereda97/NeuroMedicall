import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '@popperjs/core'
import 'bootstrap'

const AddPaciente = () => {
    const urlBase = 'http://localhost:8000'
    const [paciente, setPaciente] = useState({})

    useEffect(() => {

    }, [])

    const enviarPaciente = (event) => {
        event.preventDefault();
        guardarPaciente()
    }

    const guardarPaciente = async () => {
        console.log(paciente)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paciente)
        }
        const response = await fetch(`${urlBase}/setPacientes`, requestOptions)
        const respuesta = await response.json()

        console.log(respuesta)
        if (respuesta.error === "1") {
            alert("Error: " + respuesta.mensaje)
        } else if (respuesta.error === "2") {
            alert("Error: " + respuesta.mensaje)
        } else {
            alert(respuesta.mensaje)
            window.location.href = "/panel/pacientes";
        }
    }

    const handleChange = (event) => {
        setPaciente({
            ...paciente,
            [event.target.name]: event.target.value
        })
        console.log(paciente)
    }

    const handleChangeSelect = (event) => {
        let index = event.target.selectedIndex;
        setPaciente({
            ...paciente,
            [event.target.name]: event.target.options[index].text
        })
        console.log(paciente)
    }

 

    return (
        <div className="row">
            <div className="col-12"><h2>Añadir paciente</h2></div>
            <div className="col-12 text-end">
                <Link to="/panel/pacientes" className="btn btn-outline-primary"><i className="fas fa-arrow-left    "></i> Regresar</Link>
            </div>
            <div className="col-12">
                <form onSubmit={enviarPaciente}>
                    <div className="row gy-3">
                        <div className="col-md-4 col-12">
                            <div className="form-group">
                                <label className="form-label">Apellido Paterno</label>
                                <input type="text" className="form-control" name="apellidoPaterno" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col-md-4 col-12">
                            <div className="form-group">
                                <label className="form-label" >Apellido Materno</label>
                                <input type="text" className="form-control" name="apellidoMaterno" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col-md-4 col-12">
                            <div className="form-group">
                                <label className="form-label">Nombres</label>
                                <input type="text" className="form-control" name="nombres" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col-md-4 col-12">
                            <div className="form-group">
                                <label className="form-label">Fecha de nacimiento</label>
                                <input type="date" className="form-control" name="fechaNacimiento" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col-md-4 col-12">
                            <div className="form-group">
                                <label className="form-label">Sexo</label>
                                <select name="sexo" id="sexo" className="form-control" onChange={handleChangeSelect} >
                                    <option value="none">-Seleccione un sexo-</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4 col-12">
                            <div className="form-group">
                                <label className="form-label">Estado civil</label>
                                <select name="estadoCivil" id="estadoCivil" className="form-control" onChange={handleChangeSelect} >
                                    <option value="none">-Seleccione un estado-</option>
                                    <option value="Soltero">Soltero/a</option>
                                    <option value="Casado">Casado/a</option>
                                    <option value="Viudo">Viudo/a</option>
                                    <option value="Divorciado">Divorciado/a</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4 col-12">
                            <div className="form-group">
                                <label className="form-label">Tipo de documento</label>
                                <select name="tipoDocumento" id="tipoDocumento" className="form-control" onChange={handleChangeSelect} >
                                    <option value="none">-Seleccione un tipo-</option>
                                    <option value="DNI">DNI</option>
                                    <option value="Extranjería">Carné de extranjería</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4 col-12">
                            <div className="form-group">
                                <label className="form-label">Nro documento</label>
                                <input type="number" name="nroDocumento" className="form-control" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col-md-4 col-12">
                            <div className="form-group">
                                <label className="form-label">Dirección</label>
                                <input type="text" name="direccion" className="form-control" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col-md-4 col-12">
                            <div className="form-group">
                                <label className="form-label">Teléfono</label>
                                <input type="number" name="telefono" className="form-control" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col-md-8 col-12">
                            <div className="form-group">
                                <label className="form-label">E-mail</label>
                                <input type="email" name="email" className="form-control" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Ocupación</label>
                                <input type="text" name="ocupacion" className="form-control" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="form-group">
                                <label className="form-label">Persona responsable</label>
                                <input type="text" name="personaResponsable" className="form-control" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col-md-4 col-12">
                            <div className="form-group">
                                <label className="form-label">Alergias</label>
                                <input type="text" name="alergias" className="form-control" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col-md-4 col-12">
                            <div className="form-group">
                                <label className="form-label">Interveniones quirurgicas</label>
                                <input type="text" name="intervencionesQuirurgicas" className="form-control" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col-md-4 col-12">
                            <div className="form-group">
                                <label className="form-label">Vacunas completas</label>
                                <select name="vacunas" id="vacunas" className="form-control" onChange={handleChangeSelect} >
                                    <option value="none">-Seleccione una opción-</option>
                                    <option value="Si">Si</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <button className="btn btn-success"><i className="fas fa-save    "></i> Guardar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default AddPaciente;