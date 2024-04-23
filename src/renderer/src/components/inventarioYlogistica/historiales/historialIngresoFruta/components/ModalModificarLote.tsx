/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { formInit } from "../services/form";
import { proveedoresType } from "@renderer/types/proveedoresType";
import useAppContext from "@renderer/hooks/useAppContext";
import { request_guardar_cambios, request_predios } from "../services/request";
import { lotesType } from "@renderer/types/lotesType";
import { formatDate } from "../services/date";

type propsType = {
    handleModificar: () => void
    loteSeleccionado: lotesType | undefined
    showModal: boolean
}

export default function ModalModificarLote(props:propsType): JSX.Element {
    const { messageModal, user } = useAppContext()
    const [formState, setFormState] = useState(formInit);
    const [prediosDatos, setPrediosData] = useState<proveedoresType[]>([])
    useEffect(() => { obtenerProveedores() }, [])
    useEffect(()=>{
        if(props.loteSeleccionado !== undefined){
            const formData = {...formState}
            formData.enf = String(props.loteSeleccionado.enf)
            formData.predio = String(props.loteSeleccionado.predio?._id)
            formData.canastillas = String(props.loteSeleccionado.canastillas)
            formData.kilos = Number(props.loteSeleccionado.kilos)
            formData.fechaIngreso = props.loteSeleccionado.fechaIngreso ? formatDate(props.loteSeleccionado.fechaIngreso) : formatDate(new Date())
            formData.observaciones = String(props.loteSeleccionado.observaciones)
            formData.placa = String(props.loteSeleccionado.placa)
            formData.tipoFruta = String(props.loteSeleccionado.tipoFruta)
            setFormState(formData)
        }
    },[props.showModal])
    const obtenerProveedores = async (): Promise<void> => {
        try {
            const response = await window.api.server(request_predios)
            if (response.status !== 200)
                throw new Error(response.message)
            setPrediosData(response.data)
        } catch (e) {
            if (e instanceof Error)
                messageModal("error", e.message)
        }
    }
    const handleChange = (event): void => {
        const { name, value } = event.target;

        const uppercaseValue = name === 'placa' ? value.toUpperCase() : value;

        setFormState({
            ...formState,
            [name]: uppercaseValue,
        });
    };
    const handleGuardar = async (e): Promise<void> => {
        e.preventDefault()

        try{
            const request = request_guardar_cambios(props.loteSeleccionado, formState, user)
            const response = await window.api.server(request)
            if(response.status !== 200)
                throw new Error(response.message)
            props.handleModificar();
            messageModal("success","Datos modificados con exito")
        } catch(e){
            if(e instanceof Error)
                messageModal("error",e.message)
        }
    }
    return (
        <div className="fondo-modal">
            <div className="modal-container">
                <div className='modal-header-agree'>
                    <h2>Modificar Lote</h2>
                </div>
                <div className='modal-container-body'>
                    <form className="form-container" onSubmit={handleGuardar}>
                        <div >
                            <label>EF1-</label>
                            <input type="text" onChange={handleChange} name="enf" value={formState.enf} required />
                        </div>
                        <div>
                            <label> Predios</label>
                            <select
                                className='defaultSelect'
                                onChange={handleChange}
                                required
                                value={formState.predio}
                                name='nombrePredio'>
                                <option value="">Predios</option>
                                {prediosDatos.map((item, index) => (
                                    <option key={item.PREDIO && item.PREDIO + index} value={item._id}>{item.PREDIO}</option>
                                ))}
                            </select>
                        </div>
                        <div >
                            <label>Canastillas</label>
                            <input type="text" onChange={handleChange} name="canastillas" value={formState.canastillas} required />
                        </div>
                        <div >
                            <label>Kilos</label>
                            <input type="text" onChange={handleChange} name="kilos" value={formState.kilos} required />
                        </div>
                        <div >
                            <label>Fecha ingreso</label>
                            <input type="date" onChange={handleChange} name="fechaIngreso" value={formState.fechaIngreso} required />
                        </div>
                        <div>
                            <label>Tipo fruta</label>
                            <select
                                className='defaultSelect'
                                onChange={handleChange}
                                required
                                value={formState.tipoFruta}
                                name='tipoFruta'>
                                <option value="">Fruta</option>
                                <option value="Limon">Limon</option>
                                <option value="Naranja">Naranja</option>
                            </select>
                        </div>
                        <div >
                            <label>Observaciones</label>
                            <input type="text" onChange={handleChange} name="observaciones" value={formState.observaciones} required />
                        </div>
                        <div >
                            <label>Placa</label>
                            <input type="text" onChange={handleChange} name="placa" value={formState.placa} required />
                        </div>
                        <div className='defaultSelect-button-div'>
                            <button type='submit'>Guardar</button>
                            <button className="cancel" onClick={props.handleModificar}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}