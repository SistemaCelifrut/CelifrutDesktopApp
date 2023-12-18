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
    console.log(response)
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
              {pallet} -- {(tabla[pallet].reduce((acu, item) => acu += item.cajas, 0))} cajas
              ---
              {(tabla[pallet].reduce((acu, item) => {
                    const tipoCaja = item.tipoCaja.replace('.', '_');

                acu += item.cajas * props.contenedor.infoContenedor.pesoCaja[tipoCaja]
                return acu
              }, 0))}Kg
              {console.log()}
            </div>
            <ul className="ml-4">
              {tabla[pallet].map((enf) => (
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
                      {enf.id}
                    </p>
                    <p
                      className={`${
                        props.theme === 'Dark' ? 'text-white' : 'text-blue-500'
                      } font-bold`}
                    >
                      {enf.nombre}
                    </p>
                    <p
                      className={`${
                        props.theme === 'Dark' ? 'text-white' : 'text-blue-500'
                      } font-bold`}
                    >
                      {enf.cajas} Cajas
                    </p>
                    <p
                      className={`${
                        props.theme === 'Dark' ? 'text-white' : 'text-blue-500'
                      } font-bold`}
                    >
                      {enf.tipoCaja}
                    </p>
                    <p
                      className={`${
                        props.theme === 'Dark' ? 'text-white' : 'text-blue-500'
                      } font-bold`}
                    >
                      Calibre: {enf.calibre}
                    </p>
                    <p
                      className={`${
                        props.theme === 'Dark' ? 'text-white' : 'text-blue-500'
                      } font-bold`}
                    >
                      Calidad:{enf.calidad}
                    </p>
                    <p
                      className={`${
                        props.theme === 'Dark' ? 'text-white' : 'text-blue-500'
                      } font-bold`}
                    >
                      {format(new Date(enf.fecha), 'dd-MM-yyyy')}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      ))}
    </div>
  )
}
