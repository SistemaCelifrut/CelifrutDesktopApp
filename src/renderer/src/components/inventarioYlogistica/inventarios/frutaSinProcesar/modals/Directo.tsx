/* eslint-disable prettier/prettier */
import useAppContext from '@renderer/hooks/useAppContext'
import { lotesType } from '@renderer/types/lotesType'
import { useState } from 'react'
import "../../../../../css/modal-style.css"


type vaciadoType = {
  closeDirecto: () => void
  propsModal: lotesType
  handleInfo: () => void
}

export default function Directo(props: vaciadoType): JSX.Element {
  const {theme, messageModal} = useAppContext();
  const [canastillas, setCanastillas] = useState<number>(0)
  const [placa, setPlaca] = useState<string>('')
  const [nombreConductor, setNombreConductor] = useState<string>('')
  const [telefono, setTelefono] = useState<string>('')
  const [cedula, setCedula] = useState<string>('')
  const [remision, setRemision] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const vaciar = async (): Promise<void> => {
    try {
      setLoading(true)
      const canastillasInt = canastillas
      const propsCanastillasInt = props.propsModal.inventarioActual ? props.propsModal.inventarioActual.inventario : 0

      if (propsCanastillasInt !== undefined && canastillasInt > propsCanastillasInt) {
        messageModal("error","Error en el numero de canastillas!");
      } else {
        const nuevo_lote = JSON.parse(JSON.stringify(props.propsModal));
        nuevo_lote["inventarioActual.inventario"] = nuevo_lote.inventarioActual.inventario - canastillasInt;
        nuevo_lote.directoNacional = Number(nuevo_lote.directoNacional) + (Number(nuevo_lote.promedio) * Number(canastillasInt));
        nuevo_lote.infoSalidaDirectoNacional = {
          placa: placa,
          nombreConductor: nombreConductor,
          telefono: telefono,
          cedula: cedula,
          remision: remision
        }
        if ('inventario' in nuevo_lote.inventarioActual) {
          delete nuevo_lote.inventarioActual.inventario;
        }
        if ('inventarioActual' in nuevo_lote) {
          delete nuevo_lote.inventarioActual;
        }
        
        const request = {
          data:{
            lote: nuevo_lote,
            vaciado: canastillasInt
          },
          collection:'lotes',
          action: 'putLotes',
          query: 'proceso',
          record: "directoNacional"
        }

        const response = await window.api.server(request)
        if (response.status === 200) {
          messageModal("success","Fruta enviada a directo nacional!");
        } else {
          messageModal("error",`Error ${response.status}: ${response.message}`)
        }
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        messageModal("error", e.message)
    }
    } finally {
      setLoading(false)
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
            <p>Numero de canastillas en inventario: {props.propsModal.inventarioActual && props.propsModal.inventarioActual.inventario}</p>
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
        <button onClick={vaciar} className='danger'>Enviar</button>
        <button onClick={props.closeDirecto} className='cancel'>Cancelar</button>
      </div>
      </div>
    </div>
  );
}

