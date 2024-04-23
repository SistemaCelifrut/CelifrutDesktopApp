/* eslint-disable prettier/prettier */
import { useContext } from 'react'
import TarjetaItemCLasificacionCalidad from '../utils/TarjetaItemCLasificacionCalidad'
import { formLimonContext } from './TablaClasificacionCalidad'
import { themeContext } from '@renderer/App'

type propsType = {
  handleChange: (data:string, type:string, dataCard:string) => void
  tipoFuta: string
}

export default function FormClasificacionCalidadLimon(props: propsType): JSX.Element {
  const theme = useContext(themeContext)
  const formulario = useContext(formLimonContext)
  return (
    <div className='ingresar-clasificacion-calidad-tarjetas-container'>
      {formulario.map((item, index) => (
        <TarjetaItemCLasificacionCalidad
        key={index}
        tipoFruta={props.tipoFuta}
          theme={theme}
          index={index}
          cardInfo={item}
          handleChange={props.handleChange}
        />
      ))}
    </div>
  )
}
