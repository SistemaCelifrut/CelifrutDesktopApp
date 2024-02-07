/* eslint-disable prettier/prettier */
import { themeContext } from '@renderer/App'
import { useContext, useEffect, useState } from 'react'
import SuccessModal from '@renderer/errors/modal/SuccessModal';
import ErrorModal from '@renderer/errors/modal/ErrorModal';
import { proveedoresType } from './types/type';



export default function IngresoFruta(): JSX.Element {
  const theme = useContext(themeContext);
  const [prediosDatos, setPrediosData] = useState<proveedoresType[]>([])
  const [nombrePredio, setNombrePredio] = useState('')
  const [tipoFruta, setTipoFruta] = useState('')
  const [canastillas, setCanastillas] = useState('')
  const [canastillasVacias, setCanastillasVacias] = useState('')
  const [kilos, setKilos] = useState('')
  const [placa, setPlaca] = useState('')
  const [observaciones, setObservaciones] = useState('')
  const [enf, setEnf] = useState(0)
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>('Error al crear Lote')

  useEffect(() => {
    const obtenerPredios = async (): Promise<void> => {
      const request = { action: 'obtenerProveedores' }
      const response = await window.api.proceso(request);
      if (Array.isArray(response.data) && response.status === 200) {
        
        setPrediosData(response.data)
        setEnf(response.enf)
      } else {
        setMessageError(`Error ${response.status}: ${response.message}`);
        setShowError(true)
        setTimeout(() => {
          setShowError(false);
        }, 5000);
      }
    }
    obtenerPredios()
  }, [])
  useEffect(() => {
    console.log("render")
  }, [canastillas])
  const handlePrediosChange = (event): void => {
    setNombrePredio(event.target.value)
  }
  const guardarLote: React.FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      event.preventDefault()
      const datos = {
        predio: nombrePredio,
        canastillas: canastillas,
        kilos: kilos,
        placa: placa,
        tipoFruta: tipoFruta,
        observaciones: observaciones,
        promedio: parseFloat(kilos) / parseFloat(canastillas),
        canastillasVacias: canastillasVacias
      }

      if (datos.promedio < 15 || datos.promedio > 30) {
        setMessageError('Error, los kilos no corresponden a las canastillas')
        setShowError(true)
        setTimeout(() => {
          setShowError(false);
        }, 5000);
        return
      }

      if (!datos.tipoFruta) {
        setMessageError('Seleccione el tipo de fruta del lote')
        setShowError(true)
        setTimeout(() => {
          setShowError(false);
        }, 5000);
        return
      }
      const request = { action: 'guardarLote', data: datos }
      const response = await window.api.proceso(request)
      console.log(response)
      if (response.status === 200) {
        setShowSuccess(true)
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      } else {
        setMessageError(`Error ${response.status}: ${response.message}`);
        setShowError(true)
        setTimeout(() => {
          setShowError(false);
        }, 5000);
      }

      reiniciarCampos()
    } catch (e) {
      setMessageError('Recepcion' + e)
      setShowError(true)
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  }
  const reiniciarCampos = (): void => {
    setNombrePredio('')
    setCanastillas('')
    setKilos('')
    setPlaca('')
    setObservaciones('')
    setCanastillasVacias('')
  }
  const closeSuccess = (): void => {
    setShowSuccess(false)
  }
  const closeError = (): void => {
    setShowError(false)
  }

  return (
    <form className="grid grid-cols-12 gap-2 w-full h-max" onSubmit={guardarLote}>
      <div className="col-span-12 w-full flex flex-col justify-center items-center mt-4">
        <h2 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-2xl`}>
          Recepción
        </h2>
        <h3 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-xl`}>
          EF1-{new Date().getFullYear().toString().slice(-2)}{(new Date().getMonth() + 1).toString().padStart(2, '0')}{enf}
        </h3>
      </div>
      <div className="col-span-2"></div>

      <div
        className={`col-span-8 relative inline-flex first-letter ${theme === 'Dark' ? 'bg-dark-primary' : 'bg-white'
          } mt-3`}
      >
        <select
          onChange={handlePrediosChange}
          required
          value={nombrePredio}
          className={`border focus:outline-none appearance-none w-full rounded-md h-10 pl-5 pr-10
                            ${theme === 'Dark'
              ? 'border-white bg-slate-800 text-white'
              : 'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '
            }`}
        >
          <option>Predios</option>
          {prediosDatos.map((item, index) => (
            <option key={item.PREDIO + index} value={item._id}>{item.PREDIO}</option>
          ))}
        </select>
      </div>
      <div className="col-span-2"></div>
      <div className="col-span-2"></div>
      <div className="col-span-4 mt-3 mr-2">
        <label htmlFor="" className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Número de canastillas
        </label>
        <input
          value={canastillas}
          type="number"
          min={0}
          onChange={(e): void => setCanastillas(e.target.value)}
          required
          className={`border focus:outline-none appearance-none w-full rounded-md h-10 pl-5 pr-10
                            ${theme === 'Dark'
              ? 'border-white bg-slate-800 text-white'
              : 'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '
            }`}
        />
      </div>
      <div className="col-span-4 mt-3">
        <label htmlFor="" className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Kilos
        </label>
        <input
          value={kilos}
          type="number"
          onChange={(e): void => setKilos(e.target.value)}
          min={0}
          step={0.1}
          required
          className={`border focus:outline-none appearance-none w-full rounded-md h-10 pl-5 pr-10
                            ${theme === 'Dark'
              ? 'border-white bg-slate-800 text-white'
              : 'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '
            }`}
        />
      </div>
      <div className="col-span-2"></div>
      <div className="col-span-2"></div>
      <div className="col-span-4 mt-3 mr-2">
        <label htmlFor="" className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Placa
        </label>
        <input
    value={placa}
    type="text"
    onChange={(e): void => setPlaca(e.target.value.toUpperCase())}
    pattern="^[A-Za-z]{3}[0-9]{3}$"
    title="Por favor, introduce 3 letras seguidas de 3 números."
    required
    className={`border focus:outline-none appearance-none w-full rounded-md h-10 pl-5 pr-10
                      ${theme === 'Dark'
        ? 'border-white bg-slate-800 text-white'
        : 'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '
      }`}
  />
      </div>
      <div className="col-span-4 mt-3">
        <label htmlFor="" className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Canastillas vacías
        </label>
        <input
          type="text"
          value={canastillasVacias}
          onChange={(e): void => setCanastillasVacias(e.target.value)}
          required
          className={`border focus:outline-none appearance-none w-full rounded-md h-10 pl-5 pr-10
                            ${theme === 'Dark'
              ? 'border-white bg-slate-800 text-white'
              : 'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '
            }`}
        />
      </div>
      <div className="col-span-2"></div>
      <div className="col-span-2"></div>
      <div className="col-span-8 mt-3 flex justify-center items-center gap-5 flex-col">
        <h3 className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>Tipo de fruta</h3>
        <div className="flex gap-5">
          {' '}
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="radio"
              className="form-radio text-orange-600"
              name="fruit"
              value="naranja"
              onChange={(): void => setTipoFruta('Naranja')}
            />
            <span className="ml-2">Naranja</span>
          </label>
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="radio"
              className="form-radio text-green-600"
              name="fruit"
              value="limon"
              onChange={(): void => setTipoFruta('Limon')}
            />
            <span className="ml-2">Limón</span>
          </label>
        </div>
      </div>
      <div className="col-span-2"></div>
      <div className="col-span-2"></div>
      <div className="col-span-8 mt-3">
        <label htmlFor="" className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Observaciones
        </label>
        <textarea
          onChange={(e): void => setObservaciones(e.target.value)}
          required
          value={observaciones}
          className={`border focus:outline-none appearance-none w-full rounded-md h-20 pl-5 pr-10 mt-2 pt-2
                            ${theme === 'Dark'
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
      {showSuccess &&
        <div className='fixed bottom-0 right-0 flex items-center justify-center'>
          <SuccessModal theme={theme} message={"Guardado con Exito"} closeModal={closeSuccess} />
        </div>
      }
      {showError &&
        <div className='fixed bottom-0 right-0 flex items-center justify-center'>
          <ErrorModal theme={theme} closeModal={closeError} message={messageError} />
        </div>
      }

    </form>
  )
}
