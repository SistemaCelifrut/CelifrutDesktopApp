/* eslint-disable prettier/prettier */

import useAppContext from "@renderer/hooks/useAppContext";
import { useEffect, useState } from "react";
import { lotesType } from "@renderer/types/lotesType";
import TableHistorialCalidadInterna from "./components/TableHistorialCalidadInterna";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import ModalModificarHistorialCalidadInterna from "./components/ModalModificarHistorialCalidadInterna";
import { requestData } from "./services/request";

export default function HistorialCalidadInterna(): JSX.Element {
  const {messageModal} = useAppContext();
  const [data, setData] = useState<lotesType[]>()
  const [page, setPage] = useState<number>(1)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [loteSeleccionado, setLoteSeleccionado] = useState<lotesType>()

  useEffect(() => {
    obtenerData()
    window.api.reload(() => {
      obtenerData()
    });
    return() => {
      window.api.removeReload()
    }
  }, [])
  const obtenerData = async (): Promise<void> => {
    try {
      const request = requestData(page)
      const response = await window.api.server2(request)
      if (response.status !== 200)
        throw new Error(response.message)
      console.log(response)
      setData([...response.data])
    } catch (e) {
      if (e instanceof Error)
        messageModal("error", e.message)
    }
  }
  const handleModificar = ():void => {
    setShowModal(!showModal)
  }
  return (
    <div className='componentContainer'>
      <div className='navBar'></div>
      <h2>Historial Calidad Interna</h2>
      <TableHistorialCalidadInterna 
        setLoteSeleccionado={setLoteSeleccionado}
        handleModificar={handleModificar}
        data={data} />

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
        <ModalModificarHistorialCalidadInterna
          showModal={showModal}
          obtenerData={obtenerData}
          loteSeleccionado={loteSeleccionado}
          handleModificar={handleModificar}
        />}
    </div>
  )
}
