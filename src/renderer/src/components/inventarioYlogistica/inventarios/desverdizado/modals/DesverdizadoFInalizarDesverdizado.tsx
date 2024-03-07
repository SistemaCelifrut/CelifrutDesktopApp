/* eslint-disable prettier/prettier */
import useAppContext from "@renderer/hooks/useAppContext"
import { lotesType } from "@renderer/types/lotesType";

type propsType = {
  closeFinalizarDesverdizado: () => void
  propsModal: lotesType
  handleInfo: () => void
}

export default function DesverdizadoFInalizarDesverdizado(props: propsType): JSX.Element {
  const { messageModal } = useAppContext();
  const finalizar = async (): Promise<void> => {
    try {
      const new_lote = {
        _id: props.propsModal._id,
        "desverdizado.fechaFinalizar": new Date().toUTCString()
      }
      const request = {
        data: {
          lote: new_lote
        },
        collection: 'lotes',
        action: 'putLotes',
        query: 'proceso',
        record: "setParametros desverdizado"
      }
      const response = await window.api.server(request)

      if (response.status == 200) {
        messageModal("success", "Desverdizado finalizado!");
      } else {
        messageModal("error", "Error enviando los datos a el servidor!")
        props.closeFinalizarDesverdizado()
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        messageModal("error", e.message)
      }
    } finally {
      props.handleInfo();
      props.closeFinalizarDesverdizado();
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl  w-96 h-44">
        <div className="flex justify-between items-center bg-orange-600 p-2 rounded-t-xl">
          <h1 className="text-white">{props.propsModal.predio && props.propsModal.predio.PREDIO}</h1>
        </div>
        <div className="flex justify-center p-2">
          <h2 className="text-center">Esta seguro que desea finalizar el desverdizado</h2>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={finalizar}>
            Aceptar
          </button>
          <button
            className="border border-gray-300 px-4 py-2 rounded-md"
            onClick={props.closeFinalizarDesverdizado}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
