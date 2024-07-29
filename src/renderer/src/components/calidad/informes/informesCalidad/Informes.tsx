/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import { lotesType } from "@renderer/types/lotesType";
import useAppContext from "@renderer/hooks/useAppContext";
import "@renderer/css/components.css"
import "@renderer/css/main.css"
import "@renderer/css/table.css"
import "./css/informesCalidad.css"

import { requestObject } from "./functions/request";
import TablaInformeCalidad from "./components/TablaInformeCalidad";
import ViewInformeData from "./components/ViewInformeData";

export default function Informes(): JSX.Element {
  const { messageModal } = useAppContext();

  const [datos, setDatos] = useState<lotesType[]>([]);
  const [datosFiltrados, setDatosFiltrados] = useState<lotesType[]>([]);
  const [filtro, setFiltro] = useState('');
  const [countPage, setCountPage] = useState<number>(1);
  const [showTable, setShowTable] = useState<boolean>(true)
  const [loteSeleccionado, setLoteSeleccionado] = useState<lotesType>()
  const obtenerDatosDelServidor = async (): Promise<void> => {
    try {
      const request = requestObject(countPage)
      const response = await window.api.server2(request);
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

  useEffect(() => {
    obtenerDatosDelServidor();
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

  const handleAccederDocumento = (lote): void => {
    setShowTable(false)
    setLoteSeleccionado(lote)
  };
  const handleVolverTabla = (): void => {
    setShowTable(true)
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
      <h2>Informe proveedor</h2>
      {showTable ?
        <TablaInformeCalidad
          handleAccederDocumento={handleAccederDocumento}
          datosFiltrados={datosFiltrados} />
        :
        <ViewInformeData handleVolverTabla={handleVolverTabla} loteSeleccionado={loteSeleccionado} />
      }
      {showTable &&
        <div className="informesCalidad-div-button">
          {countPage === 0 ? null :
            <button onClick={(): void => setCountPage(countPage - 1)}>
              <GrLinkPrevious />
            </button>}
          {countPage === 0 ? null : countPage}
          <button onClick={(): void => setCountPage(countPage + 1)}>
            <GrLinkNext />
          </button>
        </div>
      }
    </div>
  );
};

