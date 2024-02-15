import React, { useState, useEffect, useRef, useContext } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { themeContext } from '@renderer/App';

type Criterio = {
  type?: 'titulo';
  value?: string;
  nombre?: string;
  cumplimiento?: string;
  observaciones?: string;
};

type Contenedor = {
  _id: string;
  infoContenedor: {
    nombreCliente: string;
  };
  formularioInspeccionMula?: {
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
    cliente: string;
    puerto: string;
    naviera: string;
    agenciaAduanas: string;
  };
};

type EstadoInicial = {
  contenedores: Contenedor[];
  contenedorSeleccionado: null | Contenedor;
  numContenedor: string;
  criterios: Criterio[];
  cumpleRequisitos: string;
  successMessage: string;
  errorMessage: string;
};

const generarEstadoInicial: EstadoInicial = {
  contenedores: [],
  contenedorSeleccionado: null,
  numContenedor: '',
  criterios: [
    { type: 'titulo', value: 'Criterios de Inspección - Unidad de Enfriamiento' },
    { nombre: 'La unidad de enfriamiento está funcionando adecuadamente.', cumplimiento: '', observaciones: '' },
    { nombre: 'El equipo de refrigeración tiene la temperatura adecuada para proceder a realizar el cargue.', cumplimiento: '', observaciones: '' },
    { type: 'titulo', value: 'Criterios de Inspección - FURGÓN' },
    { nombre: 'El vehículo cuenta con talanquera para el aseguramiento de los pallets.', cumplimiento: '', observaciones: '' },
    { nombre: 'Se verificó que el furgón no tiene rupturas, daños y/o enmendaduras.', cumplimiento: '', observaciones: '' },
    { nombre: 'Los sellos de las puertas, conductos de aire y paredes laterales están en buenas condiciones.', cumplimiento: '', observaciones: '' },
    { nombre: 'Las superficies internas del furgón (pisos, paredes, puertas y techos) están fabricadas de materiales fáciles de limpiar, lavar y desinfectar', cumplimiento: '', observaciones: '' },
    { nombre: 'Se verifica la inexistencia de reparaciones recientes, pegamentos y/o soldaduras inapropiadas.', cumplimiento: '', observaciones: '' },
    { nombre: 'Se observa que se ha aplicado correctamente procedimientos de limpieza y desinfección previos a la carga', cumplimiento: '', observaciones: '' },
    { nombre: 'El vehículo se encuentra libre de plagas', cumplimiento: '', observaciones: '' },
    { nombre: 'El vehículo se encuentra libre de olores extraños o desagradables', cumplimiento: '', observaciones: '' },
    { nombre: 'El vehículo se encuentra libre de otros insumos u objetos diferentes a la carga principal', cumplimiento: '', observaciones: '' },
    { nombre: 'El vehículo cumple con las medidas adecuadas (ancho, largo y alto), para el correcto cargue del producto.', cumplimiento: '', observaciones: '' },
    { type: 'titulo', value: 'Criterios de Inspección - Documentación' },
    { nombre: 'La documentación presentada por el conductor corresponde a la del vehículo', cumplimiento: '', observaciones: '' },
    { nombre: 'Se reconoció debidamente el vehículo, la identificación del conductor y se verificó la coincidencia con el Manifiesto de Carga enviado por la empresa de transporte', cumplimiento: '', observaciones: '' },
  ],
  cumpleRequisitos: '',
  successMessage: '',
  errorMessage: '',
};

const FormularioMulas: React.FC = () => {
  const [state, setState] = useState<EstadoInicial>(generarEstadoInicial);
  const theme = useContext(themeContext);

  const formRef = useRef<HTMLFormElement>(null);

  const getHistorialDesdeLocalStorage = (campo: string): string[] => {
    const historial = localStorage.getItem(`${campo}Historial`);
    return historial ? JSON.parse(historial) : [];
  };

  const setHistorialEnLocalStorage = (campo: string, historial): void => {
    localStorage.setItem(`${campo}Historial`, JSON.stringify(historial));
  };

  const [isLoading, setIsLoading] = useState(false);
  const [, setErrorMessage] = useState<string>('');
  const [responsable, setResponsable] = useState('');
  const [, setSuccessMessage] = useState<string>('');
  const [responsableHistory] = useState<string[]>(getHistorialDesdeLocalStorage('responsable'));

  useEffect(() => {
    const obtenerNumeroContenedor = async (): Promise<void> => {
      try {
        const request = {
          action: 'obtenerDataContenedorFormularioInspeccionMulas',
        };

        const response = await window.api.contenedores(request);

        if (response.status === 200 && response.data) {
          setState((prev) => ({ ...prev, contenedores: response.data }));
        } else {
          console.error('Error al obtener la lista de contenedores:', response);
        }
      } catch (error) {
        console.error('Error al realizar la petición:', error);
      }
    };

    obtenerNumeroContenedor();
  }, []);

  const MAX_HISTORIAL_LENGTH = 10;

  const handleBlur = (campo: string, value: string): void => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      const historial = getHistorialDesdeLocalStorage(campo);

      // Filtrar para asegurarse de que solo se almacenen nombres completos
      const fullNames = historial.filter((item) => item === trimmedValue || item.startsWith(trimmedValue + ' '));

      // Agregar el nuevo nombre al historial existente
      const updatedHistorial = [...new Set([...fullNames, trimmedValue])];

      // Tomar los últimos 3 elementos del historial
      const slicedHistorial = updatedHistorial.slice(-MAX_HISTORIAL_LENGTH);

      // Actualizar el historial en el almacenamiento local
      setHistorialEnLocalStorage(campo, slicedHistorial);
    }
  };

  const handleCriterioChange = (index: number, cumplimiento: 'C' | 'NC'): void => {
    setState((prev) => {
      const nuevosCriterios = [...prev.criterios];
      nuevosCriterios[index].cumplimiento = cumplimiento;
      return { ...prev, criterios: nuevosCriterios };
    });
  };

  const handleObservacionesChange = (index: number, observaciones: string): void => {
    setState((prev) => {
      const nuevosCriterios = [...prev.criterios];
      nuevosCriterios[index].observaciones = observaciones;
      return { ...prev, criterios: nuevosCriterios };
    });
  };

  const handleCumpleRequisitosChange = (value: string): void => {
    setState((prev) => ({ ...prev, cumpleRequisitos: value }));
  };
  
  const handleContenedorChange = (contenedorId: string): void => {
    console.log("Contenedor ID seleccionado:", contenedorId);
  
    // Convierte contenedorId a número
    const idSeleccionado = parseInt(contenedorId, 10);
  
    console.log("IDs de los contenedores:", state.contenedores.map(contenedor => contenedor._id));
  
    if (state.contenedores.length > 0) {
      const contenedorSeleccionado = state.contenedores.find((contenedor) => parseInt(contenedor._id, 10) === idSeleccionado);
      
      console.log("Contenedor seleccionado:", contenedorSeleccionado);
      
      if (contenedorSeleccionado) {
        setState((prev) => ({
          ...prev,
          numContenedor: contenedorId,
          contenedorSeleccionado: contenedorSeleccionado,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          numContenedor: contenedorId,
          contenedorSeleccionado: null,
        }));
      }
    }
  };
  
  const resetearFormulario = (): void => {
    setState(generarEstadoInicial);
    setResponsable(''); // Resetear el campo "Responsable"
  };

  const handleEnviarYResetear = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (
      !state.criterios
        .filter((criterio) => criterio.type !== 'titulo')
        .every(
          (criterio) =>
            criterio.cumplimiento !== undefined &&
            (criterio.observaciones !== undefined)
        ) ||
      !state.numContenedor ||
      !responsable
    ) {
      const errorMsg = 'Por favor, complete todos los campos obligatorios.';
      console.error(errorMsg);
      setErrorMessage(errorMsg);
      setSuccessMessage('');

      formRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    try {
      setIsLoading(true);

      const criteriosSinTitulos = state.criterios.filter((criterio) => criterio.type !== 'titulo');
      const fecha = new Date();

      handleBlur('responsable', responsable);

      const enviarDatosResponse = await enviarDatosAlServidor({
        action: 'enviarDatosFormularioInspeccionMulas',
        data: {
          numContenedor: state.numContenedor,
          criterios: criteriosSinTitulos,
          cumpleRequisitos: state.cumpleRequisitos,
          responsable: responsable, // Agregar responsable aquí
          fecha: fecha.toISOString(), // Convertir a formato ISO para enviar al servidor
        },
      });

      if (enviarDatosResponse.status === 'success') {
        // Actualizar el estado con los nuevos contenedores
        const obtenerContenedoresResponse = await window.api.contenedores({
          action: 'obtenerDataContenedorFormularioInspeccionMulas',
        });

        if (obtenerContenedoresResponse.status === 200 && obtenerContenedoresResponse.data) {
          // Esperar 500 milisegundos antes de resetear el formulario
          setTimeout(() => {
            setSuccessMessage('');
            resetearFormulario();
            formRef.current?.querySelector('input')?.focus();
            setState((prev) => ({ ...prev, contenedores: obtenerContenedoresResponse.data }));
          }, 500);
        } else {
          console.error('Error al obtener la lista de contenedores:', obtenerContenedoresResponse);
        }

        setSuccessMessage('¡Datos enviados con éxito!');
        setErrorMessage('');
      } else {
        console.error('Error en la respuesta del servidor:', enviarDatosResponse);
        setErrorMessage('Hubo un error al enviar los datos. Por favor, inténtelo de nuevo.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
      setErrorMessage('Hubo un error al enviar los datos. Por favor, inténtelo de nuevo.');
      setSuccessMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  const enviarDatosAlServidor = async (datos): Promise<{ status: string, message: string, data?: string }> => {
    try {
      const response = await window.api.contenedores(datos);
      const success = response.status === 200 && response.response === 'success';

      if (success) {
        return { status: 'success', message: response.response, data: response.data }; // Ajusta según tu respuesta real
      } else {
        return { status: 'error', message: response.response || 'Hubo un error en el servidor.' };
      }
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
      return { status: 'error', message: 'Hubo un error en la conexión con el servidor.' };
    }
  };

  return (
    <div className={`${theme === 'Dark' ? 'bg-slate-700 text-white' : 'bg-white'} max-w-3xl mx-auto p-8 rounded-md shadow-md h-max`}>
      <h2 className="text-3xl font-bold mb-6 text-center">Formulario de Inspección</h2>
      <form ref={formRef} onSubmit={handleEnviarYResetear} className={`${theme === 'Dark' ? 'bg-slate-700 text-white' : 'bg-white'} grid grid-cols-2 md:grid-cols-2 gap-6`}>
        <div className={`${theme === 'Dark' ? 'bg-slate-700 text-white' : 'bg-white'} mb-4 w-full`}>
          <label className="block font-bold mb-2">
            <i className="fas fa-user-tie mr-2"></i> Responsable:
          </label>
          <div className="relative">
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              value={responsable}
              onChange={(e): void => setResponsable(e.target.value)}
              list="responsable-suggestions"
              required
            />
            <datalist id="responsable-suggestions" className="absolute z-10 bg-white border rounded-md mt-1">
              {responsableHistory.map((item, index) => (
                <option key={index} value={item} className="py-1 px-3 hover:bg-blue-200 cursor-pointer" />
              ))}
            </datalist>
          </div>
        </div>
        <div className="mb-4 w-full">
          <label className="block font-bold mb-2 w-full">
            <i className="fas fa-box mr-2"></i> Número de Contenedor:
          </label>
          <select
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
          value={state.numContenedor}
          onChange={(e): void => handleContenedorChange(e.target.value)}
          required
        >
          <option value="">Seleccione...</option>
          {state.contenedores.map((contenedorData) => (
            <option key={contenedorData._id} value={contenedorData._id}>
              {`${contenedorData._id} - ${contenedorData.infoContenedor.nombreCliente}`}
            </option>
          ))}
        </select>
      </div>

      {state.contenedorSeleccionado && (
        <div className="md:col-span-2 mb-4 w-full">
          <label className="block font-bold mb-2">
            <i className="fas fa-address-card mr-2"></i> Información del Contenedor:
          </label>
          <div className={`${theme === 'Dark' ? 'bg-slate-700 text-white' : 'bg-white'} p-4 rounded-md shadow-md`}>
          {state.contenedorSeleccionado && state.contenedorSeleccionado.formularioInspeccionMula && (
              <>
                <p><strong>Placa:</strong> {state.contenedorSeleccionado.formularioInspeccionMula.placa}</p>
                <p><strong>Trailer:</strong> {state.contenedorSeleccionado.formularioInspeccionMula.trailer}</p>
                <p><strong>Conductor:</strong> {state.contenedorSeleccionado.formularioInspeccionMula.conductor}</p>
                <p><strong>Cédula:</strong> {state.contenedorSeleccionado.formularioInspeccionMula.cedula}</p>
                <p><strong>Celular:</strong> {state.contenedorSeleccionado.formularioInspeccionMula.celular}</p>
                <p><strong>Color:</strong> {state.contenedorSeleccionado.formularioInspeccionMula.color}</p>
                <p><strong>Modelo:</strong> {state.contenedorSeleccionado.formularioInspeccionMula.modelo}</p>
                <p><strong>Marca:</strong> {state.contenedorSeleccionado.formularioInspeccionMula.marca}</p>
              </>
            )}
          </div>
        </div>
      )}

        {state.criterios.map((criterio, index) =>
          criterio.type === 'titulo' ? (
            <h3 key={index} className="col-span-2 text-xl font-bold mt-8">{criterio.value}</h3>
          ) : (
            <div key={index} className={`${theme === 'Dark' ? 'bg-slate-800' : 'bg-gray-200'} rounded-md p-4 mb-4`}>
              <p className="mb-2 font-bold">{criterio.nombre}</p>
              <div className="flex items-center mb-4">
                <label className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    className="form-radio text-blue-500"
                    name={`cumplimiento-${index}`}
                    value="C"
                    checked={criterio.cumplimiento === 'C'}
                    onChange={(e): void => handleCriterioChange(index, e.target.value as 'C' | 'NC')}
                    required
                  />
                  <span className="ml-2">C</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-red-500"
                    name={`cumplimiento-${index}`}
                    value="NC"
                    checked={criterio.cumplimiento === 'NC'}
                    onChange={(e): void => handleCriterioChange(index, e.target.value as 'C' | 'NC')}
                  />
                  <span className="ml-2">NC</span>
                </label>
              </div>
              <textarea
                className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500"
                rows={3}
                placeholder="Observaciones"
                value={criterio.observaciones || ''}
                onChange={(e): void => handleObservacionesChange(index, e.target.value)}
              ></textarea>
            </div>
          )
        )}
        <div className="col-span-2">
          <label className="block font-bold mb-2">
            <i className="fas fa-check-circle mr-2"></i> ¿Cumple con los requisitos para aprobar el cargue?
          </label>
          <div className="flex items-center mb-4">
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                className="form-radio text-blue-500"
                name="cumpleRequisitos"
                value="Sí"
                checked={state.cumpleRequisitos === 'Sí'}
                onChange={(e): void => handleCumpleRequisitosChange(e.target.value)}
                required
              />
              <span className="ml-2">Sí</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-red-500"
                name="cumpleRequisitos"
                value="No"
                checked={state.cumpleRequisitos === 'No'}
                onChange={(e): void => handleCumpleRequisitosChange(e.target.value)}
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>
        <div className="col-span-2 text-center">
          <button
            type="submit"
            className={`inline-block w-full px-4 py-2 leading-5 rounded-md ${theme === 'Dark' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'} font-semibold transition duration-200 focus:outline-none focus:shadow-outline`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                Enviando...
              </>
            ) : (
              'Enviar'
            )}
          </button>
          {state.successMessage && <p className="text-green-500 mt-2">{state.successMessage}</p>}
          {state.errorMessage && <p className="text-red-500 mt-2">{state.errorMessage}</p>}
        </div>
      </form>
    </div>
  );
};
export default FormularioMulas;