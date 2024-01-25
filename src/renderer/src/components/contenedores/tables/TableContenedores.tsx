import { themeContext } from "@renderer/App";
import { useContext } from "react";
import { contenedoresType } from "../type/types";
import { format } from "date-fns";
import { FcOk } from 'react-icons/fc';
import { FcCancel } from 'react-icons/fc';
import { FaFileAlt } from 'react-icons/fa';

type propsType = {
  data: contenedoresType[];
  filtroContenedor: string;
  filtroTipoFruta: string;
  filtroCliente: string;
  filtroFechaEntrada: Date | null;
  filtroFechaSalida: Date | null;
  filtroFechaFinalizado: Date | null;
  clientes: string[];
  cantidadMostrar: number;
}

export default function TableContenedores(props: propsType): JSX.Element {
  const theme = useContext(themeContext);

  const formatFecha = (fecha: string | null | undefined): string => {
    return fecha ? format(new Date(fecha), 'dd-MM-yyyy') : '';
  };

  const datosFiltrados = props.data
    .filter((_, index) => index < props.cantidadMostrar)  
    .filter(contenedor => {
      return (
        contenedor._id.toString().includes(props.filtroContenedor) &&
        contenedor.infoContenedor.tipoFruta.includes(props.filtroTipoFruta) &&
        contenedor.infoContenedor.nombreCliente.includes(props.filtroCliente) &&
        (!props.filtroFechaEntrada || new Date(contenedor.infoContenedor.fechaCreacion) >= (props.filtroFechaEntrada as Date)) &&
        (!props.filtroFechaSalida || new Date(contenedor.infoContenedor.fechaSalida) <= (props.filtroFechaSalida as Date)) &&
        (!props.filtroFechaFinalizado || new Date(contenedor.infoContenedor.fechaFinalizado) === (props.filtroFechaFinalizado as Date))
      );
    });

  return (
    <div>
      <table className={`mr-2 ml-2 w-full mt-4 border-2 table-fixed`}>
        <thead className={`${theme === 'Dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
          <tr className="h-14 broder-2">
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Contenedor</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Cliente</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Fecha de creación</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Fecha de salida</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Fecha de finalizado</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Tipo de fruta</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Informe</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Cerrado</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Desverdizado</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(datosFiltrados) && datosFiltrados.map((contenedor, index) => (
            <tr
              className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`} key={index}
            >
              <td className="p-2 text-sm  text-center">{contenedor._id}</td>
              <td className="p-2 text-sm  text-center">{contenedor.infoContenedor.nombreCliente}</td>
              <td className="p-2 text-sm  text-center">{formatFecha(contenedor.infoContenedor.fechaCreacion)}</td>
              <td className="p-2 text-sm  text-center">{formatFecha(contenedor.infoContenedor.fechaFinalizado)}</td>
              <td className="p-2 text-sm  text-center">{formatFecha(contenedor.infoContenedor.fechaSalida)}</td>
              <td className="p-2 text-sm  text-center">{contenedor.infoContenedor.tipoFruta}</td>
              <td className="p-2 text-sm  text-center">
                <div className="flex justify-center items-center">
                  {contenedor.infoContenedor.urlInforme ? (
                    <a href={contenedor.infoContenedor.urlInforme} target="_blank" rel="noopener noreferrer">
                      <FaFileAlt color="blue" />
                    </a>
                  ) : (
                    <FcCancel />
                  )}
                </div>
              </td>
              <td className="p-2 text-sm"><div className="flex justify-center items-center">{contenedor.infoContenedor.cerrado ? <FcOk /> : <FcCancel />}</div></td>
              <td className="p-2 text-sm"><div className="flex justify-center items-center">{contenedor.infoContenedor.desverdizado ? <FcOk /> : <FcCancel />}</div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}