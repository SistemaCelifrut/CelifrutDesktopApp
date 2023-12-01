import { descarteType } from '../types/descartes'
import { useEffect } from 'react'

type propsType = {
  theme: string
  user: string
  lote: descarteType
  seleccionarItems: (e: any) => void
  seleccionarVariosItems: (items: any) => void
  respawn: boolean
}

export default function TarjetaInvetarioDescartes(props: propsType) {
  if (props.lote) {
    const seleccionarLote = (e) => {
      const buttons = document.getElementsByClassName(props.lote.enf + 'descarteCheckbox')
      if (e.target.checked) {
        for (let i of buttons) {
          ;(i as HTMLInputElement).checked = true
        }
      } else {
        for (let i of buttons) {
          ;(i as HTMLInputElement).checked = false
        }
      }
      props.seleccionarVariosItems(buttons)
    }

    useEffect(() => {
      const buttons = document.querySelectorAll('input')
      for (let i of buttons) {
        ;(i as HTMLInputElement).checked = false
      }
    }, [props.respawn])

    return (
      <div
        className={`m-2 rounded-xl overflow-hidden border-l-2 ${
          props.theme === 'Dark' ? '' : 'border-blue-400'
        }`}
      >
        <div
          className={`${
            props.theme === 'Dark' ? 'bg-slate-500' : 'bg-slate-100 shadow-lg'
          } w-full p-2 pl-4 flex gap-4`}
        >
          <div className="mt-5">
            <div className="flex flex-row gap-4">
              <input type="checkbox" onClick={seleccionarLote} />
              <h4 className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} font-bold`}>
                {props.lote.enf}
              </h4>
            </div>
            <h5 className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} ml-5`}>
              {props.lote.nombre}
            </h5>
            <h5
              className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} ml-5 font-bold`}
            >
              Tipo de fruta:
            </h5>
            <h5 className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} ml-16`}>
              {props.lote.tipoFruta}
            </h5>
          </div>
          <div
            className={` border-l-2 my-2 mr-4 p-3 rounded-lg w-full ${
              props.theme === 'Dark' ? 'bg-slate-800' : 'bg-white'
            }`}
          >
            <div className="flex flex-col gap-5 w-max">
              <div className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} ml-8 w-full`}>
                <h4 className={`font-bold`}>Descarte Lavado:</h4>
                <div className={`flex flex-row gap-4`}>
                  {Object.keys(props.lote.descarteLavado).map((item) => (
                    <div className={`flex flex-row gap-4 items-center`}>
                      <p>
                        <span className={`font-bold`}> {item}:</span>{' '}
                        {props.lote.descarteLavado[item]} Kg
                      </p>
                      <input
                        type="checkbox"
                        onClick={props.seleccionarItems}
                        value={props.lote.enf + '/' + 'descarteLavado' + '/' + item}
                        className={`${props.lote.enf}descarteCheckbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} ml-8`}>
                <h4 className={`font-bold`}>Descarte Encerado:</h4>
                <div className={`flex flex-row gap-4 `}>
                  {Object.keys(props.lote.descarteEncerado).map((item) => (
                    <div className={`flex flex-row gap-4 items-center`}>
                      <p>
                        <span className={`font-bold`}> {item}:</span>{' '}
                        {props.lote.descarteEncerado[item]} Kg
                      </p>
                      <input
                        type="checkbox"
                        onClick={props.seleccionarItems}
                        value={props.lote.enf + '/' + 'descarteEncerado' + '/' + item}
                        className={`${props.lote.enf}descarteCheckbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}
