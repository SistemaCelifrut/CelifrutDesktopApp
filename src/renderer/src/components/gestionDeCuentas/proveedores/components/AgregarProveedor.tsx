/* eslint-disable prettier/prettier */
import { useState } from "react";
import { formStateType, initFormState } from "../functions/functions";
import useAppContext from "@renderer/hooks/useAppContext";

type propsType = {
    modificar: boolean
    handleChange: () => void

}
export default function AgregarProveedor(props: propsType): JSX.Element {
    const {messageModal} = useAppContext()
    const [formState, setFormState] = useState<formStateType>(initFormState);
    const handleChange = (event): void => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };
    const handleGuardar = async (): Promise<void> => {
        try {
            const request = {
                collection: 'proveedors',
                action: 'addProveedor',
                query: 'proceso',
                data: formState
            }
            const response = await window.api.server(request)
            if (response.status !== 200)
                throw new Error(response.message)
            messageModal("success", "Usuario guardado con exito")
            props.handleChange()
        } catch (e) {
            if (e instanceof Error)
                messageModal("error", e.message)
        }
    }
    return (
        <div className="componentContainer">
            <form className="form-container" >
                <h2>{props.modificar ? "Modificar cuenta" : "Ingresar cuenta"}</h2>
                <div>
                    <label>Codigo interno</label>
                    <input type="text" onChange={handleChange} name="CODIGO INTERNO" value={formState["CODIGO INTERNO"]} required />
                </div>
                <div>
                    <label>Predio</label>
                    <input type="text" onChange={handleChange} name="PREDIO" value={formState.PREDIO} required />
                </div>
                <div>
                    <label>ICA</label>
                    <input type="text" onChange={handleChange} name="ICA" value={formState.ICA} required />
                </div>
                <div>
                    <label>Tipo de fruta</label>
                    <div className='form-checkbox-container'>
                        <label className='form-label-container'>
                            <span >Naranja</span>
                            <input
                                type="checkbox"
                                className="form-radio"
                                name="N"
                                value="X"
                                onChange={handleChange}
                            />
                        </label>
                        <label className='form-label-container'>
                            <span >Limon</span>
                            <input
                                type="checkbox"
                                className="form-radio"
                                name="L"
                                value="X"
                                onChange={handleChange}
                            />
                        </label>
                        <label className='form-label-container'>
                            <span >Mandarina</span>
                            <input
                                type="checkbox"
                                className="form-radio"
                                name="M"
                                value="X"
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                </div>
                <div>
                    <label>Departamento</label>
                    <input type="text" onChange={handleChange} name="DEPARTAMENTO" value={formState.DEPARTAMENTO} required />
                </div>
                <div>
                    <label>Proveedores</label>
                    <input type="text" onChange={handleChange} name="PROVEEDORES" value={formState.PROVEEDORES} required />
                </div>
                <div>
                    <label>GGN</label>
                    <input type="text" onChange={handleChange} name="GGN" value={formState.GGN} required />
                </div>
                <div>
                    <label>Vencimiento</label>
                    <input type="text" onChange={handleChange} name="FECHA VENCIMIENTO GGN" value={formState["FECHA VENCIMIENTO GGN"]} required />
                </div>
                <div className="agregar-usuario-guardar-boton-div">
                {props.modificar ?
                    <button className="defaulButtonAgree">Modificar</button>
                    :
                    <button className="defaulButtonAgree" onClick={handleGuardar}>Guardar</button>
                }
            </div>
            </form>
        </div>
    )
}