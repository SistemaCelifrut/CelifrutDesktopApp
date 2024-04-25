/* eslint-disable prettier/prettier */

import useAppContext from "@renderer/hooks/useAppContext"
import { lotesType } from "@renderer/types/lotesType"
import { useEffect, useState } from "react"
import { request_guardar_cambios } from "../services/request"

type propsType = {
    handleModificar: () => void
    loteSeleccionado: lotesType | undefined
    showModal: boolean

}

export default function ModalModificarFrutaSinProcesar(props: propsType): JSX.Element {
    const { messageModal, user } = useAppContext()
    const [formState, setFormState] = useState<number>(0);

    useEffect(()=>{
        if(props.loteSeleccionado !== undefined &&
            props.loteSeleccionado.inventarioActual && 
            props.loteSeleccionado.inventarioActual.inventario
         ){
            setFormState(props.loteSeleccionado.inventarioActual?.inventario)
        }
    },[])

    const handleGuardar = async (e): Promise<void> => {
        e.preventDefault()
        try {
            const request = request_guardar_cambios(props.loteSeleccionado, formState, user)
            const response = await window.api.server(request)
            if (response.status !== 200)
                throw new Error(response.message)
            props.handleModificar();
            messageModal("success", "Datos modificados con exito")
        } catch (e) {
            if (e instanceof Error)
                messageModal("error", e.message)
        }
    }
    return (
        <div className="fondo-modal">
            <div className="modal-container">
                <div className='modal-header-agree'>
                    <h2>Modificar Inventario {props.loteSeleccionado?.enf}</h2>
                </div>
                <div className='modal-container-body'>
                    <form className="form-container" onSubmit={handleGuardar}>
                        <div>
                            <label>Canastillas en inventario</label>
                            <input type="number" onChange={(e):void => setFormState(Number(e.target.value))} value={formState} required />
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