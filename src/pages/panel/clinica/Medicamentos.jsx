import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '@popperjs/core'
import 'bootstrap'

const Medicamentos = () => {
    const urlBase = 'https://neuromedicall-backend-production.up.railway.app'
    const [datos, setDatos] = useState([])

    useEffect(() => {
        obtenerDatos()
    }, [])

    const obtenerDatos = async () => {
        const data = await fetch(`${urlBase}/getMedicamentos`)
            .then(console.log("Peticion correcta"))
            .catch(console.log("Error"))
        const datos = await data.json()
        setDatos(datos.medicamentos)
    }

    const eliminarMedicamento = async (id) => {
        if(window.confirm("¿Está seguro de eliminar este medicamento?")){
            console.log(id)
            const data = await fetch(`${urlBase}/deleteMedicamento/${id}`, {
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

    return (
        <Fragment>
            <div className="row">
                <div className="col-md-6 col-12">
                    <h2>Medicamentos</h2>
                </div>
                <div className="col-md-6 col-12 text-end">
                    <Link to="/panel/clinica/medicamentos/add" className="btn btn-success"><i className="fas fa-plus"></i> Añadir medicamento</Link>
                </div>
                <div className="col-12">
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Medicamento</th>
                                <th>Presentación</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                datos.map((item) => {
                                    return (
                                        <tr>
                                            <td>{item.nombre}</td>
                                            <td>{item.presentacion}</td>
                                            <td>
                                                <Link to={`/panel/clinica/medicamentos/edit/${item._id}`} className="btn btn-primary"><i className="fas fa-pencil-alt"></i></Link>
                                                <button onClick={() => { eliminarMedicamento(item._id) }} className="btn btn-danger"><i className="fas fa-trash"></i></button>
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

export default Medicamentos