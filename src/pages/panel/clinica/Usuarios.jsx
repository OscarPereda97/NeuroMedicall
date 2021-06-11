import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Usuarios = () => {
    const urlBase = 'https://neuromedicall-backend.herokuapp.com'
    const [datos, setDatos] = useState([]) //Datos

    useEffect(() => {
        obtenerDatos()
    }, [])

    const obtenerDatos = async () => {
        const data = await fetch(`${urlBase}/getUsers`)
            .then()
            .catch()
        const datos = await data.json()
        setDatos(datos.usuarios)
    }

    const eliminarUsuario = async (id) => {
        console.log(id)
        const data = await fetch(`${urlBase}/deleteUsers/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "DELETE",
        })
            .then()
            .catch()
        obtenerDatos()
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-md-6 col-12">
                    <h2>Personal</h2>
                </div>
                <div className="col-md-6 col-12 text-end">
                    <Link to="/panel/clinica/personal/add" className="btn btn-success"><i className="fas fa-plus"></i> Añadir usuario</Link>
                </div>
                <div className="col-12">
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Apellidos</th>
                                <th>Nombres</th>
                                <th>Rol</th>
                                <th>Usuario</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                datos.map((item) => {
                                    return (
                                        <tr>
                                            <td>{item.apellidos}</td>
                                            <td>{item.nombres}</td>
                                            <td>{item.rol}</td>
                                            <td>{item.usuario}</td>
                                            <td>
                                                <button onClick={()=>{eliminarUsuario(item._id)}} key={item._id + "-delete"}  className="btn btn-danger ms-1"><i className="fas fa-trash"></i></button>
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

export default Usuarios;