/* eslint-disable prettier/prettier */
import { useEffect, useState, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { themeContext } from "@renderer/App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import CrearCuenta from './CrearCuenta'; // Importa el componente CrearCuenta

interface Cuenta {
  _id: string;
  user: string;
  password: string;
  cargo: string;
  correo: string;
  permisos: string[];
}

const ObtenerCuentasComponente = (): JSX.Element => {
  const theme = useContext(themeContext);
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);
  const [, setEditIndex] = useState<number | null>(null);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Cuenta>({
    _id: '',
    user: '',
    password: '',
    cargo: '',
    correo: '',
    permisos: [],
  });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showCrearCuenta, setShowCrearCuenta] = useState(false);

  const [permisosDisponibles, setPermisosDisponibles] = useState<string[]>([]);
  const [permisosSeleccionados, setPermisosSeleccionados] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        await obtenerCuentas();
        await obtenerPermisosDisponibles();
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
  
    fetchData();
  }, []);
  

  const obtenerCuentas = async (): Promise<void> => {
    try {
      const request = {
        data:{
          query:{},
        },
        collection:'users',
        action: 'obtenerCuentas',
        query: 'personal'
      };
  
      const response = await window.api.user(request);
  
      if (response.status === 200 && response.data) {
        const cuentasData = Array.isArray(response.data) ? response.data : response.data.data;
        setCuentas(cuentasData);
      } else {
        console.error('Error al obtener cuentas:', response);
      }
    } catch (error) {
      console.error('Error al realizar la petición:', error);
    }
  };

  const obtenerPermisosDisponibles = async (): Promise<void> => {
    try {
      const request = {
        action: 'obtenerPermisosUsuario',
        query: 'personal'
      };
  
      const response = await window.api.user(request);
  
      if (response.status === 200 && response.data && response.data.permisos) {
        setPermisosDisponibles(response.data.permisos);
      } else {
        console.error('Error al obtener permisos disponibles:', response);
      }
    } catch (error) {
      console.error('Error al realizar la petición de permisos disponibles:', error);
    }
  };
  

  const handleEditar = (index: number): void => {
    setEditIndex(index);
    const cuenta = cuentas[index];
    setFormData({
      _id: cuenta._id,
      user: cuenta.user,
      password: cuenta.password,
      cargo: cuenta.cargo,
      correo: cuenta.correo,
      permisos: cuenta.permisos,
    });
    setPermisosSeleccionados(cuenta.permisos);
    setShowEditarModal(true);
  };

  const handleEliminar = async (index: number): Promise<void> => {
    try {
      setShowEliminarModal(true);
      setDeleteIndex(index);
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
    }
  };
  
  const confirmarEliminar = async (): Promise<void> => {
    try {
      if (deleteIndex !== null) {
        const cuenta = cuentas[deleteIndex];
        await window.api.user({ action: 'eliminarCuenta', id: cuenta._id, query: 'personal' });
        obtenerCuentas();
        setShowEliminarModal(false);
      }
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
    }
  };

  const handleSaveChanges = async (): Promise<void> => {
    try {
      setShowEditarModal(false);
      const permisosSeleccionadosArray = permisosDisponibles.filter(permiso => permisosSeleccionados.includes(permiso));
      const formDataWithPermisos = { ...formData, permisos: permisosSeleccionadosArray };
      await window.api.user({ action: 'editarCuenta', query: 'personal', formData: formDataWithPermisos });
      obtenerCuentas();
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };
  

  const toggleCrearCuenta = (): void => {
    setShowCrearCuenta(!showCrearCuenta);
  };

  const handlePermisoChange = (permiso: string): void => {
    const index = permisosSeleccionados.indexOf(permiso);
    if (index === -1) {
      setPermisosSeleccionados([...permisosSeleccionados, permiso]);
    } else {
      const newPermisosSeleccionados = [...permisosSeleccionados];
      newPermisosSeleccionados.splice(index, 1);
      setPermisosSeleccionados(newPermisosSeleccionados);
    }
  };

  return (
    <div>
    <div className="flex justify-center items-center mb-4 mt-4"> {/* Agregado margin-top */}
  <div className="flex items-center relative">
    <input
      type="text"
      placeholder="Buscar..."
      className="p-2 border rounded-md w-64 md:w-80"
      value={searchTerm}
      onChange={(e): void => setSearchTerm(e.target.value)}
    />
    <div className="absolute right-2 top-2 pointer-events-none">
      <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
    </div>
  </div>
</div>
  
      <div className="flex justify-center">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={toggleCrearCuenta}>
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          {showCrearCuenta ? "Ocultar Crear Cuenta" : "Agregar Cuenta"}
        </button>
      </div>
  
      {showCrearCuenta && <CrearCuenta />}
  
      {!showCrearCuenta && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className={`${theme === 'Dark' ? 'bg-slate-700 text-white' : 'bg-gray-200'}`}>
              <tr className="">
                <th className="py-2 px-4">Nombre de Usuario</th>
                <th className="py-2 px-4">Contraseña</th>
                <th className="py-2 px-4">Cargo</th>
                <th className="py-2 px-4">Correo</th>
                <th className="py-2 px-4">Permisos</th>
                <th className="py-2 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(cuentas) && cuentas
                .filter(cuenta =>
                  Object.values(cuenta)
                    .join(' ')
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((cuenta, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="border py-2 px-4">{cuenta.user}</td>
                    <td className="border py-2 px-4">{cuenta.password}</td>
                    <td className="border py-2 px-4">{cuenta.cargo}</td>
                    <td className="border py-2 px-4">{cuenta.correo}</td>
                    <td className="border py-2 px-4">{cuenta.permisos.join(', ')}</td>
                    <td className="border py-2 px-4  items-center space-x-2">
                      <button className="text-sm text-blue-500 hover:text-blue-700" onClick={(): void => handleEditar(index)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="text-sm text-red-500 hover:text-red-700" onClick={(): Promise<void> => handleEliminar(index)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      )}
  

      <Transition.Root show={showEditarModal} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setShowEditarModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="bg-white p-4 rounded-md w-96 mx-auto mt-20">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-4">Editar Cuenta</Dialog.Title>
              <div className="space-y-4">
                <div>
                  <label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-1">Nombre de Usuario</label>
                  <input type="text" id="user" className="input-field" value={formData.user} onChange={(e): void => setFormData({ ...formData, user: e.target.value })} />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                  <input type="text" id="password" className="input-field" value={formData.password} onChange={(e): void => setFormData({ ...formData, password: e.target.value })} />
                </div>
                <div>
                  <label htmlFor="cargo" className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                  <input type="text" id="cargo" className="input-field" value={formData.cargo} onChange={(e): void => setFormData({ ...formData, cargo: e.target.value })} />
                </div>
                <div>
                  <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
                  <input type="email" id="correo" className="input-field" value={formData.correo} onChange={(e): void => setFormData({ ...formData, correo: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Permisos</label>
                  <ul className="pl-0">
                    {permisosDisponibles.map((permiso, index) => (
                      <li key={index} className="list-none">
                        <input
                          type="checkbox"
                          id={`permiso-${index}`}
                          value={permiso}
                          checked={permisosSeleccionados.includes(permiso)}
                          onChange={(): void => handlePermisoChange(permiso)}
                        />
                        <label htmlFor={`permiso-${index}`} className="ml-2">{permiso}</label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSaveChanges}>Guardar Cambios</button>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={(): void => setShowEditarModal(false)}>Cancelar</button>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <Transition.Root show={showEliminarModal} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setShowEliminarModal}>
          <div className="flex items-center justify-center min-h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="bg-white p-4 rounded-md w-80">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">Eliminar Cuenta</Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">¿Estás seguro de que deseas eliminar esta cuenta?</p>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={confirmarEliminar}>
                    Eliminar
                  </button>
                  <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={(): void => setShowEliminarModal(false)}>
                    Cancelar
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
export default ObtenerCuentasComponente;