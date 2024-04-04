/* eslint-disable prettier/prettier */
import { useCallback, useEffect, useState } from 'react'
import { crearObjetoContenedor, formInit, requestClientes } from './functions'
import { clienteType } from '@renderer/types/clientesType'
import { serverResponse } from '@renderer/env'
import useAppContext from '@renderer/hooks/useAppContext'
import * as strings from './json/string_ES.json'
import "@renderer/css/components.css"
import "@renderer/css/form.css"

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
  }, [])
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
    if (formState.desverdizado) {
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
    <div className='componentContainer'>
      <div className='navBar'></div>
      <h2 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-2xl`}>
        {strings.title}
      </h2>
      <form className="form-container" onSubmit={guardarDatos}>
        <div>
          <label>Clientes</label>
          <select
            onChange={handleChange}
            name='cliente'
            required
            value={formState.cliente}
            className='defaultSelect'
          >
            <option>{strings.clientes}</option>
            {clientesDatos.map((item) => (
              <option key={item._id} value={item._id}>
                {item.CLIENTE}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>{strings.numero_contenedor}</label>
          <input
            value={formState.numeroContenedor}
            name='numeroContenedor'
            type="text"
            onChange={handleChange}
            required
          />
        </div>

        <div >
          <label>{strings.numero_pallets}</label>
          <input
            value={formState.pallets}
            type="number"
            onChange={handleChange}
            name='pallets'
            min={0}
            step={1}
            required
          />
        </div>
        <div>
          <label>{strings.fecha_inicio_proceso}</label>
          <input
            value={formState.fechaInicioProceso ? formState.fechaInicioProceso.toString().split('T')[0] : ''}
            type="date"
            onChange={handleChange}
            name='fechaInicioProceso'
            required
          />
        </div>
        <div>
          <label>{strings.fecha_estimada_cargue}</label>
          <input
            value={formState.fechaEstimadaCargue ? formState.fechaEstimadaCargue.toString().split('T')[0] : ''}
            type="date"
            name='fechaEstimadaCargue'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>{strings.calibres}</label>
          <input
            value={formState.calibres}
            name='calibres'
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>{strings.desverdizado}</label>
          <button
            type="button"
            name='desverdizado'
            onClick={handleDesverdizado}
            className={`${formState.desverdizado ? 'desverdizado-on-button-contenedor' : 'desverdizado-off-button-contenedor'} `}
          >
            {strings.desverdizado}
          </button>
        </div>

        <div>
          <label>{strings.calidad.title}</label>
          <div className='form-checkbox-container'>
            <label className='form-label-container'>
              <span>{strings.calidad[1]}.</span>
              <input
                type="checkbox"
                className="form-checkbox"
                value="1"
                onChange={handleCalidadChange}
                checked={calidad.includes('1')}
              />
            </label>
            <label className='form-label-container'>
              <span className="ml-2">{strings.calidad['1.5']}</span>
              <input
                type="checkbox"
                value="1.5"
                onChange={handleCalidadChange}
                checked={calidad.includes('1.5')}
              />
            </label>
            <label className='form-label-container'>
              <span className="ml-2">{strings.calidad[2]}</span>
              <input
                type="checkbox"
                value="2"
                onChange={handleCalidadChange}
                checked={calidad.includes('2')}
              />
            </label>
            
            <label className='form-label-container'>
              <span className="ml-2">{strings.calidad.zumo}</span>
              <input
                type="checkbox"
                value="Zumo"
                onChange={handleCalidadChange}
                checked={calidad.includes('Zumo')}
              />
            </label>

            <label className='form-label-container'>
              <span className="ml-2">{strings.calidad.combinado}</span>
              <input
                type="checkbox"
                value="Combinado"
                onChange={handleCalidadChange}
                checked={calidad.includes('Combinado')}
              />
            </label>
       
          </div>
        </div>

        <div >
          <label>{strings.tipoCaja.title}</label>
          <div className='form-checkbox-container'>
            <label className='form-label-container'>
              <span className="ml-2">{strings.tipoCaja.blanca}</span>
              <input
                type="checkbox"
                className="form-checkbox text-blue-600"
                value="Blanca"
                onChange={handleTipoCajaChange}
                checked={tipoCaja.includes('Blanca')}
              />
            </label>
            <label className='form-label-container'>
              <span className="ml-2">{strings.tipoCaja.generica}</span>
              <input
                type="checkbox"
                className="form-checkbox text-blue-600"
                value="Generica"
                onChange={handleTipoCajaChange}
                checked={tipoCaja.includes('Generica')}
              />
            </label>
          </div>
        </div>
        <div>
          <label>{strings.tipoFruta.title}</label>
          <div className='form-checkbox-container'>
            <label className='form-label-container'>
              <span className="ml-2">{strings.tipoFruta.naranja}</span>
              <input
                type="radio"
                className="form-radio text-orange-600"
                name="tipoFruta"
                value="Naranja"
                onChange={handleChange}
              />
            </label>
            <label className='form-label-container'>
              <span className="ml-2">{strings.tipoFruta.limon}</span>
              <input
                type="radio"
                className="form-radio text-green-600"
                name="tipoFruta"
                value="Limon"
                onChange={handleChange}
              />
            </label>
            <label className='form-label-container'>
              <span className="ml-2">{strings.tipoFruta.mixto}</span>
              <input
                type="radio"
                className="form-radio text-orange-600"
                name="tipoFruta"
                value="Mixto"
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        <div>
          <label>{strings.tipoEmpaque.title}</label>
          <div className='form-checkbox-container'>
            <label className='form-label-container'>
              <span className="ml-2">{strings.tipoEmpaque.caja}</span>
              <input
                type="radio"
                className="form-radio text-orange-600"
                name="tipoEmpaque"
                value="Caja"
                onChange={handleChange}
              />
            </label>
            <label className='form-label-container'>
              <span className="ml-2">{strings.tipoEmpaque.saco}</span>
              <input
                type="radio"
                className="form-radio text-green-600"
                name="tipoEmpaque"
                value="Saco"
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        <div>
          <label>
            {strings.observaciones}
          </label>
          <textarea
            onChange={handleChange}
            name='observaciones'
            required
            value={formState.observaciones}
          />
        </div>
        <div className="col-span-4 mt-3 flex justify-center items-center mb-4">
          <button
            type="submit"
          >
            {strings.guardar}
          </button>
        </div>
      </form>
    </div>
  )
}
