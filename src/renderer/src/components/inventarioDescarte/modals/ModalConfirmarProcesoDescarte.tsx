/* eslint-disable prettier/prettier */
import { useState } from 'react'

type propsType = {
  procesar: (data: string) => void
  propsModal: { action: string; data: object }
  theme: string
  unCheck: (data: boolean) => void
  reset: () => void
}

export default function ModalConfirmarProcesoDescarte(props: propsType): JSX.Element {
  const [cliente, setCliente] = useState<string>('')
  const [placa, setPlaca] = useState<string>('')
  const [nombreConductor, setNombreConductor] = useState<string>('')
  const [telefono, setTelefono] = useState<string>('')
  const [cedula, setCedula] = useState<string>('')
  const [remision, setRemision] = useState<string>('')
  const finalizar = async (): Promise<void> => {
    if (props.propsModal.action === 'Enviar descarte') {
      const datos = [props.propsModal.data, cliente]
      const request = { action: 'eliminarFrutaDescarte', data: datos }
      const response = await window.api.proceso(request)
      console.log(response)
      if (response.status == 200) {
        propsAction()
      } else {
        alert('Error al enviar el descarte')
        props.unCheck(false)
        props.procesar('')
      }
    } else if (props.propsModal.action === 'Reprocesar como Celifrut') {
      const request = { action: 'ReprocesarDescarteCelifrut', data: props.propsModal.data }
      const response = await window.api.proceso(request)

      if (response.status == 200) {
        propsAction()
      } else {
        alert('Error a reproceso Celifrut')
        props.unCheck(false)
        props.procesar('')
      }
    } else if (props.propsModal.action === 'Reprocesar el lote') {
      const request = { action: 'reprocesarDescarteUnPredio', data: props.propsModal.data }
      const response = await window.api.proceso(request)
      console.log(response)
      if (response.status == 200) {
        propsAction()
      } else {
        alert('Error al reprocesar predio')
        props.unCheck(false)
        props.procesar('')
      }
    }
  }

  const propsAction = (): void => {
    props.unCheck(true)
    props.procesar('')
    props.reset()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white rounded-xl  w-96 h-auto pb-4 ${props.propsModal.action === 'Enviar descarte' && 'h-60'
          }`}
      >
        <div className="flex justify-between items-center bg-Celifrut-green p-2 rounded-t-xl">
          <h1 className="text-white">
            {props.propsModal.action.charAt(0).toUpperCase() + props.propsModal.action.slice(1)}{' '}
            descarte
          </h1>
        </div>
        <div className="flex justify-center p-2">
          <h2 className="text-center">¿Desea {props.propsModal.action} seleccionado?</h2>
        </div>
        {props.propsModal.action === 'Enviar descarte' && (
          <div className="flex justify-center flex-col p-2">
            <label>Nombre del cliente</label>
            <input
              type="text"
              className="border-2 border-gray-200 rounded-md p-2"
              onChange={(e): void => setCliente(e.target.value)}
            />
            <label >Placa</label>
            <input
              type="text"
              value={placa}
              maxLength={6}
              className="border-2 border-gray-200 rounded-md p-2"
              onChange={(e): void => setPlaca(e.target.value)}
            />
            <label >Nombre conductor</label>
            <input
              type="text"
              className="border-2 border-gray-200 rounded-md p-2"
              onChange={(e): void => setNombreConductor(e.target.value)}
            />
            <label >Telefono</label>
            <input
              type="text"
              className="border-2 border-gray-200 rounded-md p-2"
              onChange={(e): void => setTelefono(e.target.value)}
            />
                 <label >Cedula</label>
            <input
              type="number"
              className="border-2 border-gray-200 rounded-md p-2"
              onChange={(e): void => setCedula(e.target.value)}
            />
                      <label >Remision</label>
            <input
              type="number"
              className="border-2 border-gray-200 rounded-md p-2"
              onChange={(e): void => setRemision(e.target.value)}
            />

          </div>
        )}
        <div className="flex justify-center gap-4 mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={finalizar}>
            Aceptar
          </button>
          <button
            className="border border-gray-300 px-4 py-2 rounded-md"
            onClick={(): void => props.procesar('')}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
