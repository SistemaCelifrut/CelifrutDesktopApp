/* eslint-disable prettier/prettier */
import { useContext, useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ContenedoresObj } from '../types/types'
import InfoPalletsListaEmpaque from '../functions/InfoPalletsListaEmpaque'
import { themeType } from '@renderer/env'
import { FaPrint } from "react-icons/fa6";
import { userContext } from '@renderer/App'


type propsType = {
  contenedor: ContenedoresObj
  filtro: string
  theme: themeType
}

export default function TablePallets(props: propsType): JSX.Element {
  const [tabla, setTabla] = useState({})
  const user = useContext(userContext);

  useEffect(() => {
    const response = InfoPalletsListaEmpaque(props.contenedor, props.filtro)
    console.log(response)
    setTabla(response)
  }, [props.contenedor, props.filtro])

  const handleImprimir = (pallet): void => {
    const data = {
      tipoRotulo: 'rotuloPallet',
      pallet: pallet
    }
    window.api.imprimirRotulos(data);
  }

  return (
    <div>
      {Object.keys(tabla).map((pallet) => (
        <ul
          key={pallet + 'div'}
          className={`${props.theme === 'Dark' ? 'bg-slate-700' : 'bg-slate-100'}
            list-none ml-3 mr-3 mb-5 border border-gray-300 rounded shadow-md p-2`}
        >
          <li>
            <div className='flex flex-row justify-between p-2'>
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
                }, 0)).toFixed(2)}Kg
              </div>
              {user.cargo === 'auxiliar_lista_de_empaque' &&
                <button
                  onClick={(): void => handleImprimir(pallet)}
                  className={
                    user.cargo === 'auxiliar_lista_de_empaque' || user.cargo === 'admin'
                      ? 'group relative inline-flex w-40 h-10 items-center overflow-hidden rounded bg-red-700 px-8 py-3 text-white focus:outline-none active:bg-red-900 active:border-red-700'
                      : 'invisible group relative inline-flex w-40 h-10 items-center overflow-hidden'
                  }
                >
                  <span className="absolute  -end-full transition-all group-hover:end-4">
                    <FaPrint />
                  </span>

                  <span className="text-sm font-medium transition-all group-hover:me-4">
                    Imprimir Rotulo
                  </span>
                </button>
              }
            </div>
            <ul className="ml-4">
              {tabla[pallet].map((enf) => (
                <li
                  key={enf}
                  className={`${props.theme === 'Dark' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-black'
                    }
                              p-4 rounded-md mb-2`}
                >
                  <div className={`flex flex-row gap-5 items-center`}>
                    <p
                      className={`${props.theme === 'Dark' ? 'text-white' : 'text-blue-500'
                        } font-bold`}
                    >
                      {enf.id}
                    </p>
                    <p
                      className={`${props.theme === 'Dark' ? 'text-white' : 'text-blue-500'
                        } font-bold`}
                    >
                      {enf.nombre}
                    </p>
                    <p
                      className={`${props.theme === 'Dark' ? 'text-white' : 'text-blue-500'
                        } font-bold`}
                    >
                      {enf.cajas} Cajas
                    </p>
                    <p
                      className={`${props.theme === 'Dark' ? 'text-white' : 'text-blue-500'
                        } font-bold`}
                    >
                      {enf.tipoCaja}
                    </p>
                    <p
                      className={`${props.theme === 'Dark' ? 'text-white' : 'text-blue-500'
                        } font-bold`}
                    >
                      Calibre: {enf.calibre}
                    </p>
                    <p
                      className={`${props.theme === 'Dark' ? 'text-white' : 'text-blue-500'
                        } font-bold`}
                    >
                      Calidad:{enf.calidad}
                    </p>
                    <p
                      className={`${props.theme === 'Dark' ? 'text-white' : 'text-blue-500'
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
