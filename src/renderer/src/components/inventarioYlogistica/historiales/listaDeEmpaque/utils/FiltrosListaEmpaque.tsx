/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react'
import ObtenerPrediosContenedor from '../functions/ObtenerPrediosContenedor'
import { contenedoresType } from '@renderer/types/contenedoresType'
import "@renderer/css/filtros.css"
import useAppContext from '@renderer/hooks/useAppContext'
import { request_add_pallet_to_contenedor } from '../functions/modificarListaDeEmpaque'

type propsType = {
  contenedor: contenedoresType | undefined
  setFiltro: (data: string) => void
  setFiltro2: (data: string) => void
}

export default function FiltrosListaEmpaque(props: propsType): JSX.Element {
  const { messageModal, user } = useAppContext();
  const [value1, setValue1] = useState<string>('')
  const [predios, setPredios] = useState<string[]>([])
  const [ids, setIds] = useState<string[]>([])


  const handleFiltro1 = (e): void => {
    props.setFiltro(e.target.value)
    setValue1(e.target.value)
  }

  const handleFiltro2 = (e): void => {
    props.setFiltro2(e.target.value)
  }
  const handleAddPallet = async (): Promise<void> => {
    try{
      const request = request_add_pallet_to_contenedor(props.contenedor?._id)
      const response = await window.api.server(request);
      if (response.status !== 200)
          messageModal("error", response.message)
      messageModal("success", "Contenedor cerrado con exito")
    } catch (e) {
      if(e instanceof Error)
        messageModal("error", e.message)
    }
  }
  useEffect(() => {
    if (props.contenedor) {
      const [response, response_id] = ObtenerPrediosContenedor(props.contenedor)
      setPredios(response)
      setIds(response_id)
    }
  }, [value1])

  return (
    <div className='filtroContainer'>
      <hr />
      <div className='div-filter-actions'>
        <label>
          <p>Busqueda por:</p>
          <select onChange={handleFiltro1}>
            <option value={''}>None</option>
            {props.contenedor && (
              <>
                <option value={'predio'}>Predios</option>
                <option value={'pallet'}>
                  {'Caja'}
                </option>
              </>
            )}
          </select>
        </label>
        <label>
          <p>Elemento</p>
          <select
            onChange={handleFiltro2}>
            <option value={''}>None</option>
            {props.contenedor && value1 === 'pallet' && props.contenedor && props.contenedor.pallets
              ? Object.keys(props.contenedor.pallets).map((pallet) => (
                <option key={pallet} value={pallet}>
                  {Number(pallet) + 1}
                </option>
              ))
              : null}

            {props.contenedor && value1 === 'predio'
              ? predios.map((enf, index) => (
                <option key={enf} value={ids[index]}>
                  {enf}
                </option>
              ))
              : null}
          </select>
        </label>
        {value1 === "pallet" && user.cargo === "admin" &&
          <button onClick={handleAddPallet}>
            Agregar pallet
          </button>
        }
      </div>
    </div>
  )
}
