/* eslint-disable prettier/prettier */
import { themeType } from '@renderer/env'
import { formularioType } from '../types/clasificacionTypes'
import { useContext, useEffect } from 'react'
import { formLimonContext, formNaranjaContext } from '../components/TablaClasificacionCalidad'

type propsType = {
  theme: themeType
  cardInfo: formularioType
  index: number
  handleChange: (data: string, type: string, dataCard: string) => void
  tipoFruta: string
}

function TarjetaItemCLasificacionCalidad(props: propsType): JSX.Element {
  const formulario = props.tipoFruta === 'Limon' ? useContext(formLimonContext) : useContext(formNaranjaContext)
  useEffect(() => {
  }, [formulario])
  
  
  return (
    <div key="key" className='ingresar-clasificacion-calidad-tarjeta-div'>
      <h3>
        {props.cardInfo.id}
      </h3>
      <div>
        <div>
          <h3>
            Lavado:
          </h3>
          <input
            value={formulario[props.index].lavado}
            onChange={(e): void => props.handleChange(e.target.value, 'lavado', props.cardInfo.id)}
            type="number"
            placeholder="Lavado"
            className='defaultSelect'

          />
        </div>
        <div className="column-container">
          <h3>
            Proceso:{' '}
          </h3>
          <input
            value={formulario[props.index].proceso}
            onChange={(e): void => props.handleChange(e.target.value, 'proceso', props.cardInfo.id)}
            type="number"
            placeholder="Proceso"
            className='defaultSelect'
          />
        </div>
      </div>
    </div>
  )
}

//

export default TarjetaItemCLasificacionCalidad
