/* eslint-disable prettier/prettier */
import { useContext, useEffect, useState } from "react";
import { informesCalidadType } from "./types/types";
import { dataContext, sectionContext, themeContext } from "@renderer/App";
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

export default function Informes(): JSX.Element {
  const theme = useContext(themeContext);
  const secctionMenu = useContext(sectionContext);
  const dataGlobal = useContext(dataContext);
  const [datos, setDatos] = useState<informesCalidadType[]>([]);
  const [datosFiltrados, setDatosFiltrados] = useState<informesCalidadType[]>([]);
  const [filtro, setFiltro] = useState('');
  const [countPage, setCountPage] = useState<number>(0);

  useEffect(() => {
    const obtenerDatosDelServidor = async (): Promise<void> => {
      try {
        const request = { action: 'obtenerInformesCalidad', query: 'proceso', data:countPage };
        const response = await window.api.calidad(request);
        const lotes: informesCalidadType[] = response.data;

        console.log('Datos del servidor:', lotes);

        if (Array.isArray(lotes) && lotes.length > 0) {
          setDatos(lotes);
          setDatosFiltrados(lotes); // Inicializa los datos filtrados con los datos originales
        } else {
          console.error('El formato de lotes no es el esperado o está vacío.');
        }
      } catch (error) {
        console.error('Error al obtener informes:', error);
      }
    };

    obtenerDatosDelServidor();
  }, []);

  useEffect(() => {
    const obtenerDatosDelServidor = async (): Promise<void> => {
      try {
        const request = { action: 'obtenerInformesCalidad', query: 'proceso', data:countPage };
        const response = await window.api.calidad(request);
        const lotes: informesCalidadType[] = response.data;

        console.log('Datos del servidor:', lotes);

        if (Array.isArray(lotes) && lotes.length > 0) {
          setDatos(lotes);
          setDatosFiltrados(lotes); // Inicializa los datos filtrados con los datos originales
        } else {
          console.error('El formato de lotes no es el esperado o está vacío.');
        }
      } catch (error) {
        console.error('Error al obtener informes:', error);
      }
    };

    obtenerDatosDelServidor();
  }, [countPage]);

  useEffect(() => {
    const datosFiltrados = datos.filter(
      (item) =>
        item._id.toLowerCase().includes(filtro.toLowerCase()) ||
        item.nombrePredio.toLowerCase().includes(filtro.toLowerCase()) ||
        item.tipoFruta.toLowerCase().includes(filtro.toLowerCase())
    );
    setDatosFiltrados(datosFiltrados);
  }, [filtro, datos]);

  const handleAccederDocumento = (enlace): void => {
    window.open(enlace, '_blank');
  };

  const handleClickEF1 = (EF1): void => {
    if(!secctionMenu){
      throw new Error("Error informes context secction menu")
    }
    if(!dataGlobal){
      throw new Error("Error informes context data global")
    }
    secctionMenu.setSection("Inventario y Logística//Historiales//Lotes")
    dataGlobal.setDataComponentes(EF1)

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
                  onClick={(): void => handleClickEF1(item._id)}>
                {item._id}
              </td>
              <td className="p-2   text-center text-[11px]">{item.nombrePredio}</td>
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
                  {item.deshidratacion <= 2 ? <FcOk /> : <FcCancel />}
                </div>
              </td>
              <td className="p-2   text-center text-[11px]">
              {item.calidad && Object.prototype.hasOwnProperty.call(item.calidad, 'calidadInterna') && 
                Object.prototype.hasOwnProperty.call(item.calidad, 'clasificacionCalidad') && 
                Object.prototype.hasOwnProperty.call(item.calidad, 'fotosCalidad') && 
                item.deshidratacion <= 2 ? 
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

