/* eslint-disable prettier/prettier */
import { useContext } from 'react'
import TarjetaItemCLasificacionCalidad from '../utils/TarjetaItemCLasificacionCalidad'
import { formNaranjaContext } from './TablaClasificacionCalidad'
import { themeContext } from '@renderer/App'

type propsType = {
  handleChange: (data:string, type:string, dataCard:string) => void
  tipoFruta: string
}

export default function FormClasificacionCalidadNaranja(props: propsType): JSX.Element {
  const theme = useContext(themeContext)
  const formulario = useContext(formNaranjaContext)
  return (
    <div className='ingresar-clasificacion-calidad-tarjetas-container'>
      {formulario.map((item, index) => (
        <TarjetaItemCLasificacionCalidad
          key={index}
          tipoFruta={props.tipoFruta}
          theme={theme}
          index={index}
          cardInfo={item}
          handleChange={props.handleChange}
        />
      ))}
    </div>
  )
}