/* eslint-disable prettier/prettier */
import useAppContext from '@renderer/hooks/useAppContext'
import { lotesType } from '@renderer/types/lotesType'
import { useState } from 'react'
import "../../../../../css/modal-style.css"


type vaciadoType = {
  closeDirecto: () => void
  propsModal: lotesType
  handleInfo: () => void
  obtenerFruta: () => void
}

export default function Directo(props: vaciadoType): JSX.Element {
  const { theme, messageModal } = useAppContext();
  const [canastillas, setCanastillas] = useState<number>(0)
  const [placa, setPlaca] = useState<string>('')
  const [nombreConductor, setNombreConductor] = useState<string>('')
  const [telefono, setTelefono] = useState<string>('')
  const [cedula, setCedula] = useState<string>('')
  const [remision, setRemision] = useState<string>('')

  const directoNacional = async (): Promise<void> => {
    try {
      const canastillasInt = canastillas
      const propsCanastillasInt = props.propsModal.inventario ? props.propsModal.inventario : 0
      if (props.propsModal.promedio)
        if (propsCanastillasInt !== undefined && canastillasInt > propsCanastillasInt) {
          messageModal("error", "Error en el numero de canastillas!");
        } else {
          console.log(props.propsModal)
          const request = {
            _id: props.propsModal._id,
            infoSalidaDirectoNacional: {
              placa: placa,
              nombreConductor: nombreConductor,
              telefono: telefono,
              cedula: cedula,
              remision: remision
            },
            directoNacional: Number(canastillas) * props.propsModal.promedio,
            inventario: Number(canastillas),
            __v: props.propsModal.__v,
            action: 'directoNacional',
          }
          const response = await window.api.server2(request)
          if (response.status === 200) {
            messageModal("success", "Fruta enviada a directo nacional!");
            props.obtenerFruta()

          } else {
            messageModal("error", `Error ${response.status}: ${response.message}`)
          }
        }
    } catch (e: unknown) {
      if (e instanceof Error) {
        messageModal("error", e.message)
      }
    } finally {
      props.closeDirecto();
      props.handleInfo();
    }
  }
  return (
    <div className="fondo-modal">
      <div className="modal-container">
        <div className='modal-header-danger'>
          <h2 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-lg font-semibold`}>{props.propsModal.predio && props.propsModal.predio.PREDIO}</h2>
        </div>
        <div className='modal-container-body'>
          <p>Numero de canastillas en inventario: {props.propsModal.inventario && props.propsModal.inventario}</p>
          <p>Canastillas</p>
          <input
            type="number"
            min="0"
            step="1"
            onChange={(e): void => setCanastillas(Number(e.target.value))}
          />
          <p>Placa</p>
          <input
            type="text"
            value={placa}
            maxLength={6}
            pattern="[A-Z]{3}[0-9]{3}"
            onChange={(e): void => setPlaca(e.target.value)}
          />
          <p>Nombre conductor</p>
          <input
            type="text"
            value={nombreConductor}
            onChange={(e): void => setNombreConductor(e.target.value)}
          />
          <p>Telefono</p>
          <input
            type="text"
            value={telefono}
            onChange={(e): void => setTelefono(e.target.value)}
          />
          <p>Cedula</p>
          <input
            type="text"
            value={cedula}
            onChange={(e): void => setCedula(e.target.value)}
          />
          <p>Remision</p>
          <input
            type="text"
            value={remision}
            onChange={(e): void => setRemision(e.target.value)}
          />
        </div>

        <div className="modal-container-buttons">
          <button onClick={directoNacional} className='danger'>Enviar</button>
          <button onClick={props.closeDirecto} className='cancel'>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

