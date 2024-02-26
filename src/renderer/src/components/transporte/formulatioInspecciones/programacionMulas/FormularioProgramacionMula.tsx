/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { themeContext } from '@renderer/App';
import { faTruck, faIdCard, faUser, faMobileAlt, faPalette, faCar, faBoxes, faUserTie, faAnchor, faBuilding } from '@fortawesome/free-solid-svg-icons';

type Contenedor = {
  _id: number;
  numeroContenedor: string
  infoContenedor: {
    clienteInfo: {
      _id:string
      CLIENTE:string
    };
  };
};

type EstadoInicial = {
  placa: string;
  trailer: string;
  conductor: string;
  cedula: string;
  celular: string;
  color: string;
  modelo: string;
  marca: string;
  contenedor: string;
  prof: string;
  puerto: string;
  naviera: string;
  agenciaAduanas: string;
  successMessage: string;
  errorMessage: string;
  contenedores: Contenedor[];
};

const generarEstadoInicial = (): EstadoInicial => ({
  placa: '',
  trailer: '',
  conductor: '',
  cedula: '',
  celular: '',
  color: '',
  modelo: '',
  marca: '',
  contenedor: '',
  prof: '',
  puerto: '',
  naviera: '',
  agenciaAduanas: '',
  successMessage: '',
  errorMessage: '',
  contenedores: [],
});

const FormularioMulas: React.FC = () => {
  const [state, setState] = useState<EstadoInicial>(generarEstadoInicial);
  const theme = useContext(themeContext)

  useEffect(() => {
    console.log('Estado después de la actualización:', state);
  }, [state]); // Ejecutar este efecto cada vez que "state" cambie

  useEffect(() => {
    const obtenerContenedores = async (): Promise<void> => {
      try {
        const request = {
          data:{
            query:{formularioInspeccionMula:{ $exists : false}},
            select :{},
            sort:{"infoContenedor.fechaCreacion": -1},
            limit:50,
            populate:{
              path: 'infoContenedor.clienteInfo',
              select: 'CLIENTE'
            },
          },
          collection:'contenedores',
          action: 'getContenedores',
          query: 'proceso'
        };

        const response = await window.api.server(request);

        if (response.status === 200 && response.data) {
          setState((prev) => ({ ...prev, contenedores: response.data }));
        } else {
          console.error('Error al obtener la lista de contenedores:', response);
        }
      } catch (error) {
        console.error('Error al realizar la petición:', error);
      }
    };

    obtenerContenedores();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaste: React.ClipboardEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const parsedData = pastedData.split('\t');

    if (parsedData.length >= 6) {
      setState((prev) => ({
        ...prev,
        cnt: parsedData[0] || '',
        prof: parsedData[1] || '',
        cliente: parsedData[2] || '',
        puerto: parsedData[3] || '',
        naviera: parsedData[4] || '',
        agenciaAduanas: parsedData[5] || '',
      }));
    }
  };

  const enviarDatosMulas = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
  
    try {
      const request = {
        query: 'proceso',
        collection:'contenedores',
        action: 'putContenedor',
        data: {
            contenedor:{
              _id: state.contenedor,
              formularioInspeccionMula:{
                placa: state.placa,
                trailer: state.trailer,
                conductor: state.conductor,
                cedula: state.cedula,
                celular: state.celular,
                color: state.color,
                modelo: state.modelo,
                marca: state.marca,
                contenedor: state.contenedor,
                prof: state.prof,
                puerto: state.puerto,
                naviera: state.naviera,
                agenciaAduanas: state.agenciaAduanas,
              }
            }
         
        },
      };
  
      const response = await window.api.server(request);
  
      console.log('Respuesta del servidor:', response);
  
      setState(prevState => ({
        ...prevState,
        successMessage: 'Datos enviados con éxito',
      }));
  
      // Limpiar los campos después de enviar los datos
      limpiarCampos();
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };  
  
  const limpiarCampos = (): void => {
    setState((prevState) => ({
      ...prevState,
      placa: '',
      trailer: '',
      conductor: '',
      cedula: '',
      celular: '',
      color: '',
      modelo: '',
      marca: '',
      contenedor: '',
      prof: '',
      cliente: '',
      puerto: '',
      naviera: '',
      agenciaAduanas: '',
      successMessage: '',
      errorMessage: '',
    }));
  };
  
  const handleContenedorChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = e.target;
    setState((prev) => ({ ...prev, contenedor: value }));
  };

  return (
    <div className={`${theme === 'Dark' ? 'bg-slate-700 text-white' : 'bg-white'} max-w-4xl mx-auto p-8 rounded-md shadow-md`}> 
      <h2 className="text-3xl font-bold mb-6 text-center">Programación Tractomula</h2>
      <form onSubmit={enviarDatosMulas} onPaste={handlePaste} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2 mb-4 grid grid-cols-4 gap-6">
          <div className={`${theme === 'Dark' ? 'bg-slate-750 text-white' : 'bg-white'}`}>
            <label className="block font-bold mb-2">
              <FontAwesomeIcon icon={faTruck} className="mr-2" />
              Placa:
            </label>
            <input
              type="text"
              name="placa"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              value={state.placa}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={`${theme === 'Dark' ? 'bg-slate-750 text-white' : 'bg-white'}`}>
            <label className="block font-bold mb-2">
              <FontAwesomeIcon icon={faTruck} className="mr-2" />
              Trailer:
            </label>
            <input
              type="text"
              name="trailer"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              value={state.trailer}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={`${theme === 'Dark' ? 'bg-slate-750 text-white' : 'bg-white'}`}>
            <label className="block font-bold mb-2">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Conductor:
            </label>
            <input
              type="text"
              name="conductor"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              value={state.conductor}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={`${theme === 'Dark' ? 'bg-slate-750 text-white' : 'bg-white'}`}>
            <label className="block font-bold mb-2">
              <FontAwesomeIcon icon={faIdCard} className="mr-2" />
              Cedula:
            </label>
            <input
              type="text"
              name="cedula"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              value={state.cedula}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-span-2 mb-4 grid grid-cols-4 gap-6">
          <div className={`${theme === 'Dark' ? 'bg-slate-750 text-white' : 'bg-white'}`}>
            <label className="block font-bold mb-2">
              <FontAwesomeIcon icon={faMobileAlt} className="mr-2" />
              Celular:
            </label>
            <input
              type="text"
              name="celular"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              value={state.celular}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={`${theme === 'Dark' ? 'bg-slate-750 text-white' : 'bg-white'}`}>
            <label className="block font-bold mb-2">
              <FontAwesomeIcon icon={faPalette} className="mr-2" />
              Color:
            </label>
            <input
              type="text"
              name="color"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              value={state.color}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={`${theme === 'Dark' ? 'bg-slate-750 text-white' : 'bg-white'}`}>
            <label className="block font-bold mb-2">
              <FontAwesomeIcon icon={faCar} className="mr-2" />
              Modelo:
            </label>
            <input
              type="text"
              name="modelo"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              value={state.modelo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={`${theme === 'Dark' ? 'bg-slate-750 text-white' : 'bg-white'}`}>
            <label className="block font-bold mb-2">
              <FontAwesomeIcon icon={faBoxes} className="mr-2" />
              Marca:
            </label>
            <input
              type="text"
              name="marca"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              value={state.marca}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-span-2 mb-4 grid grid-cols-4 gap-6">
        <div className={`${theme === 'Dark' ? 'bg-slate-750 text-white' : 'bg-white'}mb-4 w-full`}>
  <label className={`${theme === 'Dark' ? 'bg-slate-750 text-white' : 'bg-white'} block font-bold mb-2 w-full`}>
    <i className="fas fa-box mr-2"></i>Contenedor:
  </label>
  <select
    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
    value={state.contenedor} // Actualizar a "contenedor" en lugar de "numContenedor"
    onChange={(e): void => handleContenedorChange(e)} // Pasar el evento completo en lugar del valor directamente
    required
  >
    <option value="">Seleccione...</option>
    {state.contenedores.map(contenedorData => ( // Usar state.contenedores directamente y eliminar el Object.values()
      <option key={contenedorData._id} value={contenedorData._id}>
        {`${contenedorData.numeroContenedor} - ${contenedorData.infoContenedor.clienteInfo.CLIENTE}`}
      </option>
    ))}
  </select>
</div>

          <div  className={`${theme === 'Dark' ? 'bg-slate-750 text-white' : 'bg-white'}`}>
            <label className="block font-bold mb-2">
              <FontAwesomeIcon icon={faUserTie} className="mr-2" />
              Prof:
            </label>
            <input
              type="text"
              name="prof"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              value={state.prof}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={`${theme === 'Dark' ? 'bg-slate-750 text-white' : 'bg-white'}`}>
            <label className="block font-bold mb-2">
              <FontAwesomeIcon icon={faAnchor} className="mr-2" />
              Puerto: 
            </label>
            <input
              type="text"
              name="puerto"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              value={state.puerto}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-span-2 mb-4 grid grid-cols-4 gap-6">
          <div className={`${theme === 'Dark' ? 'bg-slate-750 text-white' : 'bg-white'}`}>
            <label className="block font-bold mb-2">
              <FontAwesomeIcon icon={faBuilding} className="mr-2" />
              Naviera:
            </label>
            <input
              type="text"
              name="naviera"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              value={state.naviera}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={`${theme === 'Dark' ? 'bg-slate-750 text-white' : 'bg-white'}`}>
            <label className="block font-bold mb-2">
              <FontAwesomeIcon icon={faBuilding} className="mr-2" />
              Agencia de Aduanas:
            </label>
            <input
              type="text"
              name="agenciaAduanas"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              value={state.agenciaAduanas}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-span-2">
        <button
    type="submit"
    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
>
    Enviar
</button>

        </div>
      </form>
    </div>
  );
};
export default FormularioMulas;