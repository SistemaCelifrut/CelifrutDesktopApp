/* eslint-disable prettier/prettier */
import { useContext, useEffect, useState } from "react";
import { dataContext, sectionContext } from "@renderer/App";
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GrTest } from "react-icons/gr";
import { FcOk } from 'react-icons/fc'
import { FcCancel } from 'react-icons/fc'
import { GrDocumentMissing } from "react-icons/gr";
import { MdOutlineEqualizer } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";
import { GiBottleVapors } from "react-icons/gi";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import { lotesType } from "@renderer/types/lotesType";
import useAppContext from "@renderer/hooks/useAppContext";
import { request } from "./functions/request";

export default function Informes(): JSX.Element {
  const {theme, messageModal} = useAppContext();
  const secctionMenu = useContext(sectionContext);
  const dataGlobal = useContext(dataContext);
  const [datos, setDatos] = useState<lotesType[]>([]);
  const [datosFiltrados, setDatosFiltrados] = useState<lotesType[]>([]);
  const [filtro, setFiltro] = useState('');
  const [countPage, setCountPage] = useState<number>(0);

  const obtenerDatosDelServidor = async (): Promise<void> => {
    try {
      const response = await window.api.server(request);
      if(response.status !== 200){
        throw new Error(response.message);
      }
      setDatos(response.data);
      setDatosFiltrados(response.data); 
    } catch (error) {
      if(error instanceof Error){
        messageModal("error",`${error.message}`)
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
    try{
      if(!secctionMenu){
        throw new Error("Error informes context secction menu")
      }
      if(!dataGlobal){
        throw new Error("Error informes context data global")
      }
      secctionMenu.setSection("Inventario y Logística//Historiales//Lotes")
      dataGlobal.setDataComponentes(EF1)
    } catch(e){
      if(e instanceof Error){
        messageModal("error", `${e.message}`);
      }
    }
  }

  return (
    <div className="m-2 flex flex-col justify-center w-full h-max">
      <h2 className={`bg-Celifrut-green text-center p-4 rounded-md shadow-md text-white font-bold`}>
        📊 INFORMES 📊
      </h2>
      <div className="flex justify-center">
        <input
          type="text"
          value={filtro}
          onChange={(e): void => setFiltro(e.target.value)}
          placeholder="Buscador ..."
          className={`flex justify-center m-4 border-solid border-2 border-blue-200 rounded-lg p-2 w-2/4`}
        />
 
      </div>
      <table className={`mr-2 ml-2 w-full mt-4 border-2 table-fixed`}>
        <thead className={`${theme === 'Dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
          <tr className="h-14 broder-2">
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-[11px]`}>📦 ENF</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-[11px]`}>🍋 Nombre del Predio</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-[11px]`}>🍊 Tipo de Fruta</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-[11px]`}> 
              <div className="flex flex-row gap-1 items-center justify-center"> <GrTest /> <p>Calidad interna</p></div> 
            </th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-[11px] `}> 
              <div className="flex flex-row gap-1 items-center justify-center"> <MdOutlineEqualizer /> <p>Clasificación calidad</p></div> 
            </th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-[11px] `}> 
              <div className="flex flex-row gap-1 items-center justify-center"> <IoMdPhotos /> <p>Fotos calidad</p></div> 
            </th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-[11px] `}> 
              <div className="flex flex-row gap-1 items-center justify-center"> <GiBottleVapors /> <p>Deshidratación</p></div> 
            </th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-[11px]`}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datosFiltrados.map((item, index) => (
            <tr className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`} key={index}>
              <td className="p-2   text-center text-[11px] cursor-pointer hover:underline" 
                  onClick={(): void => handleClickEF1(item.enf)}>
                {item.enf}
              </td>
              <td className="p-2   text-center text-[11px]">{item.predio && item.predio.PREDIO}</td>
              <td className="p-2   text-center text-[11px]">{item.tipoFruta}</td>
              <td className="p-2   text-center text-[11px]">
                <div className="flex flex-row justify-center">
                  {item.calidad && Object.prototype.hasOwnProperty.call(item.calidad, 'calidadInterna') ? <FcOk /> : <FcCancel />}
                </div>
              </td>
              <td className="p-2   text-center text-[11px]">
                <div className="flex flex-row justify-center">
                  {item.calidad && Object.prototype.hasOwnProperty.call(item.calidad, 'clasificacionCalidad') ? <FcOk /> : <FcCancel />}
                </div>
              </td>
              <td className="p-2   text-center text-[11px]">
                <div className="flex flex-row justify-center">
                  {item.calidad && Object.prototype.hasOwnProperty.call(item.calidad, 'fotosCalidad') ? <FcOk /> : <FcCancel />}
                </div>
              </td>
              <td className="p-2   text-center text-[11px]">
                <div className="flex flex-row justify-center">
                  {item.deshidratacion !== undefined && item.deshidratacion <= 2 ? <FcOk /> : <FcCancel />}
                </div>
              </td>
              <td className="p-2   text-center text-[11px]">
              {item.calidad && Object.prototype.hasOwnProperty.call(item.calidad, 'calidadInterna') && 
                Object.prototype.hasOwnProperty.call(item.calidad, 'clasificacionCalidad') && 
                Object.prototype.hasOwnProperty.call(item.calidad, 'fotosCalidad') && 
                item.deshidratacion && item.deshidratacion <= 2 ? 
                  <button
                    className="text-white border-0 rounded-md p-2 cursor-pointer bg-Celifrut-green shadow-lg"
                    onClick={(): void => handleAccederDocumento(item.urlInformeCalidad)}>
                    <FontAwesomeIcon icon={faFileAlt} />
                  </button>
                : 
                <div className="flex justify-center font-extrabold text-xl text-red-700"><GrDocumentMissing /></div>
              }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={`flex flex-row justify-center p-4 text-xl font-bold mt-4 gap-8 ${theme === 'Dark' ? 'text-white':'text-black'}`}>
        {countPage === 0 ? null : 
        <button 
        onClick={():void => setCountPage(countPage - 1)}
        className="text-white bg-Celifrut-green hover:bg-Celifrut-green-dark p-2 rounded-lg shadow-lg"><GrLinkPrevious /></button>}
        {countPage === 0 ? null :countPage + 1 }
        <button 
        onClick={():void => setCountPage(countPage + 1)}
        className="text-white bg-Celifrut-green hover:bg-Celifrut-green-dark p-2 rounded-lg shadow-lg"><GrLinkNext /></button>
      </div>
    </div>
  );
};

