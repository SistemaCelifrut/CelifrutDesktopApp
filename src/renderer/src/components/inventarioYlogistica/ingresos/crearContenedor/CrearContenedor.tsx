/* eslint-disable prettier/prettier */
import { useCallback, useEffect, useState } from 'react'
import { crearObjetoContenedor, formInit, requestClientes } from './functions'
import { clienteType } from '@renderer/types/clientesType'
import { serverResponse } from '@renderer/env'
import useAppContext from '@renderer/hooks/useAppContext'
import * as strings from './json/string_ES.json'

export default function CrearContenedor(): JSX.Element {
  const { theme, messageModal } = useAppContext();
  const [formState, setFormState] = useState(formInit);
  const [clientesDatos, setClientesDatos] = useState<clienteType[]>([])
  const [calidad, setCalidad] = useState<string[]>([])
  const [tipoCaja, setTipoCaja] = useState<string[]>([])

  const handleChange = (event): void => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };
  const obtenerDatos = useCallback(async (): Promise<void> => {
    try {
      const response: serverResponse<clienteType[]> = await window.api.server(requestClientes)
      setClientesDatos(response.data)
    } catch (e: unknown) {
      messageModal("error", `Crear contenedor ${e}`)
    }
  },[])
  useEffect(() => {
    obtenerDatos();
  }, [])

  const guardarDatos: React.FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      event.preventDefault()
      const request = crearObjetoContenedor(formState, calidad, tipoCaja)
      const response = await window.api.server(request)
      if (response.status === 200) {
        messageModal("success", 'Contenedor creado con exito!');
      } else {
        messageModal("error", `Error ${response.status}: ${response.message}`)
      }
      reiniciarCampos()
    } catch (e: unknown) {
      messageModal("error", `Error ${e}`);
    }
  }
  const reiniciarCampos = (): void => {
    setFormState(formInit);
    setCalidad([]) // Reiniciar campo de calidad
  }
  const handleCalidadChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedOption = event.target.value;
    if (calidad.includes(selectedOption)) {
      setCalidad(prevCalidad => prevCalidad.filter(option => option !== selectedOption));
    } else {
      setCalidad(prevCalidad => [...prevCalidad, selectedOption]);
    }
  }

  const handleTipoCajaChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedOption = event.target.value;
    if (tipoCaja.includes(selectedOption)) {
      setTipoCaja(prevTipoCaja => prevTipoCaja.filter(option => option !== selectedOption));
    } else if (tipoCaja.length < 2) {
      setTipoCaja(prevTipoCaja => [...prevTipoCaja, selectedOption]);
    }
  }
  const handleDesverdizado = (): void => {
    if(formState.desverdizado){
      setFormState({
        ...formState,
        desverdizado: false,
      });
    } else {
      setFormState({
        ...formState,
        desverdizado: true,
      });
    }
  }

  return (
    <form className="grid grid-cols-12 gap-2 w-full h-max" onSubmit={guardarDatos}>
      <div className="col-span-12 w-full flex justify-center items-center mt-4">
        <h2 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-2xl`}>
          {strings.title}
        </h2>
      </div>
      <div className="col-span-2"></div>
      <div
        className={`col-span-8 relative inline-flex first-letter ${theme === 'Dark' ? 'bg-dark-primary' : 'bg-white'
          } mt-3`}
      >
        <select
          onChange={handleChange}
          name='cliente'
          required
          value={formState.cliente}
          className={`border focus:outline-none appearance-none w-full rounded-md h-10 pl-5 pr-10
            ${theme === 'Dark'
              ? 'border-white bg-slate-800 text-white'
              : 'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '
            }`}
        >
          <option>{strings.clientes}</option>
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
          {strings.numero_contenedor}
        </label>
        <input
          value={formState.numeroContenedor}
          name='numeroContenedor'
          type="text"
          onChange={handleChange}
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
          {strings.numero_pallets}
        </label>
        <input
          value={formState.pallets}
          type="number"
          onChange={handleChange}
          name='pallets'
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
          {strings.fecha_inicio_proceso}
        </label>
        <input
          value={formState.fechaInicioProceso ? formState.fechaInicioProceso.toString().split('T')[0] : ''}
          type="date"
          onChange={handleChange}
          name='fechaInicioProceso'
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
          {strings.fecha_estimada_cargue}
        </label>
        <input
          value={formState.fechaEstimadaCargue ? formState.fechaEstimadaCargue.toString().split('T')[0] : ''}
          type="date"
          name='fechaEstimadaCargue'
          onChange={handleChange}
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
          {strings.calibres}
        </label>
        <input
          value={formState.calibres}
          name='calibres'
          type="text"
          onChange={handleChange}
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
          name='desverdizado'
          onClick={handleDesverdizado}
          className={`h-10 px-5 ${formState.desverdizado ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-black'
            } rounded-md`}
        >
          {strings.desverdizado}
        </button>
      </div>
      <div className="col-span-2"></div>
      <div className="col-span-2"></div>

      <div className="col-span-4 mt-3 flex justify-center gap-2 flex-col border-solid border-2 rounded-lg">
        <h3 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} ml-2`}>{strings.calidad.title}</h3>
        <div className="flex gap-5 justify-center">
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="checkbox"
              className="form-checkbox text-blue-600"
              value="1"
              onChange={handleCalidadChange}
              checked={calidad.includes('1')}
            />
            <span className="ml-2">{strings.calidad[1]}</span>
          </label>
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="checkbox"
              className="form-checkbox text-blue-600"
              value="1.5"
              onChange={handleCalidadChange}
              checked={calidad.includes('1.5')}
            />
            <span className="ml-2">{strings.calidad['1.5']}</span>
          </label>
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="checkbox"
              className="form-checkbox text-blue-600"
              value="2"
              onChange={handleCalidadChange}
              checked={calidad.includes('2')}
            />
            <span className="ml-2">{strings.calidad[2]}</span>
          </label>
        </div>
      </div>

      <div className="col-span-4 mt-3 flex justify-center gap-1 flex-col border-solid border-2 rounded-lg">
        <h3 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} ml-2`}>{strings.tipoCaja.title}</h3>
        <div className="flex gap-5 justify-center">
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="checkbox"
              className="form-checkbox text-blue-600"
              value="Blanca"
              onChange={handleTipoCajaChange}
              checked={tipoCaja.includes('Blanca')}
            />
            <span className="ml-2">{strings.tipoCaja.blanca}</span>
          </label>
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="checkbox"
              className="form-checkbox text-blue-600"
              value="Generica"
              onChange={handleTipoCajaChange}
              checked={tipoCaja.includes('Generica')}
            />
            <span className="ml-2">{strings.tipoCaja.generica}</span>
          </label>
        </div>
      </div>

      <div className="col-span-2"></div>
      <div className="col-span-2"></div>

      <div className="col-span-4 mt-3 flex justify-center gap-1 flex-col border-solid border-2 rounded-lg">
        <h3 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} ml-2`}>{strings.tipoFruta.title}</h3>
        <div className="flex gap-5 justify-center m-1 text-sm">
          {' '}
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="radio"
              className="form-radio text-orange-600"
              name="tipoFruta"
              value="Naranja"
              onChange={handleChange}
            />
            <span className="ml-2">{strings.tipoFruta.naranja}</span>
          </label>
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="radio"
              className="form-radio text-green-600"
              name="tipoFruta"
              value="Limon"
              onChange={handleChange}
            />
            <span className="ml-2">{strings.tipoFruta.limon}</span>
          </label>
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="radio"
              className="form-radio text-orange-600"
              name="tipoFruta"
              value="Mixto"
              onChange={handleChange}
            />
            <span className="ml-2">{strings.tipoFruta.mixto}</span>
          </label>
        </div>
      </div>
      <div className="col-span-4 mt-3 flex justify-center  gap-1 flex-col border-solid border-2 rounded-lg">
        <h3 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} ml-2`}>{strings.tipoEmpaque.title}</h3>
        <div className="flex gap-5 justify-center">
          {' '}
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="radio"
              className="form-radio text-orange-600"
              name="tipoEmpaque"
              value="Caja"
              onChange={handleChange}
            />
            <span className="ml-2">{strings.tipoEmpaque.caja}</span>
          </label>
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            <input
              type="radio"
              className="form-radio text-green-600"
              name="tipoEmpaque"
              value="Saco"
              onChange={handleChange}
            />
            <span className="ml-2">{strings.tipoEmpaque.saco}</span>
          </label>
        </div>
      </div>

      <div className="col-span-2"></div>
      <div className="col-span-2"></div>

      <div className="col-span-8 mt-3">
        <label htmlFor="" className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          {strings.observaciones}
        </label>
        <textarea
          onChange={handleChange}
          name='observaciones'
          required
          value={formState.observaciones}
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
          {strings.guardar}
        </button>
      </div>
    </form>
  )
}
