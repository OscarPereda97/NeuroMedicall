import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '@popperjs/core'
import 'bootstrap'
import CIE10DB from './CIE10'

const AddAtencion = () => {
    const urlBase = 'https://neuromedicall-backend.onrender.com'
    const { id } = useParams()
    const [paciente, setPaciente] = useState({
        pacienteId: "",
        servicioId: "",
        especialista: ""
    });
    const [consulta, setConsulta] = useState([]); //Datos de consulta
    const [medicamentosList, setMedicamentosList] = useState([]); //Lista de medicamentos para mostrar
    const [medicamento, setMedicamento] = useState([]); //Medicamento actual
    const [medicamentosTemp, setMedicamentosTemp] = useState([]); //Lista de medicamentos
    const [cie10Filter, setCie10Filter] = useState(); //Texto de filtro de CIE10
    const [cie10, setCie10] = useState([]); //Array de CIE10
    const [diagnosticoActual, setDiagnosticoActual] = useState(); //Actual
    const [diagnostico, setDiagnostico] = useState([]); //Diagnosticos

    const handleFiltro = async (event) =>{
        setCie10Filter(event.target.value)
        console.log(cie10Filter)
    };

    const enviarFiltrarCIE10 = async (event)=>{
        event.preventDefault();
        filtrarCIE10();
    }

    const filtrarCIE10 = async () =>{
        setCie10(CIE10DB.filter(function(item){
            return item.enfermedad.includes(cie10Filter)
        }))
        console.log(cie10)
    }

    const selectDiagnosticoActual = async (event)=>{
        let index = event.target.selectedIndex;
        setDiagnosticoActual( event.target.options[index].text)
        console.log(diagnosticoActual)
    }

     const sendDiagnostico = async (event)=>{
        event.preventDefault();
        saveDiagnostico();
     }

     const saveDiagnostico = async ()=>{
        let diagnosticoAux = diagnostico;
        diagnosticoAux.push(diagnosticoActual);
        setDiagnostico(diagnosticoAux);
        setCie10([])
     }

    const listarDatos = async () => {
        await obtenerDatos();
    }

    const obtenerDatos = async () => {
        const data = await fetch(`${urlBase}/getConsultas/${id}`)
            .then(console.log("Peticion correcta"))
            .catch(console.log("Error"))
        await data.json().then(res => {
            setPaciente(res)
        })
    }

    const obtenerMedicamentos = async () => {
        const data = await fetch(`${urlBase}/getMedicamentos`)
            .then(console.log("Peticion correcta"))
            .catch(console.log("Error"))
        const datos = await data.json()
        setMedicamentosList(datos.medicamentos)
    }

    const selectMedicamento = async (event) => {
        let index = event.target.selectedIndex;
        let button = document.getElementById("addMedicamento");
        if (event.target.options[index].value !== "none") {
            let presentacion = medicamentosList.find(medicamento => medicamento._id === event.target.options[index].value)
            setMedicamento({
                medicamentoId: event.target.options[index].value,
                nombre: event.target.options[index].text,
                presentacion: presentacion.presentacion || ""
            })
            button.disabled = false
            console.log(medicamento)
        } else {
            button.disabled = true
            setMedicamento({
                medicamentoId: "",
                nombre: "",
                presentacion: ""
            })
        }
    }

    const handleMedicamento = (event) => {
        setMedicamento({
            ...medicamento,
            [event.target.name]: event.target.value
        })
        console.log(medicamento)
    }

    const enviarMedicamento = (event) => {
        event.preventDefault();
        addMedicamento();
    }

    const addMedicamento = async () => {

        let arrayAux = medicamentosTemp
        arrayAux.push(medicamento)
        setMedicamentosTemp(arrayAux)
        document.getElementById("presentacion").value = ""
        document.getElementById("cantidad").value = ""
        document.getElementById("indicaciones").value = ""
        document.getElementById("medicamento").value = "none"
        setMedicamento({
            medicamentoId: "",
            nombre: "",
            presentacion: "",
            cantidad: "",
            indicaciones: "",
        })
        document.getElementById("addMedicamento").disabled = true;
    }


    const handleChange = (event) => {

        setConsulta({
            ...consulta,
            [event.target.name]: event.target.value
        })
        console.log(consulta)
    }

    const handleChangeSelect = (event) => {
        let index = event.target.selectedIndex;
        setConsulta({
            ...consulta,
            [event.target.name]: event.target.options[index].text
        })
        console.log(consulta)
    }

    const enviarConsulta = (event) => {
        document.getElementById("btn-form").setAttribute('disabled', 'true');
        event.preventDefault()
        guardarConsulta()
    }

    const guardarConsulta = async () => {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...consulta,
                pacienteId: paciente.pacienteId._id,
                servicioId: paciente.servicioId._id,
                consultaId: id,
                receta: medicamentosTemp,
                diagnostico
            })
        }

        const response = await fetch(`${urlBase}/setAtencion`, requestOptions)
        const respuesta = await response.json()

        console.log(respuesta)
        if (respuesta.error === "1") {
            alert("Error: " + respuesta.mensaje)
        } else if (respuesta.error === "2") {
            alert("Error: " + respuesta.mensaje)
        } else {
            const requestOptionss = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...consulta,
                    pacienteId: paciente.pacienteId._id,
                    servicioId: paciente.servicioId._id,
                    consultaId: id,
                    receta: medicamentosTemp,
                    diagnostico
                })
            }
            const responsee = await fetch(`${urlBase}/updateStatus/${id}`, requestOptionss)
            const respuestaa = await responsee.json()

            console.log(respuestaa)
            if (respuestaa.error === "1") {
                alert("Error: " + respuestaa.mensaje)
            } else if (respuestaa.error === "2") {
                alert("Error: " + respuestaa.mensaje)
            } else {
                alert(respuestaa.mensaje)
                window.location.href = "/panel/historias";
            }
        }
    }

    useEffect(() => {
        listarDatos()
        obtenerMedicamentos()
        console.log(paciente)
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

    return (
        <Fragment>
            <div className="row gy-3">
                <div className="col-12">
                    <h2><strong>Añadir atención</strong></h2>
                </div>
                <div className="col-12 text-end">
                    <Link to="/panel/atencion" className="btn btn-outline-primary"><i className="fas fa-arrow-left    "></i> Regresar</Link>
                </div>
                <div className="col-12 mb-4">
                    <div className="row gy-2">
                        <div className="col-12">
                            <h6>Datos del paciente y la consulta:</h6>
                        </div>
                        <div className="col-md-6 -col-12">
                            <div className="form-group">
                                <label className="form-label">Paciente</label>
                                <input type="text" name="paciente" id="paciente" className="form-control" value={`${paciente.pacienteId ? paciente.pacienteId.apellidoPaterno : ""} ${paciente.pacienteId ? paciente.pacienteId.apellidoMaterno : ""} ${paciente.pacienteId ? paciente.pacienteId.nombres : ""}`} />
                            </div>
                        </div>
                        <div className="col-md-3 col-12">
                            <div className="form-group">
                                <label className="form-label">DNI</label>
                                <input type="number" name="dni" id="dni" className="form-control" value={paciente.pacienteId ? paciente.pacienteId.nroDocumento : ""} />
                            </div>
                        </div>
                        <div className="col-md-3 col-12">
                            <div className="form-group">
                                <label className="form-label">Edad</label>
                                <input type="text" name="edad" id="edad" className="form-control" value={paciente.pacienteId ? calcularEdad(paciente.pacienteId.fechaNacimiento) : ""} />
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <label className="form-label">Servicio</label>
                            <input type="text" name="servicio" id="servicio" className="form-control" value={paciente.servicioId ? paciente.servicioId.servicio : ""} />
                        </div>
                        <div className="col-md-6 col-12">
                            <label htmlFor="" className="form-label">Especialista</label>
                            <input type="text" name="especialista" id="especialista" className="form-control" value={paciente.especialista} />
                        </div>
                    </div>
                </div>
                <form action="" className="row">
                    <div className="col-12 mb-4">
                        <div className="row gy-2">
                            <div className="col-12">
                                <h6>Triaje</h6>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Presión Arterial (mmHg)</label>
                                    <input type="text" name="presionArterial" id="presionArterial" className="form-control" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Temperatura C°</label>
                                    <input type="text" name="temperatura" id="temperatura" className="form-control" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Frecuencia respiratoria (Por minuto)</label>
                                    <input type="text" name="frecuenciaRespiratoria" id="frecuenciaRespiratoria" className="form-control" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Frecuencia cardiaca (Por minuto)</label>
                                    <input type="text" name="frecuenciaCardiaca" id="frecuenciaCardiaca" className="form-control" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="form-group">
                                    <label className="form-label">Saturación (O<sub>2</sub>)</label>
                                    <input type="text" name="saturacion" id="saturacion" className="form-control" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Peso</label>
                                    <input type="text" name="peso" id="peso" className="form-control" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Talla</label>
                                    <input type="text" name="talla" id="talla" className="form-control" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">IMC</label>
                                    <input type="text" name="imc" id="imc" className="form-control" onChange={handleChange} />
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
                                    <textarea name="motivoConsulta" id="motivoConsulta" cols="30" rows="7" className="form-control" onChange={handleChange}></textarea>
                                </div>
                            </div>
                            <div className="col-md-3 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">TE</label>
                                    <input type="text" name="te" id="te" className="form-control" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Antecedentes</label>
                                    <textarea name="antecedentes" id="antecedentes" cols="30" rows="7" className="form-control" onChange={handleChange}></textarea>
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Alergias</label>
                                    <input type="text" name="alergias" id="alergias" className="form-control" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Intervenciones quirurgicas</label>
                                    <input type="text" name="intervencionesQuirurgicas" id="intervencionesQuirurgicas" className="form-control" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Vacunas completas</label>
                                    <select name="vacunasCompletas" id="vacunasCompletas" className="form-control" onChange={handleChangeSelect}>
                                        <option key="none" value="none">-Seleccione una opción-</option>
                                        <option key="SI" value="SI">SI</option>
                                        <option key="NO " value="NO">NO</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Examen físico</label>
                                    <textarea name="examenFisico" id="examenFisico" cols="30" rows="7" className="form-control" onChange={handleChange}></textarea>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-12">
                                        <h5>Diagnostico</h5>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="" className="form-label">Buscar enfermedad</label>
                                            <input type="text" id="findDiagnostico" name="findDiagnostico" onChange={handleFiltro} className="form-control" />
                                            <button className="btn btn-success btn-block" onClick={enviarFiltrarCIE10}>Buscar</button>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label>Enfermedades</label>
                                            <select name="cie10" id="cie10" className="form-control" onChange={selectDiagnosticoActual}>
                                                <option >-Seleccione una enfermedad-</option>
                                                {
                                                    cie10.map(item =>{
                                                        return(
                                                            <option key={item.codigo} value={item.codigo}>{item.enfermedad}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <button className="btn btn-success" onClick={sendDiagnostico}>Añadir</button>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <table className="table table-hover table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Enfermedad</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    diagnostico.map(item=>{
                                                        return (
                                                            <tr>
                                                                <td>{item}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>




                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Tratamiento</label>
                                    <textarea name="tratamiento" id="tratamiento" cols="30" rows="7" className="form-control" onChange={handleChange}></textarea>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Plan</label>
                                    <input type="text" name="plan" id="plan" className="form-control" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Proxima cita</label>
                                    <input type="date" name="proxCita" id="proxCita" className="form-control" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-12">
                                        <h6>Receta</h6>
                                    </div>
                                    <div className="col-md-6 col-12">

                                    </div>
                                    <div className="col-md-6 col-12 text-end">

                                    </div>
                                    <div className="col-12">
                                        <table className="table table-hover table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Medicamento</th>
                                                    <th>Presentación</th>
                                                    <th>Cantidad (Total)</th>
                                                    <th>Indicaciones</th>
                                                    <th>Opciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="form-group">
                                                            <select name="medicamento" id="medicamento" className="form-control" onChange={selectMedicamento}>
                                                                <option key="none" value="none">-Seleccione un medicamento-</option>
                                                                {
                                                                    medicamentosList.map(item => {
                                                                        return (
                                                                            <option value={item._id} presentacionMedica={item.presentacion}>{item.nombre}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" name="presentacion" id="presentacion" value={medicamento.presentacion} disabled />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <input type="number" className="form-control" name="cantidad" id="cantidad" onChange={handleMedicamento} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" name="indicaciones" id="indicaciones" onChange={handleMedicamento} />
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <button className="btn btn-success" id="addMedicamento" onClick={enviarMedicamento}><i className="fas fa-plus"></i></button>
                                                    </td>
                                                </tr>
                                                {
                                                    medicamentosTemp.map(item => {
                                                        return (
                                                            <tr>
                                                                <td>{item.nombre}</td>
                                                                <td>{item.presentacion}</td>
                                                                <td>{item.cantidad}</td>
                                                                <td>{item.indicaciones}</td>
                                                                <td>
                                                                    <button className="btn btn-danger"><i className="fas fa-trash    "></i></button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-success" onClick={enviarConsulta} id="btn-form"><i className="fas fa-save    "></i> Guardar</button>
                            </div>
                        </div>
                    </div>

                </form>

            </div>
        </Fragment>
    )
}

export default AddAtencion;