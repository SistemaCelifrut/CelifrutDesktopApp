/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react'
import { themeType } from '@renderer/env'
import ObtenerPrediosContenedor from '../functions/ObtenerPrediosContenedor'
import { contenedoresType } from '@renderer/types/contenedoresType'

type propsType = {
  theme: themeType
  contenedor: contenedoresType | undefined
  setFiltro: (data: string) => void
  setFiltro2: (data: string) => void
}

export default function FiltrosListaEmpaque(props: propsType): JSX.Element {
  const [value1, setValue1] = useState<string>('')

  const [predios, setPredios] = useState<string[]>([])

  useEffect(()=>{
    console.log("awswads", props.contenedor)
  }, [])

  const handleFiltro1 = (e): void => {
    props.setFiltro(e.target.value)
    setValue1(e.target.value)
  }

  const handleFiltro2 = (e): void => {
    props.setFiltro2(e.target.value)
  }

  useEffect(() => {
    if(props.contenedor){
      const response: string[] = ObtenerPrediosContenedor(props.contenedor)
      console.log("filtros component",response)
      setPredios(response)
    }
  }, [value1])

  return (
    <div className="m-4">
      <p className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}>
        Opciones de busqueda
      </p>
      <hr />
      <div className="m-2">
        <select
          onChange={handleFiltro1}
          className={`border focus:outline-none appearance-none w-38 mr-5 rounded-md h-10 pl-5 pr-10
                          ${'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '}`}
        >
          <option value={''}>None</option>
          {props.contenedor && (
            <>
              <option value={'predio'}>Predios</option>
              <option value={'pallet'}>
                {props.contenedor && props.contenedor.infoContenedor.tipoEmpaque === 'Caja'
                  ? 'Pallets'
                  : 'Estibas'}
              </option>
            </>
          )}
        </select>

        <select
          onChange={handleFiltro2}
          className={`border focus:outline-none appearance-none w-38 mr-5 rounded-md h-10 pl-5 pr-10
                          ${'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '}`}
        >
          <option value={''}>None</option>
          {props.contenedor && value1 === 'pallet'
            ? Object.keys(props.contenedor.pallets).map((pallet) => (
                <option key={pallet} value={pallet}>
                  {pallet}
                </option>
              ))
            : null}

          {props.contenedor && value1 === 'predio'
            ? predios.map((enf) => (
                <option key={enf} value={enf}>
                  {enf}
                </option>
              ))
            : null}
        </select>
      </div>
    </div>
  )
}
