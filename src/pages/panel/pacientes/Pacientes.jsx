import React, { Fragment, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import '@popperjs/core'
import 'bootstrap'
const Pacientes = () => {
    const urlBase = 'https://neuromedicall-backend-production.up.railway.app'

    const [datos, setDatos] = useState([]) //Datos



    useEffect(() => {
        obtenerDatos()
    }, [])

    const obtenerDatos = async () => {
         const data = await fetch(`${urlBase}/getPacientes`)
            .then(console.log("Peticion correcta"))
            .catch(console.log("Error"))
        const datos = await data.json()
        setDatos(datos.pacientes)
    }

    const eliminarPaciente = async (id) => {
        if(window.confirm("¿Está seguro de eliminar este paciente? El eliminar un paciente puede generar errores de campos al visualizar los datos de las historias previamente generadas.")){
            console.log(id)
            await fetch(`${urlBase}/deletePacientes/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "DELETE",
            })
                .then()
                .catch()
            obtenerDatos()
        }
        
    }

    function formatearFecha(fechaa){
        let fecha = new Date(fechaa)
        let dia = fecha.getDate() +1;
        let mes = fecha.getMonth() + 1;
        let anio = fecha.getFullYear();

        return dia + "-" + mes + "-" + anio
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-6">
                    <h2>Pacientes</h2>
                </div>
                <div className="col-6 text-end">
                    <Link to="/panel/pacientes/add" className="btn btn-success"><i className="fas fa-plus    "></i> Añadir paciente</Link>
                </div>
                <div className="col-12">
                    <table className="table table-hover table-striped   ">
                        <thead>
                            <tr>
                                <th>Opciones</th>
                                <th>Apellido Paterno</th>
                                <th>Apellido Materno</th>
                                <th>Nombres</th>
                                <th>Fecha de Nacimiento</th>
                                <th>Sexo</th>
                                <th>Estado civil</th>
                                <th>DNI</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                datos.map( item => {
                                    return (
                                        <tr>
                                            <td>
                                            <button onClick={()=>{eliminarPaciente(item._id)}} key={item._id }  className="btn btn-danger ms-1"><i className="fas fa-trash"></i></button>
                                            </td>
                                            <td>{item.apellidoPaterno}</td>
                                            <td>{item.apellidoMaterno}</td>
                                            <td>{item.nombres}</td>
                                            <td>{formatearFecha(item.fechaNacimiento)}</td>
                                            <td>{item.sexo}</td>
                                            <td>{item.estadoCivil}</td>
                                            <td>{item.nroDocumento}</td>
                                            <td>{item.direccion}</td>
                                            <td>{item.telefono}</td>
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

export default Pacientes;