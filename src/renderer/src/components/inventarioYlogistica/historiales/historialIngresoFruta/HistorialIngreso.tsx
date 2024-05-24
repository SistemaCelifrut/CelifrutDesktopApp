/* eslint-disable prettier/prettier */

import { useEffect, useState } from "react";
import TablaHistorialIngresoFruta from "./components/TablaHistorialIngresoFruta";
import { lotesType } from "@renderer/types/lotesType";
import useAppContext from "@renderer/hooks/useAppContext";
import { requestLotes } from "./services/request";
import FiltrosHistorialIngresoFruta from "./components/FiltrosHistorialIngresoFruta";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import ModalModificarLote from "./components/ModalModificarLote";


const HistorialIngresoFruta = (): JSX.Element => {
  const { messageModal } = useAppContext();
  const [ef1, setEf1] = useState<string>('')
  const [data, setData] = useState<lotesType[]>()
  const [dataOriginal, setDataOriginal] = useState<lotesType[]>()
  const [page, setPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false)
  const [loteSeleccionado, setLoteSeleccionado] = useState<lotesType>()
  const [changeServer, setChangeServer] = useState<boolean>(false)

  useEffect(() => { 
    obtenerData() 
    window.api.serverEmit('serverEmit', handleServerEmit)
    // Función de limpieza
    return () => {
      window.api.removeServerEmit('serverEmit', handleServerEmit)
    }
  }, [page,changeServer])
  useEffect(() => {
    if (ef1 === '') {
      setData(dataOriginal)
    } else {
      const dataFilter = dataOriginal?.filter(item => item.enf?.startsWith(ef1.toUpperCase()))
      setData(dataFilter)
    }
  }, [ef1])
  const handleServerEmit = async (data): Promise<void> => {
    if ( data.fn === "ingresoLote" ) {
      setChangeServer(!changeServer)
    }
  }
  const obtenerData = async (): Promise<void> => {
    try {
      const request = requestLotes(page)
      const response = await window.api.server(request)
      console.log("No entiendo de donde sale el otro log", response)
      if (response.status !== 200)
        throw new Error(response.message)
      setData([...response.data])
      setDataOriginal([...response.data])
    } catch (e) {
      if (e instanceof Error)
        messageModal("error", e.message)
    }
  }
  const handleModificar = ():void => {
    setShowModal(!showModal)
  }
  return (
    <div className="componentContainer">
      <div className="navBar"></div>
      <h2>Historial ingreso fruta</h2>
      <FiltrosHistorialIngresoFruta setEf1={setEf1} />
      <TablaHistorialIngresoFruta 
        setLoteSeleccionado={setLoteSeleccionado}
        data={data} 
        handleModificar={handleModificar}/>
      <div className="volante-calidad-button-page-div">
        <button
          onClick={(): void => setPage(page - 1)}
          disabled={page === 1}
          className="volante-calidad-button-page">
          {<IoIosArrowBack />}
        </button>
        {page}
        <button
          onClick={(): void => setPage(page + 1)}
          className="volante-calidad-button-page">
          {<IoIosArrowForward />}
        </button>
      </div>
      {showModal && 
        <ModalModificarLote 
          showModal={showModal}
          loteSeleccionado={loteSeleccionado} 
          handleModificar={handleModificar} />}
    </div>
  );
};

export default HistorialIngresoFruta;

