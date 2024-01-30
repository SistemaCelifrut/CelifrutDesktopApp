/* eslint-disable prettier/prettier */

import { useContext, useEffect, useState } from "react"
import { permisosType, serverResponse } from "./type/type";
import { themeContext } from "@renderer/App";
import { FaUserPlus } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import { GiScrollQuill } from "react-icons/gi";

export default function CrearCuenta(): JSX.Element {
    const theme = useContext(themeContext)
    const [permisos, setPermisos] = useState<string[]>([])
    const [permisosSeleccionado, setPermisosSeleccionados] = useState<string[]>([])
    const [usuario, setUsuario] = useState<string>('')
    const [constraseña, setContraseña] = useState<string>('')
    const [correo, setCorreo] = useState<string>('')
    const [cargos, setCargos] = useState<string[]>([]);
    const [cargo, setCargo] = useState<string>('');
    useEffect(() => {
        const obtenerPermisos = async (): Promise<void> => {
            const request = {
                action: 'obtenerPermisosUsuario',
                query: 'personal'
            }
            const response: serverResponse<permisosType> = await window.api.user(request);
            if (response.status === 200) {
                setPermisos(response.data.permisos);
                setCargos(response.data.cargos)
            } else {
                alert("Error obteniendo los permisos");
            }
        }
        obtenerPermisos()
    }, [])
    const handlePermisos = (e): void => {
        const permisosAux = permisosSeleccionado;

        if(permisosAux.includes(e)){
            const index = permisosAux.findIndex(item => item === e)
            permisosAux.splice(index, 1);
        } else{
            permisosAux.push(e);
        }
        setPermisosSeleccionados(permisosAux);
    }
    const crearUsuario = async (event): Promise<void> => {
        try{
            event.preventDefault()
            const request = {
                action: 'crearUsuario',
                query:'personal',
                data:{
                    usuario:usuario,
                    contraseña: constraseña,
                    permisos: permisosSeleccionado,
                    cargo:cargo,
                    correo:correo
                }
            }
            const response = await window.api.user(request);
            console.log(response)
            if(response.status === 200){
            console.log("nice")     
            } else {
                alert('Error al crear el usuario')
            }
        } catch(e){
            console.error(e)
        } finally {
            setUsuario('')
            setContraseña('')
            setCorreo('')
            setCargo('')
            setCargos([])
            resetearCheckboxs()
        }
    }
    const resetearCheckboxs = (): void => {
        const elementos = document.getElementsByClassName('permisos-class');
        for(const elemento of elementos){
            (elemento as HTMLInputElement).checked = false;
        }
    }
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center m-4">
                <h2 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-xl font-bold`}>
                    Formulario de Creación de Cuentas
                </h2>
            </div>
            <div className="flex justify-center text-sm">
                <p className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>
                    Complete la información a continuación para crear una nueva cuenta
                </p>
            </div>
            <form className={`my-4 mx-2 rounded-lg w-4/5 flex flex-col justify-center items-center p-2 shadow-lg
                            ${theme === 'Dark' ? 'bg-slate-600' : 'bg-slate-100'}`}
                    onSubmit={crearUsuario}>
                <div className={`w-4/5 m-1 flex flex-col gap-1 justify-center items-center`}>

                    <div className="flex justify-start w-full">
                        <label className={`flex flex-row gap-1 items-center ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
                            <FaUserPlus className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`} /> Usuario:
                        </label>
                    </div>

                    <input
                        required
                        type="text"
                        value={usuario}
                        onChange={(e): void => setUsuario(e.target.value)}
                        className={`rounded-lg p-2 transition-all duration-500 ease-in-out 
                                ${usuario !== '' ? 'h-9 w-full border-solid border-2 border-Celifrut-green' : 'h-8 w-11/12'}`} />
                </div>
                <div className={`w-4/5 m-1 flex flex-col gap-1 justify-center items-center`}>

                    <div className="flex justify-start w-full">
                        <label className={`flex flex-row gap-1 items-center ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
                            <RiLockPasswordFill className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`} /> Contraseña:
                        </label>
                    </div>

                    <input
                        required
                        type="text"
                        value={constraseña}
                        onChange={(e): void => setContraseña(e.target.value)}
                        className={`rounded-lg p-2 transition-all duration-500 ease-in-out 
                          ${constraseña !== '' ? 'h-9 w-full border-solid border-2 border-Celifrut-green' : 'h-8 w-11/12'}`} />
                </div>
                <div className={`w-4/5 m-1 flex flex-col gap-1 justify-center items-center`}>

                    <div className="flex justify-start w-full">
                        <label className={`flex flex-row gap-1 items-center ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
                            <IoMdMail className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`} /> Correo:
                        </label>
                    </div>

                    <input
                        required
                        type="email"
                        value={correo}
                        onChange={(e): void => setCorreo(e.target.value)}
                        className={`rounded-lg p-2 transition-all duration-500 ease-in-out 
                        ${correo !== '' ? 'h-9 w-full border-solid border-2 border-Celifrut-green' : 'h-8 w-11/12'}`} />
                </div>
                <div className={`w-4/5 m-1 flex flex-col gap-1 justify-center items-center`}>

                    <div className="flex justify-start w-full">
                        <label className={`flex flex-row gap-1 items-center ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
                            <GiScrollQuill className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`} /> Cargo:
                        </label>
                    </div>

                    <select
                        required
                        value={cargo}
                        onChange={(e): void => setCargo(e.target.value)}
                        className={`rounded-lg  transition-all duration-500 ease-in-out text-sm
                        ${cargo !== '' ? 'h-9 w-full border-solid border-2 border-Celifrut-green' : 'h-8 w-11/12'}`} >
                        <option value="">Cargo</option>
                        {cargos.map(item => (
                            <option value={item} key={item}>{item}</option>
                        ))}
                    </select>
                </div>
                <div className={`w-4/5 m-1 flex flex-col gap-1 justify-center items-center`}>
                    <div className="flex justify-start w-full">
                        <p className={`flex flex-row gap-1 items-center ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
                            Permisos:
                        </p>
                    </div>
                    <div className="flex flex-row flex-wrap gap-4 justify-start w-full border-solid border-2 border-slate-200 rounded-lg p-2">
                        {permisos && permisos.map(permiso => (
                            <div className={`flex justify-start mt-2`} key={permiso}>
                                <label className={`flex flex-row gap-1 items-center ${theme === 'Dark' ? 'text-white' : 'text-black'}`} >
                                    <input type="checkbox"  className="permisos-class" onClick={(): void => handlePermisos(permiso)} />
                                    {' '}{permiso}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    className="my-4 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                    Guardar
                </button>
            </form>

        </div>
    )
}
