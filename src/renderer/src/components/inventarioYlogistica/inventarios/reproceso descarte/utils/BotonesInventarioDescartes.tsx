/* eslint-disable prettier/prettier */
import {
  sumatoriaDescarteEspecifico,
  sumatoriaDescarteSeleccionado,
  // sumatoriaDescartes
} from '../function/sumatorias'
import { useEffect } from 'react'
import { llavesVisualizar } from '../function/llaves'
import { lotesType } from '@renderer/types/lotesType'

type propsType = {
  table: lotesType[]
  enfObj: object
  reprocesar: boolean
  procesar: (action: string) => void
}

export default function BotonesInventarioDescartes(props: propsType): JSX.Element {
  useEffect(() => {
    console.log(props.enfObj)
  }, [props.enfObj])

  return (
    <div className='inventario-descartes-botones-container'>
        <div className="inventario-descartes-botones-div-kilos-totales">
          <h3>Kilos seleccionados: {sumatoriaDescarteSeleccionado(props.enfObj).toLocaleString('es-ES')} Kg</h3>
          {props.reprocesar && (
            <button onClick={(): void => props.procesar("Reprocesar el lote")} className='defaulButtonAgree'>
              Reprocesar
            </button>
          )}
          {!props.reprocesar && (
            <button onClick={(): void => props.procesar("Reprocesar como Celifrut")} className='defaulButtonAgree'>
              Reprocesar Celifrut
            </button>
          )}
          {/* <button onClick={(): void => props.procesar("Enviar descarte")} className='defaulButtonAgree'>
            Enviar
          </button> */}
        </div>
        <div className="inventario-descartes-botones-div-kilos-totales">
          <div className="inventario-descartes-botones-div-kilos-totales-lavado">
            <h3>
              Descarte Lavado:
            </h3>
            <div>
              {props.table[0] && props.table[0].inventarioActual && props.table[0].inventarioActual.descarteLavado &&
                Object.keys(props.table[0].inventarioActual.descarteLavado).map((item) => (
                  <h4 key={item}>
                    {llavesVisualizar[item]}: {sumatoriaDescarteEspecifico(props.table, 'descarteLavado', item).toLocaleString('es-ES')} Kg
                  </h4>
                ))}
            </div>
          </div>
          <div className="inventario-descartes-botones-div-kilos-totales-lavado">
            <h3>
              Descarte Encerado:
            </h3>
            <div>
              {props.table[0] && props.table[0].inventarioActual && props.table[0].inventarioActual.descarteEncerado &&
                Object.keys(props.table[0].inventarioActual.descarteEncerado).map((item) => (
                  <h4 key={item}>
                    {llavesVisualizar[item]}: {sumatoriaDescarteEspecifico(props.table, 'descarteEncerado', item).toLocaleString('es-ES')}{' '}
                    Kg
                  </h4>
                ))}
            </div>
          </div>
        </div>
    </div>
  )
}
