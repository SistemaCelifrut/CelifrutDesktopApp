import { useContext, useEffect, useState } from "react";
import { permisosType, serverResponse } from "../type/type";
import { themeContext } from "@renderer/App";
import { FaUserPlus } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import { GiScrollQuill } from "react-icons/gi";

interface Permiso {
    id: string;
    nombre: string;
    hijos?: Permiso[];
}

export default function CrearCuenta(): JSX.Element {
    const theme = useContext(themeContext);
    const [permisos, setPermisos] = useState<Permiso[]>([]);
    const [permisosSeleccionados, setPermisosSeleccionados] = useState<string[]>([]);
    const [usuario, setUsuario] = useState<string>('');
    const [contraseña, setContraseña] = useState<string>(''); 
    const [correo, setCorreo] = useState<string>('');
    const [cargos, setCargos] = useState<string[]>([]);
    const [cargo, setCargo] = useState<string>('');

    useEffect(() => {
        const obtenerPermisos = async (): Promise<void> => {
            try {
                const request = {
                    action: 'obtenerPermisosUsuario',
                    query: 'personal'
                };
                const response: serverResponse<permisosType> = await window.api.user(request);
                if (response.status === 200) {
                    setPermisos(formatPermisos(response.data.permisos));
                    setCargos(response.data.cargos);
                } else {
                    alert("Error obteniendo los permisos");
                }
            } catch (error) {
                console.error('Error al obtener permisos:', error);
            }
        };
        obtenerPermisos();
    }, []);

    const formatPermisos = (permisos: string[]): Permiso[] => {
        const formattedPermisos: Permiso[] = [];
        let idCounter = 0;

        permisos.forEach(permiso => {
            const paths = permiso.split('//');
            let currentLevel = formattedPermisos;

            paths.forEach((path, index) => {
                const existingPermiso = currentLevel.find(p => p.nombre === path);

                if (existingPermiso) {
                    if (index === paths.length - 1) {
                        existingPermiso.nombre = path;
                    }
                    currentLevel = existingPermiso.hijos || [];
                } else {
                    const newPermiso: Permiso = { id: `permiso-${idCounter++}`, nombre: path };
                    currentLevel.push(newPermiso);
                    if (index < paths.length - 1) {
                        currentLevel = newPermiso.hijos = [];
                    }
                }
            });
        });

        return formattedPermisos;
    };

    const handleSeleccionRecursiva = (nombre: string, isChecked: boolean, hijos?: Permiso[]): void => {
        if (!hijos) return;

        if (isChecked) {
            setPermisosSeleccionados(prevState => [...prevState, nombre]);
        } else {
            setPermisosSeleccionados(prevState => prevState.filter(item => item !== nombre));
        }

        hijos.forEach(hijo => {
            handleSeleccionRecursiva(hijo.nombre, isChecked, hijo.hijos);
        });
    };

    const handlePermisos = (nombre: string, isChecked: boolean, hijos?: Permiso[]): void => {
        const toggleChildren = (permisos: Permiso[], isChecked: boolean): void => {
            permisos.forEach(permiso => {
                // Seleccionar/deseleccionar el permiso actual
                setPermisosSeleccionados(prevState => {
                    if (isChecked && !prevState.includes(permiso.nombre)) {
                        return [...prevState, permiso.nombre];
                    } else if (!isChecked && prevState.includes(permiso.nombre)) {
                        return prevState.filter(item => item !== permiso.nombre);
                    }
                    return prevState;
                });
    
                // Seleccionar/deseleccionar los hijos recursivamente
                if (permiso.hijos && permiso.hijos.length > 0) {
                    toggleChildren(permiso.hijos, isChecked);
                }
            });
        };
    
        // Seleccionar/deseleccionar la carpeta principal
        setPermisosSeleccionados(prevState => {
            if (isChecked && !prevState.includes(nombre)) {
                return [...prevState, nombre];
            } else if (!isChecked && prevState.includes(nombre)) {
                return prevState.filter(item => item !== nombre);
            }
            return prevState;
        });
    
        // Seleccionar/deseleccionar los hijos recursivamente
        if (hijos && hijos.length > 0) {
            toggleChildren(hijos, isChecked);
        }
    };
    
    const crearUsuario = async (event): Promise<void> => {
        try {
            event.preventDefault();

            // Obtener todas las rutas completas de los permisos seleccionados
            const permisosConRuta = obtenerPermisosConRuta(permisos, permisosSeleccionados);

            const request = {
                action: 'crearUsuario',
                query: 'personal',
                data: {
                    usuario: usuario,
                    contraseña: contraseña,
                    permisos: permisosConRuta,
                    cargo: cargo,
                    correo: correo
                }
            };

            const response = await window.api.user(request);
            console.log(request);
            if (response.status === 200) {
                console.log("nice");
            } else {
                alert('Error al crear el usuario');
            }
        } catch (e) {
            console.error(e);
        } finally {
            setUsuario('');
            setContraseña('');
            setCorreo('');
            setCargo('');
            setCargos([]);
            resetearCheckboxs();
        }
    };    

    const obtenerPermisosConRuta = (permisos: Permiso[], permisosSeleccionados: string[]): string[] => {
        const permisosConRuta: string[] = [];
        permisosSeleccionados.forEach(permisoSeleccionado => {
            permisos.forEach(permiso => {
                agregarPermisosConRuta(permiso, permisoSeleccionado, '', permisosConRuta);
            });
        });
        return permisosConRuta;
    };

    const agregarPermisosConRuta = (permiso: Permiso, permisoSeleccionado: string, ruta: string, permisosConRuta: string[]): void => {
        const rutaActual = ruta !== '' ? `${ruta}//${permiso.nombre}` : permiso.nombre;

        if (permisoSeleccionado === permiso.nombre && (!permiso.hijos || permiso.hijos.length === 0)) {
            permisosConRuta.push(rutaActual);
            return;
        }

        if (permiso.hijos && permiso.hijos.length > 0) {
            permiso.hijos.forEach(hijo => {
                agregarPermisosConRuta(hijo, permisoSeleccionado, rutaActual, permisosConRuta);
            });
        }
    };

    const resetearCheckboxs = (): void => {
        const elementos = document.getElementsByClassName('permisos-class');
        for (const elemento of elementos) {
            (elemento as HTMLInputElement).checked = false;
        }
    };

    const renderizarPermisos = (permisos: Permiso[]): JSX.Element[] => {
        return permisos.map(permiso => (
            <div key={permiso.id} className="ml-4">
                <div className="border rounded p-2 mb-4" style={{ display: 'flex', flexDirection: 'column' }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={permisosSeleccionados.includes(permiso.nombre)}
                            onChange={() => handlePermisos(permiso.nombre, !permisosSeleccionados.includes(permiso.nombre), permiso.hijos)}
                        />
                        {permiso.nombre}
                    </label>
                    {/* Renderizar subcarpetas recursivamente */}
                    {permiso.hijos && renderizarSubPermisos(permiso.hijos)}
                </div>
            </div>
        ));
    };
    
    const renderizarSubPermisos = (subPermisos: Permiso[]): JSX.Element => {
        return (
            <div className="ml-4" style={{ display: 'flex', flexDirection: 'column' }}>
                {subPermisos.map(subPermiso => (
                    <div key={subPermiso.id} style={{ marginLeft: '20px' }}>
                        <label>
                            <input
                                type="checkbox"
                                checked={permisosSeleccionados.includes(subPermiso.nombre)}
                                onChange={() => handlePermisos(subPermiso.nombre, !permisosSeleccionados.includes(subPermiso.nombre))}
                            />
                            {subPermiso.nombre}
                        </label>
                        {/* Renderizar subcarpetas recursivamente */}
                        {subPermiso.hijos && renderizarSubPermisos(subPermiso.hijos)}
                    </div>
                ))}
            </div>
        );
    };    

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
                        value={contraseña}
                        onChange={(e): void => setContraseña(e.target.value)}
                        className={`rounded-lg p-2 transition-all duration-500 ease-in-out 
                          ${contraseña !== '' ? 'h-9 w-full border-solid border-2 border-Celifrut-green' : 'h-8 w-11/12'}`} />
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
                    <div className={`${theme === 'Dark' ? 'text-white' : 'text-black'}  flex flex-row flex-wrap gap-4  justify-start w-full border-solid border-2 border-slate-200 rounded-lg p-3`}>
                        {renderizarPermisos(permisos)}
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
    );
}