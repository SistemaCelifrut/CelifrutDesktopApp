/* eslint-disable prettier/prettier */
import { useState } from 'react';
import * as strings from '../json/strings_ES.json';
import { createRequest, initFormState } from '../functions/functions';
import useAppContext from '@renderer/hooks/useAppContext';

export default function IngresarOperario(): JSX.Element {
    const { messageModal } = useAppContext();
    const [formState, setFormState] = useState(initFormState);
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
            setFormState(initFormState)
        }catch (e){
            if(e instanceof Error)
                messageModal("error", e.message);
        }
    }
    return (
        <div className='componentContainer'>
            <h2>
                {strings.title}
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
                    <label>{strings.fechaNacimiento}</label>
                    <input type="date" onChange={handleChange} name="fechaNacimiento" value={formState.fechaNacimiento} />
                </div>
                <div>
                    <label>{strings.genero.title}</label>
                    <select
                        className='defaultSelect'
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
                    <button type='submit'>Guardar</button>
                </div>
            </form>
        </div>
    )
}