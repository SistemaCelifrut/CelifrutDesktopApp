/* eslint-disable prettier/prettier */

import { useEffect, useState } from "react";
import TablaHistorialIngresoFruta from "./components/TablaHistorialIngresoFruta";
import useAppContext from "@renderer/hooks/useAppContext";
import { requestLotes } from "./services/request";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import ModalModificarLote from "./components/ModalModificarLote";
import { recordLotesType } from "@renderer/types/recorLotesType";


const HistorialIngresoFruta = (): JSX.Element => {
  const { messageModal } = useAppContext();
  const [data, setData] = useState<recordLotesType[]>()
  const [page, setPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false)
  const [loteSeleccionado, setLoteSeleccionado] = useState<recordLotesType>()
  //vuelve a pedir los datos al servidor
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    obtenerData()
    window.api.reload(() => {
      setReload(!reload)
    });
    return () => {
      window.api.removeReload()
    }
  }, [reload])


  const obtenerData = async (): Promise<void> => {
    try {
      const request = requestLotes(page)
      const response = await window.api.server2(request)
      if (response.status !== 200)
        throw new Error(response.message)
      setData([...response.data])
    } catch (e) {
      if (e instanceof Error)
        messageModal("error", e.message)
    }
  }
  const handleModificar = (): void => {
    setShowModal(!showModal)
  }
  return (
    <div className="componentContainer">
      <div className="navBar"></div>
      <h2>Historial ingreso fruta</h2>
      <TablaHistorialIngresoFruta
        setLoteSeleccionado={setLoteSeleccionado}
        data={data}
        handleModificar={handleModificar} />
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

