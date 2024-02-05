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
    <div
      key="key"
      className={`${props.theme === 'Dark' ? 'bg-slate-500' : 'bg-slate-100'} 
    flex flex-col gap-4 w-52 p-4 rounded-lg shadow-lg m-4 justify-center items-center`}
    >
      <h3
        className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}
                        text-sm font-bold text-center mb-1`}
      >
        {props.cardInfo.id}
      </h3>
      <div>
        <div>
          <div
            className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}
                        text-sm font-bold text-center`}
          >
            Lavado:
          </div>
          <input
            value={formulario[props.index].lavado}
            onChange={(e): void => props.handleChange(e.target.value, 'lavado', props.cardInfo.id)}
            className={`h-8  rounded-md pl-2 my-2 border-2 border-Celifrut-green`}
            type="number"
            placeholder="Lavado"
          />
        </div>
        <div className="column-container">
          <div
            className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}
                        text-sm font-bold text-center mb-1`}
          >
            Proceso:{' '}
          </div>
          <input
            value={formulario[props.index].proceso}
            onChange={(e): void => props.handleChange(e.target.value, 'proceso', props.cardInfo.id)}
            className={`h-8  rounded-md pl-2 my-2 border-2 border-Celifrut-green`}
            type="number"
            placeholder="Proceso"
          />
        </div>
      </div>
    </div>
  )
}

//

export default TarjetaItemCLasificacionCalidad
