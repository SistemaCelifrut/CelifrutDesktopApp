/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { formStateType, initFormState } from "../functions/functions";
import useAppContext from "@renderer/hooks/useAppContext";
import { proveedoresType } from "@renderer/types/proveedoresType";

type propsType = {
    modificar: boolean
    handleChange: () => void
    proveedor: proveedoresType | undefined
}
export default function AgregarProveedor(props: propsType): JSX.Element {
    const { messageModal } = useAppContext()
    const [formState, setFormState] = useState<formStateType>(initFormState);
    useEffect(() => {
        datos_proveedor()
    }, [props.modificar])
    const datos_proveedor = (): void => {
        if (props.modificar && props.proveedor !== undefined) {
            const formData = { ...formState };
            formData["CODIGO INTERNO"] = String(props.proveedor["CODIGO INTERNO"])
            formData.PREDIO = String(props.proveedor.PREDIO)
            formData.ICA = String(props.proveedor.ICA)
            formData.DEPARTAMENTO = String(props.proveedor.DEPARTAMENTO)
            formData.PROVEEDORES = String(props.proveedor.PROVEEDORES)
            formData.GGN = String(props.proveedor.GGN)
            formData["FECHA VENCIMIENTO GGN"] = String(props.proveedor["FECHA VENCIMIENTO GGN"])
            formData.activo = props.proveedor.activo ? true : false
            formData.L = String(props.proveedor.L)
            formData.N = String(props.proveedor.N)
            formData.M = String(props.proveedor.M)
            setFormState(formData)
         } else {
            const formData = { ...formState };
            formData["CODIGO INTERNO"] = ""
            formData.PREDIO = ""
            formData.ICA = ""
            formData.DEPARTAMENTO = ""
            formData.PROVEEDORES = ""
            formData.GGN = ""
            formData["FECHA VENCIMIENTO GGN"] = ""
            formData.activo = false
            formData.L = String("")
            formData.N = String("")
            formData.M = String("")
            setFormState(formData)
         }

    }
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
    const handleModificar = async (): Promise<void> => {
        try{
            const request = {
                collection: 'proveedors',
                action: 'putProveedor',
                query: 'proceso',
                data: formState,
                _id: props.proveedor?._id
            }
            const response = await window.api.server(request)
            if (response.status !== 200)
                throw new Error(response.message)
            messageModal("success", "Proveedor modificado con exito")
            props.handleChange()
        }catch(e){
            if( e instanceof Error)
                messageModal("error",e.message)
        }
    }
    return (
        <div className="componentContainer">
            <form className="form-container" >
                <h2>{props.modificar ? "Modificar proveedor" : "Ingresar proveedor"}</h2>
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
                                checked={formState.N ? true : false}
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
                                checked={formState.L ? true : false}
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
                                checked={formState.M ? true : false}
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
                <div>
                    <label>Estado</label>
                    <select
                        onChange={handleChange}
                        name='activo'
                        required
                        value={String(formState.activo)}
                        className='defaultSelect'
                    >
                        <option value="true"></option>
                        <option value="true">Activo</option>
                        <option value="false">Inactivo</option>

                    </select>
                </div>
                <div className="agregar-usuario-guardar-boton-div">
                    {props.modificar ?
                        <button className="defaulButtonAgree" onClick={handleModificar}>Modificar</button>
                        :
                        <button className="defaulButtonAgree" onClick={handleGuardar}>Guardar</button>
                    }
                </div>
            </form>
        </div>
    )
}