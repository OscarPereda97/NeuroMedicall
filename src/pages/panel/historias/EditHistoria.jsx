import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '@popperjs/core'
import 'bootstrap'

const EditHistoria = () => {
    const urlBase = 'https://neuromedicall-backend.onrender.com'
    const { id } = useParams()
    const [atencion, setAtencion] = useState({
        pacienteId: "",
        servicioId: "",
        consultaId: "",
        especialista: ""
    });
    const [medicamento, setMedicamento] = useState([])
    const [paciente, setPaciente] = useState([])
    const [cita, setCita] = useState()

    const obtenerDatos = async () => {
        const data = await fetch(`${urlBase}/getAtenciones/${id}`)
            .then(console.log("Peticion correcta"))
            .catch(console.log("Error"))
        await data.json().then(res => {
            setAtencion(res)
            setMedicamento(res.receta)
            setPaciente(res.pacienteId)
            setCita(res.proxCita)
        })
    }

    const printPDF = () => {
        printDiv("recetaPrint")
    }

    useEffect(() => {
        obtenerDatos()
    }, [])

    function calcularEdad(fecha) {
        var hoy = new Date();
        var cumpleanos = new Date(fecha);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }
        return edad;
    }

    function printDiv(divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;
    }

    function formatearFecha(fechaa) {
        let fecha = new Date(fechaa)
        let dia = fecha.getDate()
        let mes = fecha.getMonth() + 1;
        let anio = fecha.getFullYear();

        return dia + "-" + mes + "-" + anio
    }

    const handleChange = (event) => {
        setAtencion({
            ...atencion,
            [event.target.name]: event.target.value
        })
        console.log(atencion)
    }

    
    const enviarHistoria = (event) => {
        event.preventDefault();
        guardarHistoria();
    }

    const guardarHistoria = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(atencion)
        }
        const response = await fetch(`${urlBase}/updateHistoria/${id}`, requestOptions)
        const respuesta = await response.json()

        console.log(respuesta)
        if (respuesta.error === "1") {
            alert("Error: " + respuesta.mensaje)
        } else if (respuesta.error === "2") {
            alert("Error: " + respuesta.mensaje)
        } else {
            alert(respuesta.mensaje)
            window.location.href = "/panel/historias";
        }
    }

    return (
        <Fragment>
            <div className="row gy-3">
                <div className="col-12">
                    <h2><strong>Historia clínica</strong></h2>
                </div>
                <div className="col-12 text-end">
                    <Link to="/panel/historias" className="btn btn-outline-primary"><i className="fas fa-arrow-left    "></i> Regresar</Link>
                </div>
                <div className="col-12 mb-4">
                    <div className="row gy-2">
                        <div className="col-12">
                            <h6>Datos del paciente y la consulta:</h6>
                        </div>
                        <div className="col-md-6 -col-12">
                            <div className="form-group">
                                <label className="form-label">Paciente</label>
                                <input type="text" name="paciente" id="paciente" className="form-control" disabled value={`${atencion.pacienteId ? atencion.pacienteId.apellidoPaterno : ""} ${atencion.pacienteId ? atencion.pacienteId.apellidoMaterno : ""} ${atencion.pacienteId ? atencion.pacienteId.nombres : ""}`} />
                            </div>
                        </div>
                        <div className="col-md-3 col-12">
                            <div className="form-group">
                                <label className="form-label">DNI</label>
                                <input type="number" name="dni" id="dni" className="form-control" disabled value={atencion.pacienteId ? atencion.pacienteId.nroDocumento : ""} />
                            </div>
                        </div>
                        <div className="col-md-3 col-12">
                            <div className="form-group">
                                <label className="form-label">Edad</label>
                                <input type="text" name="edad" id="edad" className="form-control" disabled value={atencion.pacienteId ? calcularEdad(atencion.pacienteId.fechaNacimiento) : ""} />
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <label className="form-label">Servicio</label>
                            <input type="text" name="servicio" id="servicio" className="form-control" disabled value={atencion.servicioId ? atencion.servicioId.servicio : ""} />
                        </div>
                        <div className="col-md-6 col-12">
                            <label htmlFor="" className="form-label">Especialista</label>
                            <input type="text" name="especialista" id="especialista" className="form-control" disabled value={atencion.consultaId ? atencion.consultaId.especialista : ""} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="row gy-2">
                            <div className="col-12">
                                <h6>Triaje</h6>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Presión Arterial (mmHg)</label>
                                    <input type="text" name="presionArterial" id="presionArterial" onChange={handleChange} className="form-control"  value={atencion.presionArterial} />
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Temperatura C°</label>
                                    <input type="text" name="temperatura" id="temperatura" className="form-control"  onChange={handleChange}  value={atencion.temperatura} />
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Frecuencia respiratoria (Por minuto)</label>
                                    <input type="text" name="frecuenciaRespiratoria" id="frecuenciaRespiratoria" onChange={handleChange} className="form-control" value={atencion.frecuenciaRespiratoria} />
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Frecuencia cardiaca (Por minuto)</label>
                                    <input type="text" name="frecuenciaCardiaca" id="frecuenciaCardiaca" onChange={handleChange} className="form-control"  value={atencion.frecuenciaCardiaca} />
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="form-group">
                                    <label className="form-label">Saturación (O<sub>2</sub>)</label>
                                    <input type="text" name="saturacion" id="saturacion" className="form-control" onChange={handleChange} value={atencion.saturacion} />
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Peso</label>
                                    <input type="text" name="peso" id="peso" className="form-control" onChange={handleChange}  value={atencion.peso} />
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Talla</label>
                                    <input type="text" name="talla" id="talla" className="form-control" onChange={handleChange}value={atencion.talla} />
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">IMC</label>
                                    <input type="text" name="imc" id="imc" className="form-control" onChange={handleChange} value={atencion.imc} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-12 mb-4">
                        <div className="row gy-2">
                            <div className="col-12">
                                <h6>Plan de atención</h6>
                            </div>
                            <div className="col-md-9 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Motivo de la consulta</label>
                                    <textarea name="motivoConsulta" id="motivoConsulta" cols="30" rows="7" onChange={handleChange} className="form-control" value={atencion.motivoConsulta} ></textarea>
                                </div>
                            </div>
                            <div className="col-md-3 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Tiempo de enfermedad</label>
                                    <input type="text" name="te" id="te" className="form-control" onChange={handleChange}  value={atencion.te} />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Antecedentes</label>
                                    <textarea name="antecedentes" id="antecedentes" cols="30" rows="7" onChange={handleChange} className="form-control" value={atencion.antecedentes}></textarea>
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Alergias</label>
                                    <input type="text" name="alergias" id="alergias" className="form-control" onChange={handleChange} value={atencion.alergias} />
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Intervenciones quirurgicas</label>
                                    <input type="text" name="intervencionesQuirurgicas" id="intervencionesQuirurgicas" onChange={handleChange} className="form-control" value={atencion.intervencionesQuirurgicas} />
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Vacunas completas</label>
                                    <select name="vacunasCompletas" id="vacunasCompletas" className="form-control" >
                                        <option key="none" value="none">-Seleccione una opción-</option>
                                        <option key="SI" value="SI">SI</option>
                                        <option key="NO " value="NO">NO</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Examen físico</label>
                                    <textarea name="examenFisico" id="examenFisico" cols="30" rows="7" onChange={handleChange} className="form-control"value={atencion.examenFisico}></textarea>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Diagnostico</label>
                                    <textarea name="diagnostico" id="diagnostico" cols="30" rows="7" onChange={handleChange} className="form-control" value={atencion.diagnostico}></textarea>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Tratamiento</label>
                                    <textarea name="tratamiento" id="tratamiento" cols="30" rows="7" onChange={handleChange} className="form-control"  value={atencion.tratamiento}></textarea>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Plan</label>
                                    <input type="text" name="plan" id="plan" className="form-control" onChange={handleChange}value={atencion.plan} />
                                </div>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-12 text-center">
                                <button type="submit" className="btn btn-success" onClick={enviarHistoria}><i className="fas fa-save   "></i> Guardar receta</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </Fragment>
    )
}

export default EditHistoria;