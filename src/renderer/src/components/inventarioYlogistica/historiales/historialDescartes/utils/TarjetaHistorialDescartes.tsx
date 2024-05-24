/* eslint-disable prettier/prettier */
import { format } from 'date-fns'
import { historialDescarteType } from '../types/historialDescartes'
import { sumatoriaHistorialDescartes } from '../function/sumatorias'
import { ImNext2 } from 'react-icons/im'
import { ImPrevious2 } from 'react-icons/im'
import { useState } from 'react'
import { llavesVisualizar } from '../function/llaves'
import { RiArrowDropDownFill } from "react-icons/ri";
import { RiArrowDropUpFill } from "react-icons/ri";
import { es } from 'date-fns/locale';

type propsType = {
  theme: string
  user: string
  lote: historialDescarteType
}

export default function TarjetaHistorialDescartes(props: propsType): JSX.Element {
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [showClientDetails, setShowClientDetails] = useState<boolean>(false);
  if (props.lote) {
    return (
      <div className='historial-descarte-tarjeta-container'>
        <div className='historial-descarte-tarjeta-div'>
          <div className='historial-descarte-tarjeta-info-div1'>
            <div>
              {/* <h3>
                  Tipo de fruta:
                </h3>
                <h4>
                  {props.lote.tipoFruta}
                </h4> */}
            </div>
            <div>
              <h3>
                Fecha:
              </h3>
              <h4>
                {format(new Date(props.lote.fecha), 'dd/MM/yyyy HH:mm', { locale: es })}
              </h4>
            </div>
            <div>
              <h3>
                Kilos:
              </h3>
              <h4>
                {sumatoriaHistorialDescartes(props.lote).toLocaleString('es-ES')} Kg
              </h4>
            </div>
            <div>
              <h3>
                Accion:
              </h3>
              <h4>
                {props.lote.accion}
              </h4>
            </div>
            {showClientDetails ?
              <div >
                <div className='historial-descarte-tarjeta-info-div1'>
                  <h3>
                    Cliente:
                  </h3>
                  <h4>
                    {props.lote.cliente}
                  </h4>
                </div>
                <div>
                  <h3>
                    Cedula:
                  </h3>
                  <h4>
                    {props.lote.cedula}
                  </h4>
                </div>
                <div>
                  <h3>
                    Telefono:
                  </h3>
                  <h4>
                    {props.lote.telefono}
                  </h4>
                </div>
                <div>
                  <h3>
                    Remision:
                  </h3>
                  <h4>
                    {props.lote.remision}
                  </h4>
                </div>
                <div>
                  <h3>
                    Nombre conductor:
                  </h3>
                  <h4>
                    {props.lote.nombreConductor}
                  </h4>
                </div>
                <div className='historial-descarte-tarjeta-button1-info'>
                  <button onClick={(): void => setShowClientDetails(false)}>
                    <RiArrowDropUpFill />
                  </button>
                </div>
              </div> :

              <div className='historial-descarte-tarjeta-button1-info'>
                <button onClick={(): void => setShowClientDetails(true)}>
                  <RiArrowDropDownFill />
                </button>
              </div>

            }
          </div>
          {showDetails && (

            <div className='historial-descarte-tarjeta-div2'>
              {Object.keys(props.lote.predios).map((enf) => {
                if (enf !== 'fecha') {
                  return (
                    <div key={enf} className='historial-descarte-tarjeta-div3'>
                      <div className='historial-descarte-tarjeta-div3-ef1'>
                        <h4>
                          {enf}
                        </h4>
                      </div>
                      <div className='historial-descarte-tarjeta-div3-info'>
                        <h4>
                          {props.lote.predios[enf].descarteLavado && 'Descarte lavado:'}
                        </h4>
                        <div className='historial-descarte-tarjeta-div3-descarte'>
                          {props.lote.predios[enf].descarteLavado &&
                            Object.keys(props.lote.predios[enf].descarteLavado).map(item => (
                              <div key={item}>
                                <p>
                                  {llavesVisualizar[item]}:
                                </p>
                                <p>
                                  {props.lote.predios[enf].descarteLavado[item]} Kg
                                </p>
                              </div>
                            ))
                          }
                        </div>
                        <h4>
                          {props.lote.predios[enf].descarteEncerado && 'Descarte encerado:'}
                        </h4>
                        <div className='historial-descarte-tarjeta-div3-descarte'>
                          {props.lote.predios[enf].descarteEncerado &&
                            Object.keys(props.lote.predios[enf].descarteEncerado).map(item => (
                              <div key={item}>
                                <p>
                                  {llavesVisualizar[item]}:
                                </p>
                                <p>
                                  {props.lote.predios[enf].descarteEncerado[item]} Kg
                                </p>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                      <hr />
                    </div>

                  )
                } else return null
              })}
            </div>

          )}
        </div>
        <div className='historial-descarte-tarjeta-button2-info' onClick={(): void => setShowDetails(!showDetails)}>
          {showDetails ? <ImPrevious2 /> : <ImNext2 />}
        </div>
      </div>
    )
  } else {
    return <div></div>
  }
}
