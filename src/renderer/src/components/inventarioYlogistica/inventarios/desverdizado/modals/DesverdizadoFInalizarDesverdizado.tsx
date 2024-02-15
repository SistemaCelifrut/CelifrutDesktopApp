/* eslint-disable prettier/prettier */
import { prediosDesverdizadoType } from "../type/type"

type propsType = {
  closeFinalizarDesverdizado: () => void
  propsModal: prediosDesverdizadoType
  theme: string
  setShowSuccess: (e) => void
  setShowError: (e) => void
  setMessage: (e) => void
}

export default function DesverdizadoFInalizarDesverdizado(props: propsType): JSX.Element {
  const finalizar = async (): Promise<void> => {
    const new_lote = {
      _id:props.propsModal._id,
      "desverdizado.fechaFinalizar" : new Date().toUTCString()
    }
    const request = {
      data:{
        lote: new_lote
      },
      collection:'lotes',
      action: 'putLotes',
      query: 'proceso',
      record: "setParametros desverdizado"
    }
    const response = await window.api.server(request)

    if (response.status == 200) {
      props.closeFinalizarDesverdizado()
      props.setShowSuccess(true)
      props.setMessage("Desverdizado finalizado!")
      setInterval(() => {
        props.setShowSuccess(false)
      }, 5000)
    } else {
      props.setShowError(true)
      props.setMessage("Error enviando los datos a el servidor!")
      setInterval(() => {
        props.setShowError(false)
      }, 5000)
      props.closeFinalizarDesverdizado()
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl  w-96 h-44">
        <div className="flex justify-between items-center bg-orange-600 p-2 rounded-t-xl">
          <h1 className="text-white">{props.propsModal.predio.PREDIO}</h1>
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
