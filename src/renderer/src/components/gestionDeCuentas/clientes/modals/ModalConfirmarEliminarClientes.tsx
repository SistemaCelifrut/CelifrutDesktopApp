/* eslint-disable prettier/prettier */
type propsType = {
    handleEliminar: (e) => Promise<void>
}
export default function ModalConfirmarEliminarClientes(props:propsType): JSX.Element {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-xl  w-96 h-44">
      <div className="flex justify-between items-center bg-Celifrut-green p-2 h-10 rounded-t-xl">
      </div>
      <div className="flex justify-center p-2">
        <h2 className="text-center">¿Esta seguro que desea eliminar el cliente?</h2>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={async (): Promise<void> => await props.handleEliminar(true)}>
          Aceptar
        </button>
        <button
          className="border border-gray-300 px-4 py-2 rounded-md"
          onClick={async (): Promise<void> => await props.handleEliminar(false)}
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
  )
}
