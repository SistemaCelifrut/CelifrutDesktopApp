/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import { proveedoresType } from '@renderer/types/proveedoresType';
import * as strings from './json/strings_ES.json';
import { crear_request_guardar, formInit, handleServerResponse, request_EF1, request_predios } from './functions/functions';
import useAppContext from '@renderer/hooks/useAppContext';
import "@renderer/css/components.css"
import "@renderer/css/form.css"

export default function IngresoFruta(): JSX.Element {
  const { messageModal } = useAppContext();
  const [prediosDatos, setPrediosData] = useState<proveedoresType[]>([])
  const [formState, setFormState] = useState(formInit);
  const [enf, setEnf] = useState(0)

  const obtenerEF1 = async (): Promise<void> => {
    const enf = await window.api.server(request_EF1);
    setEnf(enf.enf);
  }
  const obtenerPredios = async (): Promise<void> => {
    const response = await window.api.server(request_predios)
    const data1 = handleServerResponse(response, messageModal)

    if (Array.isArray(data1) && data1.length > 0 && '_id' in data1[0]) {
      setPrediosData(data1 as proveedoresType[]);
    }
  }
  useEffect(() => {
    obtenerPredios()
    obtenerEF1()
  }, [])
  const handleChange = (event): void => {
    const { name, value } = event.target;

    const uppercaseValue = name === 'placa' ? value.toUpperCase() : value;

    setFormState({
      ...formState,
      [name]: uppercaseValue,
    });
  };
  const guardarLote: React.FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      event.preventDefault()
      const datos = crear_request_guardar(formState);
      if (datos.promedio < 15 || datos.promedio > 30) {
        messageModal("error", 'Error, los kilos no corresponden a las canastillas')
        return
      }
      if (!datos.tipoFruta) {
        messageModal("error", 'Seleccione el tipo de fruta del lote')
        return
      }
      const request = {
        data: datos,
        collection: 'lotes',
        action: 'guardarLote',
        query: 'proceso',
        record: 'crearLote'
      };
      const response = await window.api.server(request)
      if (response.status === 200) {
        messageModal("success", "¡lote guardado con exito!")
        await obtenerEF1();
      } else {
        messageModal("error", `Error ${response.status}: ${response.message}`)
      }
      reiniciarCampos()
    } catch (e) {
      messageModal("error", 'Recepcion' + e)
    }
  }
  const reiniciarCampos = (): void => {
    setFormState(formInit);
  }
  return (
    <div className='componentContainer'>
      <div className='navBar'></div>
      <div>
        <h2>
          {strings.title}
        </h2>
        <h2>
          {strings.EF1}{new Date().getFullYear().toString().slice(-2)}{(new Date().getMonth() + 1).toString().padStart(2, '0')}{enf}
        </h2>
      </div>
      <form className="form-container" onSubmit={guardarLote}>
        <div>
          <label> Predios</label>
          <select
            className='defaultSelect'
            onChange={handleChange}
            required
            name='nombrePredio'>
            <option>{strings.input_predios}</option>
            {prediosDatos.map((item, index) => (
              <option key={item.PREDIO && item.PREDIO + index} value={item._id}>{item.PREDIO}</option>
            ))}
          </select>
        </div>
        <div>
          <label> Tipo fruta</label>
          <select
            className='defaultSelect'
            onChange={handleChange}
            required
            name='nombrePredio'>
            <option value=""></option>
            <option value="Naranja">{strings.tipoFruta.naranja}</option>
            <option value="Limon">{strings.tipoFruta.limon}</option>
          </select>
        </div>
        <div >
          <label>{strings.numeroCanastillas}</label>
          <input type="text" onChange={handleChange} name="canastillas" value={formState.canastillas} required />
        </div>
        <div >
          <label>{strings.kilos}</label>
          <input type="text" onChange={handleChange} name="kilos" value={formState.kilos} required />
        </div>
        <div >
          <label>{strings.placa}</label>
          <input type="text" onChange={handleChange} name="placa" value={formState.placa} required />
        </div>
        <div >
          <label>{strings.canastillasVacias}</label>
          <input type="text" onChange={handleChange} name="canastillasVacias" value={formState.canastillasVacias} required />
        </div>
        <div >
          <label>{strings.observaciones}</label>
          <textarea onChange={handleChange} name="observaciones" value={formState.observaciones} required />
        </div>
        <div className='defaultSelect-button-div'>
          <button type='submit'>Guardar</button>
        </div>
      </form>
    </div>
  )
}
