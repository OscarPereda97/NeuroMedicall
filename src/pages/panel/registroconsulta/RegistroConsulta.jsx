import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '@popperjs/core'
import 'bootstrap'

const RegistroConsulta = () => {
    const urlBase = 'http://localhost:8000'

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


    function calcularEdad(fecha) {
        console.log(fecha)
        var hoy = new Date();
        var cumpleanos = new Date(fecha);
        console.log(cumpleanos)
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();
    
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }
        console.log(edad)

        return edad;
    }

    const eliminarUsuario = async (id) => {
        console.log(id)
        await fetch(`${urlBase}/deleteConsulta/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "DELETE",
        })
            .then()
            .catch()
        obtenerDatos()
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
                    <h2><strong>Registro de consultas</strong></h2>
                </div>
                <div className="col-12 text-end">
                    <Link to="/panel/registro-consulta/add" className="btn btn-success"><i className="fas fa-plus    "></i> Añadir</Link>
                </div>
                <div className="col-12">
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Servicio</th>
                                <th>Especialista</th>
                                <th>Paciente</th>
                                <th>DNI</th>
                                <th>Edad</th>
                                <th>Costo</th>
                                <th>Estado</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                datos.map(item => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{formatearFecha(item.createdAt)}</td>
                                            <td>{item.servicioId.servicio}</td>
                                            <td>{item.especialista}</td>
                                            <td>{item.pacienteId.apellidoPaterno} {item.pacienteId.apellidoMaterno} {item.pacienteId.nombres}</td>
                                            <td>{item.pacienteId.nroDocumento}</td>
                                            <td>{calcularEdad(item.pacienteId.fechaNacimiento)}</td>
                                            <td>{item.servicioId.costo}</td>
                                            <td>
                                                <span className="badge bg-success"> {item.estado}</span>
                                            </td>
                                            <td>
                                            <td> <button onClick={()=>{eliminarUsuario(item._id)}} key={item._id + "-delete"}  className="btn btn-danger ms-1"><i className="fas fa-trash"></i></button></td>
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

export default RegistroConsulta