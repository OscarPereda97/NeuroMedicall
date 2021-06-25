import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Usuarios = () => {
    const urlBase = 'http://localhost:8000'
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
        if(window.confirm("¿Está seguro que desea eliminar este usuario?"))
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
                                <th>Usuario</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                datos.map((item) => {
                                    return (
                                        <tr key={item._id}>
                                            <td>{item.apellidos}</td>
                                            <td>{item.nombres}</td>
                                            <td>{item.usuario}</td>
                                            <td>
                                                {item.rol === "superadmin" ? '' : <Link to={`/panel/clinica/personal/edit/${item._id}`} className="btn btn-primary"><i className="fas fa-pencil-alt"></i></Link>}
                                                <button onClick={() => { eliminarUsuario(item._id) }} key={item._id + "-delete"} className="btn btn-danger ms-1"><i className="fas fa-trash"></i></button>
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