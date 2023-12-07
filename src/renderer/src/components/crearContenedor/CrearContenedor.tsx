import { themeType } from '@renderer/env'
import { useEffect, useState } from 'react'

type propsType = {
  theme: themeType
  user: string
}

export default function CrearContenedor(props: propsType) {
  const [numeroContenedor, setNumeroContenedor] = useState<string>('')
  const [cliente, setCliente] = useState<string>('')
  const [tipoFruta, setTipoFruta] = useState<string>('')
  const [tipoEmpaque, setTipoEmpaque] = useState<string>('')
  const [pallets, setPallets] = useState<string>('')
  const [desverdizado, setDesverdizado] = useState<boolean>(false)
  const [observaciones, setObservaciones] = useState<string>('')
  const [clientesDatos, setClientesDatos] = useState<string[]>([])

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const request = { action: 'obtenerClientes' }
        const response = await window.api.contenedores(request)
        const nombreClientes: string[] = Object.keys(response.data)
        setClientesDatos(nombreClientes)
        console.log(response)
      } catch (e: any) {
        alert(`Crear contenedor ${e.name}: ${e.message}`)
      }
    }
    obtenerDatos()
  }, [])


  const guardarDatos: React.FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      event.preventDefault()
      let datos = {
        cliente: cliente,
        numeroContenedor: numeroContenedor,
        pallets: pallets,
        tipoFruta: tipoFruta,
        desverdizado: desverdizado,
        observaciones: observaciones,
        tipoEmpaque: tipoEmpaque
      }

       const request = { action: 'crearContenedor', data: datos }
      console.log(request)
      const response = await window.api.contenedores(request)
      if (response.status == 200) {
        alert("datos guardados correctamente")
      } else {
        alert("Error al guardar los datos: " + response.data)
      }
      reiniciarCampos()
    } catch (e: any) {
      console.log(`${e.name}:{${e.message}}`)
      alert("Error: " + e.message)
    }
  }

  const reiniciarCampos = () => {
    setCliente('')
    setNumeroContenedor('')
    setPallets('')
    setDesverdizado(false)
    setObservaciones('')
  }

  const handlePrediosChange = (event) => {
    setCliente(event.target.value)
  }

  return (
    <form className="grid grid-cols-12 gap-2 w-full h-max" onSubmit={guardarDatos}>
      <div className="col-span-12 w-full flex justify-center items-center mt-4">
        <h2 className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-2xl`}>
          CrearContenedor
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
          value={cliente}
          className={`border focus:outline-none appearance-none w-full rounded-md h-10 pl-5 pr-10
                          ${
                            props.theme === 'Dark'
                              ? 'border-white bg-slate-800 text-white'
                              : 'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '
                          }`}
        >
          <option>Clientes</option>
          {clientesDatos.map((item, index) => (
            <option key={item + index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="col-span-2"></div>
      <div className="col-span-2"></div>
      <div className="col-span-4 mt-3 mr-2">
        <label htmlFor="" className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Numero de contenedor
        </label>
        <input
          value={numeroContenedor}
          type="text"
          onChange={(e) => setNumeroContenedor(e.target.value)}
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
          Numero de pallets
        </label>
        <input
          value={pallets}
          type="number"
          onChange={(e) => setPallets(e.target.value)}
          min={0}
          step={1}
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

      <div className="col-span-4 mt-3 flex justify-center items-center gap-5 flex-col">
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
          <label className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="radio"
              className="form-radio text-orange-600"
              name="fruit"
              value="naranja"
              onChange={() => setTipoFruta('Mixto')}
            />
            <span className="ml-2">Mixto</span>
          </label>
        </div>
      </div>
      <div className="col-span-4 mt-3 flex justify-center items-center gap-5 flex-col">
        <h3 className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Tipo de empaque
        </h3>
        <div className="flex gap-5">
          {' '}
          <label className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="radio"
              className="form-radio text-orange-600"
              name="empaque"
              value="caja"
              onChange={() => setTipoEmpaque('Caja')}
            />
            <span className="ml-2">Caja</span>
          </label>
          <label className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="radio"
              className="form-radio text-green-600"
              name="empaque"
              value="saco"
              onChange={() => setTipoEmpaque('Saco')}
            />
            <span className="ml-2">Saco</span>
          </label>
        </div>
      </div>

      <div className="col-span-2"></div>
      <div className="col-span-2"></div>

      <div className="col-span-8 flex justify-center mt-4">
        <button
        type='button'
          onClick={() => setDesverdizado(!desverdizado)}
          className={`h-10 px-5 ${
            desverdizado ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-black'
          } rounded-md`}
        >
          Desverdizado
        </button>
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
