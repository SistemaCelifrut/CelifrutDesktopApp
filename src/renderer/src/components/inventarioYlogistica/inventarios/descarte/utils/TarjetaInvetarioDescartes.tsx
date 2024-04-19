/* eslint-disable prettier/prettier */
import { lotesType } from '@renderer/types/lotesType'
import { llavesVisualizar } from '../function/llaves'
import { useEffect } from 'react'

type propsType = {
  lote: lotesType
  seleccionarItems: (e: unknown) => void
  seleccionarVariosItems: (items: unknown) => void
  respawn: boolean
}

export default function TarjetaInvetarioDescartes(props: propsType): JSX.Element {
  if (props.lote) {
    const seleccionarLote = (e): void => {
      const buttons = document.getElementsByClassName(props.lote._id + 'descarteCheckbox')
      if (e.target.checked) {
        for (const i of buttons) {
          ;(i as HTMLInputElement).checked = true
        }
      } else {
        for (const i of buttons) {
          ;(i as HTMLInputElement).checked = false
        }
      }
      props.seleccionarVariosItems(buttons)
    }

    useEffect(() => {
      const buttons = document.querySelectorAll('input')
      for (const i of buttons) {
        ;(i as HTMLInputElement).checked = false
      }
    }, [props.respawn])

    return (
      <div className="inventario-descartes-tarjeta-container">
        <div className="inventario-descartes-tarjeta-info-div">
          <div className="inventario-descartes-tarjeta-info-div2">
            <div className="inventario-descartes-tarjeta-info-div-checkbox">
              <input type="checkbox" onClick={seleccionarLote} />
              <h4>{props.lote.enf}</h4>
            </div><h5>{props.lote.predio && props.lote.predio.PREDIO}
            </h5>
            <h3>Tipo de fruta:</h3>
            <h5>{props.lote.tipoFruta}</h5>
          </div>
          <div className='inventario-descartes-tarjeta-descarte-div'>
            <div>
              <div>
                <h4>Descarte Lavado:</h4>
                <div className="inventario-descartes-tarjeta-descarte-lavado">
                  {props.lote.inventarioActual && props.lote.inventarioActual.descarteLavado && Object.keys(props.lote.inventarioActual.descarteLavado).map((item) => (
                    <div key={item}>
                      <p>
                        <span> {llavesVisualizar[item]}:</span>{' '}
                        {props.lote.inventarioActual && props.lote.inventarioActual.descarteLavado && props.lote.inventarioActual.descarteLavado[item]} Kg
                      </p>
                      <input
                        type="checkbox"
                        onClick={props.seleccionarItems}
                        value={props.lote._id + '/' + 'descarteLavado' + '/' + item}
                        className={`${props.lote._id}descarteCheckbox`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4>Descarte Encerado:</h4>
                <div className="inventario-descartes-tarjeta-descarte-lavado">
                  {props.lote.inventarioActual && props.lote.inventarioActual.descarteEncerado && Object.keys(props.lote.inventarioActual.descarteEncerado).map((item) => (
                    <div  key={item}>
                      <p>
                        <span> {llavesVisualizar[item]}:</span>{' '}
                        {props.lote.inventarioActual && props.lote.inventarioActual.descarteEncerado && props.lote.inventarioActual.descarteEncerado[item].toLocaleString('es-ES')} Kg
                      </p>
                      <input
                        type="checkbox"
                        onClick={props.seleccionarItems}
                        value={props.lote._id + '/' + 'descarteEncerado' + '/' + item}
                        className={`${props.lote._id}descarteCheckbox`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return <div></div>
  }
}
