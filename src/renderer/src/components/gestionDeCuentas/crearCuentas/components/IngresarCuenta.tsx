/* eslint-disable prettier/prettier */
import useAppContext from "@renderer/hooks/useAppContext";
import { useEffect, useState } from "react";
import { formStateType, initFormState } from "../functions/functions";
import { cargosUsuariosType, userType } from "@renderer/types/cuentas";
import ArbolPermisos from "./ArbolPermisos";

type propsType = {
    handleChange: () => void
    usuario: userType | undefined
    modificar: boolean
}

export default function IngresarCuentas(props:propsType): JSX.Element {
    const { messageModal } = useAppContext();
    const [formState, setFormState] = useState<formStateType>(initFormState);
    const [cargos, setCargos] = useState<cargosUsuariosType[]>([])
    const [permisos, setPermisos] = useState<object>({})
    const [change, setChange] = useState<boolean>(true)
    useEffect(() => {
        obtener_cargos()
        obtener_permisos()
        datos_usuario()
    }, [])
    const datos_usuario = (): void => {
        if(props.modificar && props.usuario !== undefined){
            formState.usuario = props.usuario.usuario
            formState.contrasenna = props.usuario.contrasenna
            formState.nombre = props.usuario.nombre !== undefined ? props.usuario.nombre : ''
            formState.apellido = props.usuario.apellido !== undefined ? props.usuario.apellido : ''
            formState.genero = props.usuario.genero !== undefined ? props.usuario.genero : ''
            formState.direccion = props.usuario.direccion !== undefined ? props.usuario.direccion : ''
            formState.telefono = props.usuario.telefono !== undefined ? props.usuario.telefono : ''
            formState.email = props.usuario.email !== undefined ? props.usuario.email : ''
            formState.estado = props.usuario.estado !== undefined ? props.usuario.estado : ''

            formState.cumpleannos = props.usuario.cumpleannos !== undefined ? new Date(props.usuario.cumpleannos).toISOString().substr(0, 10) : ''
            formState.cargo = Number(props.usuario.cargo)

        }
    }
    const obtener_cargos = async (): Promise<void> => {
        try {
            const request = { collection: 'users', action: 'getCargos' }
            const response = await window.api.server(request);
            if (response.status !== 200)
                throw new Error(response.message)
            setCargos(response.data)
            console.log(response)
        } catch (e) {
            if (e instanceof Error)
                messageModal("error", e.message);
        }
    }
    const obtener_permisos = async (): Promise<void> => {
        try {
            const request = { collection: 'users', action: 'getPermisos' }
            const response = await window.api.server(request);
            if (response.status !== 200)
                throw new Error(response.message)
            const objPermisos = {}
            const permisos = response.data.map(item => item.nombre)
            const data = permisos.map(item => item.split("//"))
            data.forEach((item, index) => {
                if (!Object.prototype.hasOwnProperty.call(objPermisos, item[0])) {
                    objPermisos[item[0]] = {}
                }
                if (!Object.prototype.hasOwnProperty.call(objPermisos[item[0]], item[1])) {
                    objPermisos[item[0]][item[1]] = []
                }
                objPermisos[item[0]][item[1]].push({ nombre: item[2], id: response.data[index].permiso_id })
                setPermisos(objPermisos)
            });
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
    const handleCheck = (e):void => {
        if(e.target.checked){
            setFormState((prevState) => ({
                ...prevState,
                permisos: [...prevState.permisos, Number(e.target.value)],
            }));
        }else {
            const p = formState.permisos
            const index = p.findIndex(item => item === Number(e.target.value))
            p.splice(index,1)
            setFormState({...formState,permisos:p})

        }
    }
    const handleGuardar = async ():Promise<void> => {
        try{
            if(formState.usuario === "" || formState.contrasenna === '' ||  formState.cargo === 0 || formState.permisos.length === 0){
                throw new Error("Necesita llenar los datos requeridos")
            }
            const request = {
                collection: 'users',
                action: 'addUser',
                query: 'postgreDB',
                data:formState
            }
            const response = await window.api.server(request)
            console.log(response)
            if(response.status !== 200)
                throw new Error(response.message)
            messageModal("success","Usuario guardado con exito")
            props.handleChange()
        } catch(e){
            if(e instanceof Error)
                messageModal("error", e.message)
        }
    }
    return (
        <div className="componentContainer">
            <div className="agregar-usuario-div-boton" >
                <button
                    className={change ? "agregar-usuario-boton" : "agregar-usuario-boton-dark"}
                    onClick={(): void => setChange(true)}>
                    Información
                </button>
                <button
                    className={change ? "agregar-usuario-boton-dark" : "agregar-usuario-boton"}
                    onClick={(): void => setChange(false)}>
                    Permisos
                </button>
            </div>
            {change ?
                <form className="form-container" style={{ zIndex: 20 }}>
                    <h2>Ingresar cuenta</h2>
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
                            className='defaultSelect'
                            onChange={handleChange}
                            value={formState.cargo}
                            required
                            name='cargo'>
                            <option value="">Cargos</option>
                            {cargos.map((item) => (
                                <option key={item.cargo_id} value={item.cargo_id}>{item.nombre}</option>
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
                </form> :
                <ArbolPermisos permisos={permisos} handleCheck={handleCheck} />
            }
            <div className="agregar-usuario-guardar-boton-div">
                <button onClick={handleGuardar} className="defaulButtonAgree">Guardar</button>
            </div>
        </div>
    )
}