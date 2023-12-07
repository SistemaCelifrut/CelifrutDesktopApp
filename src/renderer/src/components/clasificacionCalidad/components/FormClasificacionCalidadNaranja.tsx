import { themeType } from '@renderer/env'
import { useContext } from 'react'
import TarjetaItemCLasificacionCalidad from '../utils/TarjetaItemCLasificacionCalidad'
import { formNaranjaContext } from './TablaClasificacionCalidad'

type propsType = {
  theme: themeType
  handleChange: (data:string, type:string, dataCard:string) => void
  tipoFuta: string
}

export default function FormClasificacionCalidadNaranja(props: propsType) {
  const formulario = useContext(formNaranjaContext)
  return (
    <div
      className={`flex flex-wrap m-4 rounded-lg p-4 justify-center items-center
    ${props.theme === 'Dark' ? 'bg-gray-600' : 'bg-gray-200'}`}
    >
      {formulario.map((item, index) => (
        <TarjetaItemCLasificacionCalidad
          tipoFruta={props.tipoFuta}
          theme={props.theme}
          index={index}
          cardInfo={item}
          handleChange={props.handleChange}
        />
      ))}
    </div>
  )
}