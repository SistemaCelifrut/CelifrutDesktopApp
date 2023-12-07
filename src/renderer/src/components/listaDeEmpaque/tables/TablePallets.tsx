import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ContenedoresObj } from '../types/types'
import InfoPalletsListaEmpaque from '../functions/InfoPalletsListaEmpaque'
import { themeType } from '@renderer/env'

type propsType = {
  contenedor: ContenedoresObj
  filtro: string
  theme: themeType
}

export default function TablePallets(props: propsType) {
  const [tabla, setTabla] = useState({})

  useEffect(() => {
    const response = InfoPalletsListaEmpaque(props.contenedor, props.filtro)
    setTabla(response)
  }, [props.contenedor, props.filtro])

  return (
    <div>
      {Object.keys(tabla).map((pallet) => (
        <ul
          key={pallet + 'div'}
          className={`${props.theme === 'Dark' ? 'bg-slate-700' : 'bg-slate-100'}
            list-none ml-3 mr-3 mb-5 border border-gray-300 rounded shadow-md p-2`}
        >
          <li>
            <div
              className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}
                                    font-bold text-xl mb-4`}
            >
              {props.contenedor.infoContenedor?.tipoEmpaque === 'Caja' ? 'Pallet: ' : 'Estiba: '}
              {pallet}
            </div>
            <ul className="ml-4">
              {Object.keys(tabla[pallet]).map((enf) => (
                <li
                  className={`${
                    props.theme === 'Dark' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-black'
                  }
                              p-4 rounded-md mb-2`}
                >
                  <div className={`flex flex-row gap-5 items-center`}>
                    <p
                      className={`${
                        props.theme === 'Dark' ? 'text-white' : 'text-blue-500'
                      } font-bold`}
                    >
                      {enf}
                    </p>
                    <p
                      className={`${
                        props.theme === 'Dark' ? 'text-white' : 'text-blue-500'
                      } font-bold`}
                    >
                      {tabla[pallet][enf].length > 0 ? tabla[pallet][enf][0][0] : null} :
                    </p>
                  </div>
                  {Object.keys(tabla[pallet][enf]).map((item) => {
                    if (tabla[pallet][enf].length > 0) {
                      return (
                        <div className="flex flex-row gap-5 items-center">
                          <p>
                            {props.contenedor.infoContenedor?.tipoEmpaque === 'Caja'
                              ? 'Cajas: '
                              : 'Sacos: '}
                            {tabla[pallet][enf][item][1]}
                          </p>
                          <p>
                            Tipo{' '}
                            {props.contenedor.infoContenedor?.tipoEmpaque === 'Caja'
                              ? 'Cajas: '
                              : 'Sacos: '}{' '}
                            {tabla[pallet][enf][item][2]}
                          </p>
                          <p>Calibre: {tabla[pallet][enf][item][3]}</p>
                          <p>Calidad: {tabla[pallet][enf][item][4]}</p>
                          <p>
                            Fecha: {format(new Date(tabla[pallet][enf][item][5]), 'dd-MM-yyyy')}
                          </p>
                        </div>
                      )
                    } else {
                      return null
                    }
                  })}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      ))}
    </div>
  )
}
