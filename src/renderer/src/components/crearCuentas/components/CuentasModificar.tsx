import { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

interface Cuenta {
  _id: string;
  user: string;
  password: string;
  cargo: string;
  correo: string;
}

const ObtenerCuentasComponente = () => {
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
    correo: ''
  });
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    obtenerCuentas();
  }, []);

  const obtenerCuentas = async () => {
    try {
      const request = {
        action: 'obtenerCuentas',
        query: 'personal'
      };

      const response = await window.api.user(request);

      if (response.status === 200 && response.data) {
        setCuentas(response.data);
      } else {
        console.error('Error al obtener cuentas:', response);
      }
    } catch (error) {
      console.error('Error al realizar la petición:', error);
    }
  };

  const handleEditar = (index: number) => {
    setEditIndex(index);
    const cuenta = cuentas[index];
    setFormData({
      _id: cuenta._id,
      user: cuenta.user,
      password: cuenta.password,
      cargo: cuenta.cargo,
      correo: cuenta.correo
    });
    setShowEditarModal(true);
  };

  const handleEliminar = async (index: number) => {
    try {
      setShowEliminarModal(true); // Muestra el modal de eliminación
      setDeleteIndex(index); // Establece el índice de eliminación en el estado
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
    }
  };
  
  const confirmarEliminar = async () => {
    try {
      if (deleteIndex !== null) {
        const cuenta = cuentas[deleteIndex];
        await window.api.user({ action: 'eliminarCuenta', id: cuenta._id, query: 'personal' });
        obtenerCuentas(); // Actualiza la lista de cuentas después de eliminar
        setShowEliminarModal(false); // Cierra el modal de eliminación
      }
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
    }
  };
  

  const handleSaveChanges = async () => {
    try {
      setShowEditarModal(false);
      await window.api.user({ action: 'editarCuenta', formData });
      obtenerCuentas();
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };


  return (
    <div >
      <h2 className="text-2xl font-bold mb-4">Cuentas</h2>
      <div className="w-full max-w-md mb-4 relative ">
        <input
          type="text"
          placeholder="Buscar..."
          className="p-2 border rounded-md w-full "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Nombre de Usuario</th>
              <th className="py-2 px-4">Contraseña</th>
              <th className="py-2 px-4">Cargo</th>
              <th className="py-2 px-4">Correo</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
          {cuentas
  .filter(cuenta =>
    Object.values(cuenta)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )
  .map((cuenta, index) => (
    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
      <td className="py-2 px-4">{cuenta.user}</td>
      <td className="py-2 px-4">{cuenta.password}</td>
      <td className="py-2 px-4">{cuenta.cargo}</td>
      <td className="py-2 px-4">{cuenta.correo}</td>
      <td className="py-2 px-4 flex justify-center items-center">
        <FontAwesomeIcon icon={faEdit} className="text-blue-500 cursor-pointer hover:text-blue-700 mr-2" onClick={() => handleEditar(index)} />
        <FontAwesomeIcon 
  icon={faTrashAlt} 
  className="text-red-500 cursor-pointer hover:text-red-700" 
  onClick={() => handleEliminar(index)} // Pasa la función handleEliminar directamente
/>

      </td>
    </tr>
  ))}
          </tbody>
        </table>
      </div>

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
                <input type="text" id="user" className="input-field" value={formData.user} onChange={(e) => setFormData({ ...formData, user: e.target.value })} />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="text" id="password" className="input-field" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              </div>
              <div>
                <label htmlFor="cargo" className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                <input type="text" id="cargo" className="input-field" value={formData.cargo} onChange={(e) => setFormData({ ...formData, cargo: e.target.value })} />
              </div>
              <div>
                <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
                <input type="email" id="correo" className="input-field" value={formData.correo} onChange={(e) => setFormData({ ...formData, correo: e.target.value })} />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSaveChanges}>Guardar Cambios</button>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => setShowEditarModal(false)}>Cancelar</button>
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
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
  onClick={confirmarEliminar}>
  Eliminar
</button>


                  <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                    onClick={() => setShowEliminarModal(false)}>
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