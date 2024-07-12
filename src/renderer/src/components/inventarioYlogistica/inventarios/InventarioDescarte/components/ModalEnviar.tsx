/* eslint-disable prettier/prettier */

import { useState } from "react"
import { inventarioDescarteType } from "../types/type"
import { enviarLabels, formInitEnviar, labelsInventarioDescarte } from "../func/functions"
import useAppContext from "@renderer/hooks/useAppContext"

type propsType = {
    closeModal: () => void
    formState: inventarioDescarteType
    obtenerInentario: () => void
    resetFields: () => void
}

export default function ModalEnviar(props: propsType): JSX.Element {
    const { messageModal } = useAppContext();
    const [formState, setFormState] = useState(formInitEnviar)
    const handleChange = (event): void => {
        const { name, value } = event.target;

        const uppercaseValue = name === 'placa' ? value.toUpperCase() : value;

        setFormState({
            ...formState,
            [name]: uppercaseValue,
        });
    };
    const handleEnviar = async (): Promise<void> => {
        try {
            const request = {
                action:'guardarDescarteHistorial',
                inventario: props.formState,
                datos:formState
            }
            const response = await window.api.server2(request);
            if (response.status !== 200) throw new Error(`Code ${response.status}: ${response.message}`)
            console.log(response)
            messageModal("success","Enviado con exito")
        } catch (err) {
            if (err instanceof Error)
                messageModal("error", `${err.name}: ${err.message}`)
        }finally{
            props.closeModal()
            setFormState(formInitEnviar)
            props.obtenerInentario()
            props.resetFields()
        }
    }
    return (
        <div className="fondo-modal">
            <div className="modal-container">
                <div className='modal-header-agree'>
                    <h2>Datos del envío</h2>
                </div>
                <div className="div-formulario-envio-inventario-descarte">
                    <div className='modal-container-body'>
                        {Object.keys(enviarLabels).map((key) => (
                            <div key={key} className='modal-container-body'>
                                <p>{enviarLabels[key]}</p>
                                <input
                                    value={formState[key]}
                                    onChange={handleChange}
                                    type="text"
                                    name={key}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="info-kilos-fruta-enviar-div">
                        {Object.keys(props.formState).map(tipoDescarte => (
                            <div key={tipoDescarte} >
                                <h2>{labelsInventarioDescarte[tipoDescarte]}:</h2>
                                {Object.keys(props.formState[tipoDescarte]).map(item => (
                                    <div key={item + tipoDescarte} className="info-kilos-fruta-enviar-div-item" >
                                        <div>{labelsInventarioDescarte[item]}:</div>
                                        <div>{props.formState[tipoDescarte][item]} Kg</div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="modal-container-buttons">
                    <button onClick={handleEnviar} className='agree'>Enviar</button>
                    <button onClick={props.closeModal} className='cancel'>Cancelar</button>
                </div>

            </div>
        </div>
    )
}