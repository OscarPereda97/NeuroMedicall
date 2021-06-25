import React, { Fragment, useEffect, useState } from 'react';
import { Link , useParams} from 'react-router-dom';

const AddUsuario = () => {
    const {id} = useParams();
    const urlBase = 'http://localhost:8000'

    const [user, setUser] = useState({})
    const [password, setPassword]  = useState({})

    useEffect(() => {

    }, [])

    const enviarUser = (event) => {
        event.preventDefault();
        guardarUser()
    }

    const enviarPassword = (event) => {
        event.preventDefault();
        document.getElementById("btn-form").setAttribute('disabled', 'true');
        guardarPassword()
    }

    const guardarUser = async () => {
        console.log(user)
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }
        const response = await fetch(`${urlBase}/updateUsers/${id}`, requestOptions)
        const respuesta = await response.json()

        console.log(respuesta)
        if (respuesta.error === "1") {
            alert("Error: " + respuesta.mensaje)
        } else if (respuesta.error === "2") {
            alert("Error: " + respuesta.mensaje)
        } else {
            alert(respuesta.mensaje)
            window.location.href = "/panel/clinica/personal";
        }

    }

    const guardarPassword = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(password)
        }
        const response = await fetch(`${urlBase}/updatePassword/${id}`, requestOptions)
        const respuesta = await response.json()

        console.log(respuesta)
        if (respuesta.error === "1") {
            alert("Error: " + respuesta.mensaje)
        } else if (respuesta.error === "2") {
            alert("Error: " + respuesta.mensaje)
        } else {
            alert(respuesta.mensaje)
            window.location.href = "/panel/clinica/personal";
        }

    }

    const handleChangePassword = (event) => {
        setPassword({password: event.target.value})
    }


    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
        console.log(user)
    }
    return (
        <Fragment>
            <div className="row">
                <div className="col-md-6 col-12">
                    <h2>Añadir usuario</h2>
                </div>
                <div className="col-md-6 col-12 text-end">
                    <Link to="/panel/clinica/personal" className="btn btn-outline-primary"><i className="fas fa-arrow-left    "></i> Regresar</Link>
                </div>
                <form onSubmit={enviarUser} className="row gy-3">
                    <div className="col-md-6 col-12">
                        <div className="form-group">
                            <label className="form-label" >Apellidos</label>
                            <input type="text" name="apellidos" className="form-control" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="form-group">
                            <label className="form-label" >Nombres</label>
                            <input type="text" name="nombres" className="form-control" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="col-md-6 col-12">
                        <div className="form-group">
                            <label className="form-label" >Usuario</label>
                            <input type="text" name="usuario" className="form-control" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col-12">
                        <button className="btn btn-success"><i className="fas fa-save"></i> Guardar</button>
                    </div>
                </form>
                <form className="row gy-3" onSubmit={enviarPassword}>
                    <div className="col-md-6 col-12">
                        <div className="form-group">
                            <label className="form-label" >Contraseña</label>
                            <input type="text" name="contrasena" className="form-control" onChange={handleChangePassword} />
                        </div>
                    </div>
                    <div className="col-12">
                        <button className="btn btn-success" id="btn-form"><i className="fas fa-save"></i> Actualizar contraseña</button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default AddUsuario;