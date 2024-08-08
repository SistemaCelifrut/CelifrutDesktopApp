/* eslint-disable prettier/prettier */
import useAppContext from "@renderer/hooks/useAppContext";
import { useEffect, useState } from "react";
import { formStateType, initFormState } from "../functions/functions";
import { userType } from "@renderer/types/cuentas";
import { cargoType } from "@renderer/types/cargos";

type propsType = {
    handleChange: () => void
    usuario: userType | undefined
    modificar: boolean
}

export default function IngresarCuentas(props: propsType): JSX.Element {
    const { messageModal } = useAppContext();
    const [formState, setFormState] = useState<formStateType>(initFormState);
    const [cargos, setCargos] = useState<cargoType[]>([])
    useEffect(() => {
        obtener_cargos()
    }, [])
    // useEffect(() => {
    //     datos_usuario()
    // }, [props.modificar])
    // const datos_usuario = (): void => {
    //     if (props.modificar && props.usuario !== undefined) {
    //         const formData = { ...formState };
    //         formData.usuario = props.usuario.usuario
    //         formData.contrasenna = props.usuario.contrasenna
    //         formData.nombre = props.usuario.nombre !== undefined ? props.usuario.nombre : ''
    //         formData.apellido = props.usuario.apellido !== undefined ? props.usuario.apellido : ''
    //         formData.genero = props.usuario.genero !== undefined ? props.usuario.genero : ''
    //         formData.direccion = props.usuario.direccion !== undefined ? props.usuario.direccion : ''
    //         formData.telefono = props.usuario.telefono !== undefined ? props.usuario.telefono : ''
    //         formData.email = props.usuario.email !== undefined ? props.usuario.email : ''
    //         formData.estado = props.usuario.estado !== undefined ? props.usuario.estado : ''

    //         formData.permisos = props.usuario.permisos_id
    //         formData.cumpleannos = props.usuario.cumpleannos !== undefined ? new Date(props.usuario.cumpleannos).toISOString().substr(0, 10) : ''
    //         formData.cargo = props.usuario.cargo._id
    //         formData.cargoName = props.usuario.cargo.CArgo
    //         setFormState(formData);

    //     } else if (!props.modificar) {
    //         setFormState({ ...initFormState });
    //     }
    // }
    const obtener_cargos = async (): Promise<void> => {
        try {
            const request = { action: 'get_cargos' }
            const response = await window.api.server2(request);
            if (response.status !== 200)
                throw new Error(response.message)
            const cargosData = response.data.map(cargo => ({ Cargo: cargo.Cargo, _id: cargo._id }));
            setCargos(cargosData)
        } catch (e) {
            if (e instanceof Error)
                messageModal("error", e.message);
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
            if (formState.usuario === "" || formState.contrasenna === '' || formState.cargo === '') {
                throw new Error("Necesita llenar los datos requeridos")
            }
            const request = {
                action: 'add_user',
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
        try {
            if (formState.usuario === "" || formState.contrasenna === '' || formState.cargo === '') {
                throw new Error("Necesita llenar los datos requeridos")
            }
            const request = {
                collection: 'users',
                action: 'putUser',
                query: 'postgreDB',
                data: formState,
                user_id: props.usuario?.usuario_id
            }
            const response = await window.api.server(request)
            if (response.status !== 200)
                throw new Error(response.message)
            messageModal("success", "Usuario modificado con exito")
            props.handleChange()
        } catch (e) {
            if (e instanceof Error)
                messageModal("error", e.message)
        }
    }
    return (
        <div className="componentContainer">
            <form className="form-container" style={{ zIndex: 20 }}>
                <h2>{props.modificar ? "Modificar cuenta" : "Ingresar cuenta"}</h2>
                <div>
                    <label>Usuario</label>
                    <input type="text" onChange={handleChange} name="usuario" value={formState.usuario} required />
                </div>
                <div>
                    <label>Contraseña</label>
                    <input type="text" onChange={handleChange} name="contrasenna" value={formState.contrasenna} required />
                </div>
                <div>
                    <label> Cargos</label>
                    <select
                        className='defaultSelect usuario-ingresar-cuenta-cargo-select'
                        onChange={handleChange}
                        value={formState.cargo}
                        required
                        name='cargo'>
                        <option value="">Cargos</option>
                        {cargos.map((item) => (
                            <option key={item._id} value={item._id}>{item.Cargo}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Nombre</label>
                    <input type="text" onChange={handleChange} name="nombre" value={formState.nombre} required />
                </div>
                <div>
                    <label>Apellido</label>
                    <input type="text" onChange={handleChange} name="apellido" value={formState.apellido} required />
                </div>
                <div>
                    <label>Genero</label>
                    <input type="text" onChange={handleChange} name="genero" value={formState.genero} required />
                </div>
                <div>
                    <label>Cumpleaños</label>
                    <input type="date" onChange={handleChange} name="cumpleannos" value={formState.cumpleannos} required />
                </div>
                <div>
                    <label>Dirección</label>
                    <input type="text" onChange={handleChange} name="direccion" value={formState.direccion} required />
                </div>
                <div>
                    <label>Telefono</label>
                    <input type="tel" onChange={handleChange} name="telefono" value={formState.telefono} required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" onChange={handleChange} name="email" value={formState.email} required />
                </div>
                <div>
                    <label> Estado</label>
                    <select
                        className='defaultSelect'
                        onChange={handleChange}
                        required
                        name='estado'>
                        <option value="Activo">Activo</option>
                        <option value="Activo">Inactivo</option>
                    </select>
                </div>
            </form>

            <div className="agregar-usuario-guardar-boton-div">
                {props.modificar ?
                    <button onClick={handleModificar} className="defaulButtonAgree">Modificar</button>
                    :
                    <button onClick={handleGuardar} className="defaulButtonAgree">Guardar</button>
                }
            </div>
        </div>
    )
}