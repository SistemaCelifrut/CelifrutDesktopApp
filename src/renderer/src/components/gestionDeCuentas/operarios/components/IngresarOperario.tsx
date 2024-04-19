/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import * as strings from '../json/strings_ES.json';
import { createRequest, initFormState } from '../functions/functions';
import useAppContext from '@renderer/hooks/useAppContext';
import { operariosType } from '@renderer/types/operariosType';

type propsType = {
    modificar: boolean
    handleChange: () => void
    operario: operariosType | undefined
}

export default function IngresarOperario(props:propsType): JSX.Element {
    const { messageModal } = useAppContext();
    const [formState, setFormState] = useState(initFormState);
    useEffect(() => {
        datosOperario()
    }, [props.modificar])
    const datosOperario = ():void => {
        if(props.modificar && props.operario !== undefined){
            const formData = {...formState}
            formData.nombre = props.operario.nombre
            formData.apellido = props.operario.apellido
            formData.cargo = props.operario.cargo
            formData.estado = props.operario.estado
            formData.fechaNacimiento = String(props.operario.fecha_nacimiento)
            formData.genero = String(props.operario.genero)
            formData.direccion = String(props.operario.direccion)
            formData.telefono = String(props.operario.telefono)
            formData.email = String(props.operario.correo_electronico)
            setFormState(formData)
        } else {
            const formData = {...formState}
            formData.nombre = ""
            formData.apellido = ""
            formData.cargo = ""
            formData.estado = ""
            formData.fechaNacimiento = ""
            formData.genero = ""
            formData.direccion = ""
            formData.telefono = ""
            formData.email = ""
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
    const handleGuardar = async (event): Promise<void> => {
        event.preventDefault();
        try{
            const request = createRequest(formState);
            const response = await window.api.server(request);
            if(response.status !== 200)
                throw new Error(response.message)
            messageModal("success","Operario agregado con exito");
            props.handleChange()
        }catch (e){
            if(e instanceof Error)
                messageModal("error", e.message);
        }
    }
    const handleModificar = async (event): Promise<void> => {
        event.preventDefault();
        try{
            const request = {
                collection: 'users',
                action: 'putOperario',
                query: 'postgreDB',
                data: formState,
                id_operario:props.operario?.id
            }
            const response = await window.api.server(request);
            if(response.status !== 200)
                throw new Error(response.message)
            messageModal("success","Operario agregado con exito");
            props.handleChange()

        }catch (e){
            if(e instanceof Error)
                messageModal("error", e.message);
        }
    }
    return (
        <div className='componentContainer'>
            <h2>
                {props.modificar ?  strings.title.modificar :strings.title.ingresar}
            </h2>
            <form className='form-container' onSubmit={handleGuardar}>
                <div>
                    <label>{strings.nombre}</label>
                    <input type="text" onChange={handleChange} name="nombre" value={formState.nombre} required />
                </div>
                <div>
                    <label>{strings.apellido}</label>
                    <input type="text" onChange={handleChange} name="apellido" value={formState.apellido} required />
                </div>
                <div>
                    <label>{strings.estado.title}</label>
                    <select
                        className='defaultSelect'
                        value={formState.estado}
                        onChange={handleChange}
                        name='estado'>
                        <option value=""></option>
                        {strings.estado.estados.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>{strings.cargo.title}</label>
                    <select
                        className='defaultSelect'
                        value={formState.cargo}
                        onChange={handleChange}
                        name='cargo'>
                        <option value=""></option>
                        {strings.cargo.cargos.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>{strings.fechaNacimiento}</label>
                    <input type="date" onChange={handleChange} name="fechaNacimiento" value={formState.fechaNacimiento} />
                </div>
                <div>
                    <label>{strings.genero.title}</label>
                    <select
                        className='defaultSelect'
                        value={formState.genero}
                        onChange={handleChange}
                        name='genero'>
                        <option value=""></option>
                        {strings.genero.generos.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>{strings.direccion}</label>
                    <input type="text" onChange={handleChange} name="direccion" value={formState.direccion} />
                </div>
                <div>
                    <label>{strings.telefono}</label>
                    <input type="text" onChange={handleChange} name="telefono" value={formState.telefono} />
                </div>
                <div>
                    <label>{strings.email}</label>
                    <input type="text" onChange={handleChange} name="email" value={formState.email} />
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