import ErrorModal from "@renderer/errors/modal/ErrorModal";
import SuccessModal from "@renderer/errors/modal/SuccessModal";
import { useContext, useEffect, useState } from "react";
import { contenedoresType } from "./type/types";
import { themeContext } from "@renderer/App";
import TableContenedores from "./tables/TableContenedores";

export default function Contenedores(): JSX.Element {
  const theme = useContext(themeContext);
  const [data, setData] = useState<contenedoresType[]>([]);
  const [clientes, setClientes] = useState<string[]>([]);
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [filtroContenedor, setFiltroContenedor] = useState<string>('');
  const [filtroTipoFruta, setFiltroTipoFruta] = useState<string>('');
  const [filtroCliente, setFiltroCliente] = useState<string>('');
  const [tipoFechaFiltrar, setTipoFechaFiltrar] = useState<string>('');
  const [filtroFechaEntrada, setFiltroFechaEntrada] = useState<Date | null>(null);
  const [filtroFechaSalida, setFiltroFechaSalida] = useState<Date | null>(null);
  const [filtroFechaFinalizado, setFiltroFechaFinalizado] = useState<Date | null>(null);
  const [cantidadMostrar, setCantidadMostrar] = useState<number>(50);

  const reiniciarFiltroFecha = () => {
    setFiltroFechaEntrada(null);
    setFiltroFechaSalida(null);
    setFiltroFechaFinalizado(null);
  };

  useEffect(() => {
    const obtenerDataContenedor = async (): Promise<void> => {
      try {
        const formattedFechaEntrada = filtroFechaEntrada ? filtroFechaEntrada.toISOString() : null;
        const formattedFechaSalida = filtroFechaSalida ? filtroFechaSalida.toISOString() : null;
  
        const request = {
          action: 'ObtenerInfoContenedoresCelifrut',
          filtro: {
            contenedor: filtroContenedor,
            tipoFruta: filtroTipoFruta,
            cliente: filtroCliente,
            fecha: {
              entrada: formattedFechaEntrada,
              salida: formattedFechaSalida,
              finalizado: filtroFechaFinalizado ? filtroFechaFinalizado.toISOString() : null,
            },
            cantidad: cantidadMostrar
          },
        };
        const response = await window.api.contenedores(request);
        console.log(response.data)
        if (response.status === 200) {
          setData(response.data);
          const clientesArray = response.data.map(contenedor => contenedor.infoContenedor.nombreCliente);
          setClientes(Array.from(new Set(clientesArray)));
          
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
          }, 5000);
        } else {
          setShowError(true);
          setMessage("Error obteniendo los datos del servidor");
          setTimeout(() => {
            setShowError(false);
          }, 5000);
        }
      } catch (e) {
        if (e instanceof Error) {
          setShowError(true);
          setMessage(e.message);
          setTimeout(() => {
            setShowError(false);
          }, 5000);
        }
      }
    };
  
    obtenerDataContenedor();
  }, [filtroContenedor, filtroTipoFruta, filtroFechaEntrada, filtroCliente, filtroFechaSalida, filtroFechaFinalizado, cantidadMostrar]);

  const closeModal = (): void => {
    setShowError(false);
    setShowSuccess(false);
  };

  return (
    <div className="p-2">
      <div className={`${theme === 'Dark' ? 'bg-gray-500' : 'bg-gray-200'} p-3 rounded-lg shadow-lg`}>
        <div className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-2xl font-bold transition-all border-b-2 duration-500 ease-in-out hover:text-Celifrut-green hover:border-b-2 hover:border-Celifrut-green`}>
          <h2>Contenedores</h2>
        </div>
      </div>
      <div className={`${theme === 'Dark' ? 'bg-slate-700' : 'bg-white'} mt-4 p-4  rounded-lg shadow-lg`}>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="flex flex-col">
            <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm mb-1`}>Contenedor:</label>
            <input
              type="text"
              placeholder="Filtrar por contenedor"
              value={filtroContenedor}
              onChange={(e) => setFiltroContenedor(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm mb-1`}>Tipo de Fruta:</label>
            <select
              value={filtroTipoFruta}
              onChange={(e) => setFiltroTipoFruta(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Seleccionar Tipo de Fruta</option>
              <option value="Naranja">Naranja</option>
              <option value="Limon">Limon</option>
              <option value="Mixto">Mixto</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm mb-1`}>Cliente:</label>
            <select
              value={filtroCliente}
              onChange={(e) => setFiltroCliente(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Seleccionar Cliente</option>
              {clientes.map((cliente, index) => (
                <option key={index} value={cliente}>{cliente}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm mb-1`}>Fechas:</label>
            <select
              value={tipoFechaFiltrar}
              onChange={(e) => {
                setTipoFechaFiltrar(e.target.value);
                reiniciarFiltroFecha();
              }}
              className="border p-2 rounded"
            >
              <option value="">Seleccionar Tipo de Fecha</option>
              <option value="creacion">Fecha de Creación</option>
              <option value="salida">Fecha de Salida</option>
              <option value="finalizado">Fecha Finalizado</option>
            </select>
          </div>
          {tipoFechaFiltrar && (
            <div className="flex flex-col">
              <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm mb-1`}>{`Fecha ${tipoFechaFiltrar === 'finalizado' ? 'de Finalizado' : tipoFechaFiltrar === 'creacion' ? 'de Creación' : 'de Salida'}:`}</label>
              <input
                type="date"
                value={
                  tipoFechaFiltrar === 'finalizado' ? (filtroFechaFinalizado ? filtroFechaFinalizado.toISOString().split('T')[0] : '') :
                  tipoFechaFiltrar === 'creacion' ? (filtroFechaEntrada ? filtroFechaEntrada.toISOString().split('T')[1] : '') :
                  tipoFechaFiltrar === 'salida' ? (filtroFechaSalida ? filtroFechaSalida.toISOString().split('T')[0] : '') : ''
                }
                onChange={(e) => {
                  const dateValue = e.target.value ? new Date(e.target.value) : null;
                  switch (tipoFechaFiltrar) {
                    case 'creacion':
                      setFiltroFechaEntrada(dateValue);
                      break;
                    case 'salida':
                      setFiltroFechaSalida(dateValue);
                      break;
                    case 'finalizado':
                      setFiltroFechaFinalizado(dateValue);
                      break;
                    default:
                      break;
                  }
                }}
                className="border p-2 rounded"
              />
            </div>
          )}
          <div className="flex flex-col">
            <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm mb-1`}>Cantidad a Mostrar:</label>
            <input
              type="number"
              value={cantidadMostrar}
              onChange={(e) => setCantidadMostrar(Number(e.target.value))}
              className="border p-2 rounded"
            />
          </div>
        </div>
      </div>
      <TableContenedores
        data={data}
        filtroContenedor={filtroContenedor}
        filtroTipoFruta={filtroTipoFruta}
        filtroCliente={filtroCliente}
        filtroFechaEntrada={filtroFechaEntrada}
        filtroFechaSalida={filtroFechaSalida}
        filtroFechaFinalizado={filtroFechaFinalizado}
        cantidadMostrar={cantidadMostrar}
        clientes={clientes}
      />
      <div className='fixed bottom-0 right-0 flex items-center justify-center'>
        {showError && <ErrorModal message={message} closeModal={closeModal} theme={theme} />}
        {showSuccess && <SuccessModal message="Datos obtenidos exitosamente" closeModal={closeModal} theme={theme} />}
      </div>
    </div>
  );
}