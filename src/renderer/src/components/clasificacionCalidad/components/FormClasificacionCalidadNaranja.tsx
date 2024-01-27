/* eslint-disable prettier/prettier */
import { useContext } from 'react'
import TarjetaItemCLasificacionCalidad from '../utils/TarjetaItemCLasificacionCalidad'
import { formNaranjaContext } from './TablaClasificacionCalidad'
import { themeContext } from '@renderer/App'

type propsType = {
  handleChange: (data:string, type:string, dataCard:string) => void
  tipoFuta: string
}

export default function FormClasificacionCalidadNaranja(props: propsType): JSX.Element {
  const theme = useContext(themeContext)
  const formulario = useContext(formNaranjaContext)
  return (
    <div
      className={`flex flex-wrap m-4 rounded-lg p-4 justify-center items-center
    ${theme === 'Dark' ? 'bg-gray-600' : 'bg-gray-200'}`}
    >
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