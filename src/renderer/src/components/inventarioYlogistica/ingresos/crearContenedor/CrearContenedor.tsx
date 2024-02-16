/* eslint-disable prettier/prettier */
import { themeContext } from '@renderer/App'
import ErrorModal from '@renderer/errors/modal/ErrorModal'
import SuccessModal from '@renderer/errors/modal/SuccessModal'
import { useContext, useEffect, useState } from 'react'
import { crearObjetoContenedor } from './functions'
import { clienteType } from '@renderer/types/clientesType'
import { serverResponse } from '@renderer/env'

export default function CrearContenedor(): JSX.Element {
  let check = true
  const theme = useContext(themeContext)
  const [numeroContenedor, setNumeroContenedor] = useState<string>('')
  const [cliente, setCliente] = useState<string>('')
  const [tipoFruta, setTipoFruta] = useState<string>('')
  const [tipoEmpaque, setTipoEmpaque] = useState<string>('')
  const [pallets, setPallets] = useState<string>('')
  const [desverdizado, setDesverdizado] = useState<boolean>(false)
  const [observaciones, setObservaciones] = useState<string>('')
  const [fechaInicioProceso, setFechaInicioProceso] = useState<string>("")
  const [fechaEstimadaCargue, setFechaEstimadaCargue] = useState<string>("")
  const [calidad, setCalidad] = useState<string[]>([])
  const [clientesDatos, setClientesDatos] = useState<clienteType[]>([])
  const [message, setMessage] = useState<string>('')
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [showError, setShowError] = useState<boolean>(false)
  const [tipoCaja, setTipoCaja] = useState<string[]>([])
  const [calibres, setCalibres] = useState<string>('')

  useEffect(() => {
    const obtenerDatos = async (): Promise<void> => {
      if (check) {
        try {
          check = false
          const request = {
            data: {
              query: {}
            },
            collection: 'clientes',
            action: 'getClientes',
            query: 'proceso'
          }

          const response: serverResponse<clienteType[]> = await window.api.server(request)
          console.log(response)
          if (response.status === 200) {
            const nombreClientes = response.data
            setClientesDatos(nombreClientes)
          } else {
            setMessage(`Error ${response.status}: ${response.message}`)
            setShowError(true)
            setTimeout(() => {
              setShowError(false)
            }, 5000)
          }
        } catch (e: unknown) {
          alert(`Crear contenedor ${e}`)
        }
      }
    }
    obtenerDatos()
  }, [])

  const guardarDatos: React.FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      event.preventDefault()
      const datos = {
        cliente: cliente,
        numeroContenedor: Number(numeroContenedor),
        pallets: Number(pallets),
        tipoFruta: tipoFruta,
        desverdizado: desverdizado,
        observaciones: observaciones,
        tipoEmpaque: tipoEmpaque,
        fechaInicioProceso: fechaInicioProceso,
        fechaEstimadaCargue: fechaEstimadaCargue,
        calidad: calidad,
        tipoCaja: tipoCaja,
        calibres: calibres
      }
      const new_contenedor = crearObjetoContenedor(datos)
      const request = {
        data: new_contenedor,
        collection: 'contenedores',
        action: 'crearContenedor',
        query: 'proceso',
        record: 'crearContenedor'
      }
      console.log(request)

      const response = await window.api.server(request)
      if (response.status === 200) {
        setShowSuccess(true)
        setMessage('Contenedor creado con exito!')
        setInterval(() => {
          setShowSuccess(false)
        }, 5000)
      } else {
        setMessage(`Error ${response.status}: ${response.message}`)
        setShowError(true)
        setTimeout(() => {
          setShowError(false)
        }, 5000)
      }
      reiniciarCampos()
    } catch (e: unknown) {
      setMessage(`Error ${e}`)
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 5000)
    }
  }

  const reiniciarCampos = (): void => {
    setCliente('')
    setNumeroContenedor('')
    setPallets('')
    setDesverdizado(false)
    setObservaciones('')
    setFechaInicioProceso("")
    setFechaEstimadaCargue("")
    setCalidad([]) // Reiniciar campo de calidad
  }

  const handlePrediosChange = (event): void => {
    setCliente(event.target.value)
  }

  const handleCalidadChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedOption = event.target.value
    if (calidad.includes(selectedOption)) {
      // Si la opción seleccionada ya está en el array, la eliminamos
      setCalidad(calidad.filter((option) => option !== selectedOption))
    } else {
      // Si la opción seleccionada no está en el array, la agregamos
      setCalidad([...calidad, selectedOption])
    }
  }

  const handleTipoCajaChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedOption = event.target.value
    if (tipoCaja.includes(selectedOption)) {
      // Si la opción seleccionada ya está en el array, la eliminamos
      setTipoCaja(tipoCaja.filter((option) => option !== selectedOption))
    } else if (tipoCaja.length < 2) {
      // Si el array tiene menos de 2 elementos, agregamos la opción seleccionada
      setTipoCaja([...tipoCaja, selectedOption])
    }
  }

  const closeModal = (): void => {
    setShowError(false)
  }

  return (
    <form className="grid grid-cols-12 gap-2 w-full h-max" onSubmit={guardarDatos}>
      <div className="col-span-12 w-full flex justify-center items-center mt-4">
        <h2 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-2xl`}>
          Crear Contenedor
        </h2>
      </div>
      <div className="col-span-2"></div>
      <div
        className={`col-span-8 relative inline-flex first-letter ${theme === 'Dark' ? 'bg-dark-primary' : 'bg-white'
          } mt-3`}
      >
        <select
          onChange={handlePrediosChange}
          required
          value={cliente}
          className={`border focus:outline-none appearance-none w-full rounded-md h-10 pl-5 pr-10
            ${theme === 'Dark'
              ? 'border-white bg-slate-800 text-white'
              : 'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '
            }`}
        >
          <option>Clientes</option>
          {clientesDatos.map((item) => (
            <option key={item._id} value={item._id}>
              {item.CLIENTE}
            </option>
          ))}
        </select>
      </div>

      <div className="col-span-2"></div>
      <div className="col-span-2"></div>
      <div className="col-span-4 mt-3 mr-2">
        <label htmlFor="" className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Número de contenedor
        </label>
        <input
          value={numeroContenedor}
          type="text"
          onChange={(e): void => setNumeroContenedor(e.target.value)}
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
          Número de pallets
        </label>
        <input
          value={pallets}
          type="number"
          onChange={(e): void => setPallets(e.target.value)}
          min={0}
          step={1}
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
      <div className="col-span-4 mt-3">
        <label htmlFor="" className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Fecha Inicio Proceso
        </label>
        <input
          value={fechaInicioProceso ? fechaInicioProceso.toString().split('T')[0] : ''}
          type="date"
          onChange={(e): void => setFechaInicioProceso(e.target.value)}
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
          Fecha Estimada de Cargue
        </label>
        <input
          value={fechaEstimadaCargue ? fechaEstimadaCargue.toString().split('T')[0] : ''}
          type="date"
          onChange={(e): void => setFechaEstimadaCargue(e.target.value)}
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
      <div className="col-span-4 mt-3">
        <label htmlFor="" className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Calibres
        </label>
        <input
          value={calibres}
          type="text"
          onChange={(e): void => setCalibres(e.target.value)}
          className={`border focus:outline-none appearance-none w-full rounded-md h-10 pl-5 pr-10
                ${theme === 'Dark'
              ? 'border-white bg-slate-800 text-white'
              : 'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '
            }`}
        />
      </div>
      <div className="col-span-4 flex justify-center mt-4 items-center">
        <button
          type="button"
          onClick={(): void => setDesverdizado(!desverdizado)}
          className={`h-10 px-5 ${desverdizado ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-black'
            } rounded-md`}
        >
          Desverdizado
        </button>
      </div>
      <div className="col-span-2"></div>
      <div className="col-span-2"></div>

      <div className="col-span-4 mt-3 flex justify-center gap-2 flex-col border-solid border-2 rounded-lg">
        <h3 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} ml-2`}>Calidad</h3>
        <div className="flex gap-5 justify-center">
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="checkbox"
              className="form-checkbox text-blue-600"
              value="1"
              onChange={handleCalidadChange}
              checked={calidad.includes('1')}
            />
            <span className="ml-2">1</span>
          </label>
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="checkbox"
              className="form-checkbox text-blue-600"
              value="1.5"
              onChange={handleCalidadChange}
              checked={calidad.includes('1.5')}
            />
            <span className="ml-2">1.5</span>
          </label>
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="checkbox"
              className="form-checkbox text-blue-600"
              value="2"
              onChange={handleCalidadChange}
              checked={calidad.includes('2')}
            />
            <span className="ml-2">2</span>
          </label>
        </div>
      </div>

      <div className="col-span-4 mt-3 flex justify-center gap-1 flex-col border-solid border-2 rounded-lg">
        <h3 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} ml-2`}>Tipo de Caja</h3>
        <div className="flex gap-5 justify-center">
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="checkbox"
              className="form-checkbox text-blue-600"
              value="Blanca"
              onChange={handleTipoCajaChange}
              checked={tipoCaja.includes('Blanca')}
            />
            <span className="ml-2">Blanca</span>
          </label>
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="checkbox"
              className="form-checkbox text-blue-600"
              value="Generica"
              onChange={handleTipoCajaChange}
              checked={tipoCaja.includes('Generica')}
            />
            <span className="ml-2">Genérica</span>
          </label>
        </div>
      </div>

      <div className="col-span-2"></div>
      <div className="col-span-2"></div>

      <div className="col-span-4 mt-3 flex justify-center gap-1 flex-col border-solid border-2 rounded-lg">
        <h3 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} ml-2`}>Tipo de fruta</h3>
        <div className="flex gap-5 justify-center m-1 text-sm">
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
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="radio"
              className="form-radio text-orange-600"
              name="fruit"
              value="naranja"
              onChange={(): void => setTipoFruta('Mixto')}
            />
            <span className="ml-2">Mixto</span>
          </label>
        </div>
      </div>
      <div className="col-span-4 mt-3 flex justify-center  gap-1 flex-col border-solid border-2 rounded-lg">
        <h3 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} ml-2`}>Tipo de empaque</h3>
        <div className="flex gap-5 justify-center">
          {' '}
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="radio"
              className="form-radio text-orange-600"
              name="empaque"
              value="caja"
              onChange={(): void => setTipoEmpaque('Caja')}
            />
            <span className="ml-2">Caja</span>
          </label>
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="radio"
              className="form-radio text-green-600"
              name="empaque"
              value="saco"
              onChange={(): void => setTipoEmpaque('Saco')}
            />
            <span className="ml-2">Saco</span>
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

      <div className="col-span-2"></div>
      <div className="col-span-4 mt-3 flex justify-center items-center mb-4">
        <button
          type="submit"
          className={`w-full h-12 bg-green-500 text-white rounded-md focus:outline-none ${theme === 'Dark' ? 'hover:bg-green-400' : 'hover:bg-green-600'
            }`}
        >
          Guardar
        </button>
      </div>

      <div className="fixed bottom-0 right-0 flex items-center justify-center">
        {showError && <ErrorModal message={message} closeModal={closeModal} theme={theme} />}
        {showSuccess && <SuccessModal message={message} closeModal={closeModal} theme={theme} />}
      </div>
    </form>
  )
}
