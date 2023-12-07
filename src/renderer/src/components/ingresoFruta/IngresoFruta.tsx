import { themeType } from '@renderer/env'
import { responseIngresarPredio } from '@renderer/types/predios'
import { serverResponseType } from '@renderer/types/serverResponse'
import { useEffect, useState } from 'react'

type propsType = {
  theme: themeType
}

export default function IngresoFruta(props: propsType) {
  const [prediosDatos, setPrediosData] = useState<string[]>([''])
  const [nombrePredio, setNombrePredio] = useState('')
  const [tipoFruta, setTipoFruta] = useState('')
  const [canastillas, setCanastillas] = useState('')
  const [canastillasVacias, setCanastillasVacias] = useState('')
  const [kilos, setKilos] = useState('')
  const [placa, setPlaca] = useState('')
  const [observaciones, setObservaciones] = useState('')

  useEffect(() => {
    const obtenerPredios = async () => {
      const request = { action: 'obtenerProveedores' }
      const response: serverResponseType = await window.api.ingresoFruta(request)
      if (Array.isArray(response.data)) {
        const nombrePredios: responseIngresarPredio[] = response.data
        const nombrePredio = nombrePredios.map((item) => item.PREDIO)
        setPrediosData(nombrePredio)
      } else {
        alert('Error con los datos de los predios')
      }
    }
    obtenerPredios()
  }, [])

  useEffect(()=>{
    console.log("render")
  },[canastillas])

  const handlePrediosChange = (event) => {
    setNombrePredio(event.target.value)
  }

  const guardarLote:React.FormEventHandler<HTMLFormElement>  = async (event) => {
    try {
      event.preventDefault()
      let datos = {
        nombre: nombrePredio,
        canastillas: canastillas,
        kilos: kilos,
        placa: placa,
        tipoFruta: tipoFruta,
        observaciones: observaciones,
        promedio: parseFloat(kilos) / parseFloat(canastillas),
        canastillasVacias: canastillasVacias
      }

      if (datos.promedio < 15) {
        alert('Error, los kilos no corresponden a las canastillas')
        return
      }

      if (!datos.tipoFruta) {
        alert('Seleccione el tipo de fruta del lote')
        return
      }
      const request = { action: 'guardarLote', data: datos }
      const response: serverResponseType = await window.api.ingresoFruta(request)

      if (response.status === 200) {
        alert('Guardado con exito')
      } else {
        alert('Error al guardar el dato')
      }

      reiniciarCampos()
    } catch (e) {
      console.log('Recepcion' + e)
    }
  }

  const reiniciarCampos = () => {
    setNombrePredio('')
    setCanastillas('')
    setKilos('')
    setPlaca('')
    setObservaciones('')
    setCanastillasVacias('')
  }

  return (
    <form className="grid grid-cols-12 gap-2 w-full h-max" onSubmit={guardarLote}>
      <div className="col-span-12 w-full flex justify-center items-center mt-4">
        <h2 className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-2xl`}>
          Recepción
        </h2>
      </div>
      <div className="col-span-2"></div>
      {/*Ingreso de Predios*/}
      <div
        className={`col-span-8 relative inline-flex first-letter ${
          props.theme === 'Dark' ? 'bg-dark-primary' : 'bg-white'
        } mt-3`}
      >
        <select
          onChange={handlePrediosChange}
          required
          value={nombrePredio}
          className={`border focus:outline-none appearance-none w-full rounded-md h-10 pl-5 pr-10
                            ${
                              props.theme === 'Dark'
                                ? 'border-white bg-slate-800 text-white'
                                : 'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '
                            }`}
        >
          <option>Predios</option>
          {prediosDatos.map((item, index) => (
            <option key={item + index} value={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="col-span-2"></div>
      <div className="col-span-2"></div>
      <div className="col-span-4 mt-3 mr-2">
        <label htmlFor="" className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Numero de canastillas
        </label>
        <input
        value={canastillas}
          type="number"
          min={0}
          onChange={(e) => setCanastillas(e.target.value)}
          required
          className={`border focus:outline-none appearance-none w-full rounded-md h-10 pl-5 pr-10
                            ${
                              props.theme === 'Dark'
                                ? 'border-white bg-slate-800 text-white'
                                : 'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '
                            }`}
        />
      </div>
      <div className="col-span-4 mt-3">
        <label htmlFor="" className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Kilos
        </label>
        <input
        value={kilos}
          type="number"
          onChange={(e) => setKilos(e.target.value)}
          min={0}
          step={0.1}
          required
          className={`border focus:outline-none appearance-none w-full rounded-md h-10 pl-5 pr-10
                            ${
                              props.theme === 'Dark'
                                ? 'border-white bg-slate-800 text-white'
                                : 'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '
                            }`}
        />
      </div>
      <div className="col-span-2"></div>
      <div className="col-span-2"></div>
      <div className="col-span-4 mt-3 mr-2">
        <label htmlFor="" className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Placa
        </label>
        <input
        value={placa}
          type="text"
          onChange={(e) => setPlaca(e.target.value)}
          pattern="^[A-Za-z]{3}[0-9]{3}$"
          title="Por favor, introduce 3 letras seguidas de 3 números."
          required
          className={`border focus:outline-none appearance-none w-full rounded-md h-10 pl-5 pr-10
                            ${
                              props.theme === 'Dark'
                                ? 'border-white bg-slate-800 text-white'
                                : 'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '
                            }`}
        />
      </div>
      <div className="col-span-4 mt-3">
        <label htmlFor="" className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Canastillas vacias
        </label>
        <input
          type="text"
          value={canastillasVacias}
          onChange={(e) => setCanastillasVacias(e.target.value)}
          required
          className={`border focus:outline-none appearance-none w-full rounded-md h-10 pl-5 pr-10
                            ${
                              props.theme === 'Dark'
                                ? 'border-white bg-slate-800 text-white'
                                : 'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '
                            }`}
        />
      </div>
      <div className="col-span-2"></div>
      <div className="col-span-2"></div>
      <div className="col-span-8 mt-3 flex justify-center items-center gap-5 flex-col">
        <h3 className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}>Tipo de fruta</h3>
        <div className="flex gap-5">
          {' '}
          <label className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="radio"
              className="form-radio text-orange-600"
              name="fruit"
              value="naranja"
              onChange={() => setTipoFruta('Naranja')}
            />
            <span className="ml-2">Naranja</span>
          </label>
          <label className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="radio"
              className="form-radio text-green-600"
              name="fruit"
              value="limon"
              onChange={() => setTipoFruta('Limon')}
            />
            <span className="ml-2">Limón</span>
          </label>
        </div>
      </div>
      <div className="col-span-2"></div>
      <div className="col-span-2"></div>
      <div className="col-span-8 mt-3">
        <label htmlFor="" className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Observaciones
        </label>
        <textarea
          onChange={(e) => setObservaciones(e.target.value)}
          required
          value={observaciones}
          className={`border focus:outline-none appearance-none w-full rounded-md h-20 pl-5 pr-10 mt-2 pt-2
                            ${
                              props.theme === 'Dark'
                                ? 'border-white bg-slate-800 text-white'
                                : 'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '
                            }`}
        />
      </div>
      <div className="col-span-2"></div>
      <div className="col-span-2"></div>
      <div className="col-span-8 mt-3 flex justify-center items-center mb-4">
        <button
          type="submit"
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          Guardar
        </button>
      </div>
    </form>
  )
}
