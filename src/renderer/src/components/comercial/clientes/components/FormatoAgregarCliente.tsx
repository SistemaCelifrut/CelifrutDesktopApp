/* eslint-disable prettier/prettier */

import { useEffect, useState } from "react"
import { clienteType } from "@renderer/types/clientesType";
import { clienteDefault } from "../functions/functions";
import useAppContext from "@renderer/hooks/useAppContext";

type propsType = {
    modificar: boolean
    handleChange: () => void
    cliente: clienteType | undefined
}

export default function FormatoAgregarCliente(props: propsType): JSX.Element {
    const { messageModal } = useAppContext()
    const [formState, setFormState] = useState<clienteType>(clienteDefault);
    useEffect(() => {
        data_cliente()
    }, [props.modificar])
    const data_cliente = (): void => {
        if (props.modificar && props.cliente !== undefined) {
            const formData = { ...formState };
            formData.CODIGO = Number(props.cliente?.CODIGO) 
            formData.CLIENTE = String(props.cliente?.CLIENTE) 
            formData.CORREO = String(props.cliente?.CORREO) 
            formData.DIRECCIÓN = String(props.cliente?.DIRECCIÓN) 
            formData.PAIS_DESTINO = String(props.cliente?.PAIS_DESTINO) 
            formData.TELEFONO = String(props.cliente?.TELEFONO) 
            formData.ID = String(props.cliente?.ID) 
            setFormState(formData)
         } else {
            const formData = { ...formState };
            formData.CODIGO = 0
            formData.CLIENTE =  ""
            formData.CORREO = ""
            formData.DIRECCIÓN =  ""
            formData.PAIS_DESTINO =  ""
            formData.TELEFONO =  ""
            formData.ID = ""
            setFormState(formData)
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
    const handleGuardar = async (): Promise<void> => {
        try {
            const request = {
                collection: 'clientes',
                action: 'addCliente',
                query: 'proceso',
                data: formState
            }
            const response = await window.api.server(request)
            if (response.status !== 200)
                throw new Error(response.message)
            messageModal("success", "Cliente guardado con exito")
            props.handleChange()
        } catch (e) {
            if (e instanceof Error)
                messageModal("error", e.message)
        }
    }
    const handleModificar = async (): Promise<void> => {
        try{
            const request = {
                collection: 'clientes',
                action: 'putCliente',
                query: 'proceso',
                data: formState,
                _id: props.cliente?._id
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
        <div className='componentContainer'>
            <h2>{props.modificar ? "Modificar Cliente": "Agregar Cliente"}</h2>
            <form className='form-container'>
                <div>
                    <label>Codigo</label>
                    <input type="text" onChange={handleChange} name="CODIGO" value={formState.CODIGO} required />
                </div>
                <div>
                    <label>Cliente</label>
                    <input type="text" onChange={handleChange} name="CLIENTE" value={formState.CLIENTE} required />
                </div>
                <div>
                    <label>Correo</label>
                    <input type="email" onChange={handleChange} name="CORREO" value={formState.CORREO} required />
                </div>
                <div>
                    <label>Dirección</label>
                    <input type="text" onChange={handleChange} name="DIRECCIÓN" value={formState.DIRECCIÓN} required />
                </div>
                <div>
                    <label>Pais</label>
                    <input type="text" onChange={handleChange} name="PAIS_DESTINO" value={formState.PAIS_DESTINO} required />
                </div>
                <div>
                    <label>Telefono</label>
                    <input type="text" onChange={handleChange} name="TELEFONO" value={formState.TELEFONO} required />
                </div>
                <div>
                    <label>ID</label>
                    <input type="text" onChange={handleChange} name="ID" value={formState.ID} required />
                </div>
                <div className='defaultSelect-button-div'>
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
