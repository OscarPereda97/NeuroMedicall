import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '@popperjs/core'
import 'bootstrap'

const Servicios = () => {
    const urlBase = 'https://neuromedicall-backend.onrender.com'

    const [datos, setDatos] = useState([])

    useEffect(() => {
        obtenerDatos()
    }, [])

    const obtenerDatos = async () => {
        const data = await fetch(`${urlBase}/getServicios`)
            .then(console.log("Peticion correcta"))
            .catch(console.log("Error"))
        const datos = await data.json()
        setDatos(datos.servicios)
    }

    const eliminarUsuario = async (id) => {
        if(window.confirm("¿Está seguro que desea eliminar este servicio?")){
            console.log(id)
            const data = await fetch(`${urlBase}/deleteServicios/${id}`, {
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
                <div className="col-6">
                    <h2>Servicios</h2>
                </div>
                <div className="col-6 text-end">
                    <Link to="/panel/clinica/servicios/add" className="btn btn-success">Añadir servicio</Link>
                </div>
                <div className="col-12">
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Costo</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                datos.map(item => {
                                    return (
                                        <tr>
                                            <td>{item.servicio}</td>
                                            <td>{item.costo}</td>
                                            <td> 
                                            <Link to={`/panel/clinica/servicios/edit/${item._id}`} className="btn btn-primary"><i className="fas fa-pencil-alt"></i></Link>
                                                <button onClick={()=>{eliminarUsuario(item._id)}} key={item._id + "-delete"}  className="btn btn-danger ms-1"><i className="fas fa-trash"></i></button></td>
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

export default Servicios;