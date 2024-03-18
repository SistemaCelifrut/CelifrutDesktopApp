/* eslint-disable prettier/prettier */
import { useContext, useEffect, useState } from "react";
import { dataContext, sectionContext } from "@renderer/App";
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FcOk } from 'react-icons/fc'
import { FcCancel } from 'react-icons/fc'
import { GrDocumentMissing } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import { lotesType } from "@renderer/types/lotesType";
import useAppContext from "@renderer/hooks/useAppContext";
import { request } from "./functions/request";
import "@renderer/css/components.css"
import "@renderer/css/main.css"
import "@renderer/css/table.css"
import "./css/informesCalidad.css"
import { headers } from "./functions/constants";
import { format } from "date-fns";

export default function Informes(): JSX.Element {
  const { messageModal } = useAppContext();
  const secctionMenu = useContext(sectionContext);
  const dataGlobal = useContext(dataContext);
  const [datos, setDatos] = useState<lotesType[]>([]);
  const [datosFiltrados, setDatosFiltrados] = useState<lotesType[]>([]);
  const [filtro, setFiltro] = useState('');
  const [countPage, setCountPage] = useState<number>(0);

  const obtenerDatosDelServidor = async (): Promise<void> => {
    try {
      const response = await window.api.server(request);
      if (response.status !== 200) {
        throw new Error(response.message);
      }
      setDatos(response.data);
      setDatosFiltrados(response.data);
    } catch (error) {
      if (error instanceof Error) {
        messageModal("error", `${error.message}`)
      }
    }
  };
  const handleServerEmit = async (data): Promise<void> => {
    if (data.fn === "procesoLote" || data.fn === 'ingresoLote' || data.fn === 'descartesToDescktop') {
      await obtenerDatosDelServidor()
    }
  }
  useEffect(() => {
    obtenerDatosDelServidor();
    window.api.serverEmit('serverEmit', handleServerEmit)
    // Función de limpieza
    return () => {
      window.api.removeServerEmit('serverEmit', handleServerEmit)
    }
  }, [countPage]);

  useEffect(() => {
    const datosFiltrados = datos.filter(
      (item) =>
        item._id && item._id.toLowerCase().includes(filtro.toLowerCase()) ||
        item.predio && item.predio.PREDIO && item.predio.PREDIO.toLowerCase().includes(filtro.toLowerCase()) ||
        item.tipoFruta && item.tipoFruta.toLowerCase().includes(filtro.toLowerCase())
    );
    setDatosFiltrados(datosFiltrados);
  }, [filtro, datos]);

  const handleAccederDocumento = (enlace): void => {
    window.open(enlace, '_blank');
  };

  const handleClickEF1 = (EF1): void => {
    try {
      if (!secctionMenu) {
        throw new Error("Error informes context secction menu")
      }
      if (!dataGlobal) {
        throw new Error("Error informes context data global")
      }
      secctionMenu.setSection("Inventario y Logística//Historiales//Lotes")
      dataGlobal.setDataComponentes(EF1)
    } catch (e) {
      if (e instanceof Error) {
        messageModal("error", `${e.message}`);
      }
    }
  }

  return (
    <div className="componentContainer">
      <div className="navBar">
        <div>
          <input
            type="text"
            value={filtro}
            onChange={(e): void => setFiltro(e.target.value)}
            placeholder="Buscador ..."
            className="defaultSelect"
          />
        </div>
      </div>
      <table className="table-main">
        <thead>
          <tr>
            {headers.map(item => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datosFiltrados.map((item, index) => (
            <tr className={`${index % 2 === 0 ? 'fondo-par' : 'fondo-impar'}`} key={index}>
              <td onClick={(): void => handleClickEF1(item.enf)}>
                {item.enf}
              </td>
              <td>{item.predio && item.predio.PREDIO}</td>
              <td>{item.tipoFruta}</td>
              <td>{format(item.fechaIngreso ? new Date(item.fechaIngreso) : new Date(), 'dd-MM-yy')}</td>
              <td>
                <div>
                  {item.calidad && Object.prototype.hasOwnProperty.call(item.calidad, 'calidadInterna') ? <FcOk /> : <FcCancel />}
                </div>
              </td>
              <td>
                <div>
                  {item.calidad && Object.prototype.hasOwnProperty.call(item.calidad, 'clasificacionCalidad') ? <FcOk /> : <FcCancel />}
                </div>
              </td>
              <td >
                <div >
                  {item.calidad && Object.prototype.hasOwnProperty.call(item.calidad, 'fotosCalidad') ? <FcOk /> : <FcCancel />}
                </div>
              </td>
              <td >
                <div>
                  {item.deshidratacion !== undefined && item.deshidratacion <= 2 && item.deshidratacion >= 0 ? <FcOk /> : <FcCancel />}
                </div>
              </td>
              <td >
                {item.calidad && Object.prototype.hasOwnProperty.call(item.calidad, 'calidadInterna') &&
                  Object.prototype.hasOwnProperty.call(item.calidad, 'clasificacionCalidad') &&
                  Object.prototype.hasOwnProperty.call(item.calidad, 'fotosCalidad') &&
                  item.deshidratacion && item.deshidratacion <= 2 && item.deshidratacion >= 0 ?
                  <button
                    onClick={(): void => handleAccederDocumento(item.urlInformeCalidad)}>
                    <FontAwesomeIcon icon={faFileAlt} />
                  </button>
                  :
                  <div className="table-main-noDocument"><GrDocumentMissing /></div>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="informesCalidad-div-button">
        {countPage === 0 ? null :
          <button onClick={(): void => setCountPage(countPage - 1)}>
            <GrLinkPrevious />
          </button>}
        {countPage === 0 ? null : countPage + 1}
        <button onClick={(): void => setCountPage(countPage + 1)}>
            <GrLinkNext />
        </button>
      </div>
    </div>
  );
};

