/* eslint-disable prettier/prettier */
import { themeType } from '@renderer/env'
import { calidadInternaType } from '../types/calidadInterna'

type propsType = {
  theme: themeType
  user: string
  handleChange: (data: React.ChangeEvent<HTMLInputElement>, action: string) => void
  formulario: calidadInternaType
}

export default function ContenidoZumo(props: propsType): JSX.Element {
  const calcularPorcentaje = (): string => {
    const pesoInicial = parseFloat(props.formulario.pesoInicial)
    const pesoZumo = parseFloat(props.formulario.zumo)
    if (isNaN(pesoInicial) || isNaN(pesoZumo) || pesoInicial === 0) {
      return 'N/A'
    }
    const porcentaje = (pesoZumo / pesoInicial) * 100
    return porcentaje.toFixed(2)
  }

  return (
    <div
      className={`${props.theme === 'Dark' ? 'bg-slate-500' : 'bg-slate-100'} 
                        flex flex-col gap-4 w-[470] p-4 rounded-lg shadow-lg m-4`}
    >
      <h2
        className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}
                        text-xl font-bold mb-4 text-center`}
      >
        Contenido Zumo
      </h2>
      <input
        className={`rounded-lg h-10 pl-2`}
        type="number"
        placeholder="Peso inicial muestra (gr)"
        onChange={(e): void => props.handleChange(e, 'pesoInicial')}
        value={props.formulario.pesoInicial}
      />
      <input
        className="rounded-lg h-10 pl-2"
        type="number"
        placeholder="Peso zumo (gr)"
        onChange={(e): void => props.handleChange(e, 'zumo')}
        value={props.formulario.zumo}
      />
      <div className="checkBoxContainer">
        <label
          htmlFor="semillas"
          className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}
                        text-xl font-bold mb-4 text-center mr-2`}
        >
          Semillas
        </label>
        <input
          id="semillas"
          type="checkbox"
          className="w-10 h-4"
          onChange={(e): void => props.handleChange(e, 'semillas')}
        />
      </div>
      <p
        className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}
                        text-xl mb-4 text-center`}
      >
        Porcentaje de Llenado de Contenido Zumo: {calcularPorcentaje()}%
      </p>
    </div>
  )
}
