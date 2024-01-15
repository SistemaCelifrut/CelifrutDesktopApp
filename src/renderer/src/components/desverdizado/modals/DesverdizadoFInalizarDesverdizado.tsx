/* eslint-disable prettier/prettier */
type propsType = {
  closeFinalizarDesverdizado: () => void
  propsModal: { nombre: string; enf: string }
  theme: string
}

export default function DesverdizadoFInalizarDesverdizado(props: propsType): JSX.Element {
  const finalizar = async (): Promise<void> => {
    const request = { action: 'finalizarDesverdizado', enf: props.propsModal.enf }
    const response = await window.api.proceso(request)

    if (response.status == 200) {
      props.closeFinalizarDesverdizado()
    } else {
      alert('Error al finalizar el desverdizado')
      props.closeFinalizarDesverdizado()
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl  w-96 h-44">
        <div className="flex justify-between items-center bg-orange-600 p-2 rounded-t-xl">
          <h1 className="text-white">{props.propsModal.nombre}</h1>
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
