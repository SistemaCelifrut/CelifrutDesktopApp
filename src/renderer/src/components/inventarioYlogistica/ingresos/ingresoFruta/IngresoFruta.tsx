/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import { proveedoresType } from '@renderer/types/proveedoresType';
import * as strings from './json/strings_ES.json';
import { crear_request_guardar, formInit, handleServerResponse, request_EF1, request_predios } from './functions/functions';
import useAppContext from '@renderer/hooks/useAppContext';

export default function IngresoFruta(): JSX.Element {
  const { theme, messageModal } = useAppContext();
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
    <form className="grid grid-cols-12 gap-2 w-full h-max" onSubmit={guardarLote}>
      <div className="col-span-12 w-full flex flex-col justify-center items-center mt-4">
        <h2 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-2xl`}>
          {strings.title}
        </h2>
        <h3 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-xl`}>
          {strings.EF1}{new Date().getFullYear().toString().slice(-2)}{(new Date().getMonth() + 1).toString().padStart(2, '0')}{enf}
        </h3>
      </div>
      <div className="col-span-2"></div>

      <div className={`col-span-8 relative inline-flex first-letter ${theme === 'Dark' ? 'bg-dark-primary' : 'bg-white'} mt-3`}>
        <select
          onChange={handleChange}
          required
          name='nombrePredio'
          className={`border focus:outline-none appearance-none w-full rounded-md h-10 pl-5 pr-10
                            ${theme === 'Dark'
              ? 'border-white bg-slate-800 text-white'
              : 'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '
            }`}>
          <option>{strings.input_predios}</option>
          {prediosDatos.map((item, index) => (
            <option key={item.PREDIO + index} value={item._id}>{item.PREDIO}</option>
          ))}
        </select>
      </div>
      <div className="col-span-2"></div>
      <div className="col-span-2"></div>
      <div className="col-span-4 mt-3 mr-2">
        <label htmlFor="" className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          {strings.numeroCanastillas}
        </label>
        <input
          type="number"
          value={formState.canastillas}
          min={0}
          onChange={handleChange}
          name='canastillas'
          required
          className={`border focus:outline-none appearance-none w-full rounded-md h-10 pl-5 pr-10
              ${theme === 'Dark' ? 'border-white bg-slate-800 text-white' : 'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '
            }`}/>
      </div>
      <div className="col-span-4 mt-3">
        <label htmlFor="" className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          {strings.kilos}
        </label>
        <input
          type="number"
          value={formState.kilos}
          name='kilos'
          onChange={handleChange}
          min={0}
          step={0.1}
          required
          className={`border focus:outline-none appearance-none w-full rounded-md h-10 pl-5 pr-10
              ${theme === 'Dark' ? 'border-white bg-slate-800 text-white' : 'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '
            }`}/>
      </div>
      <div className="col-span-2"></div>
      <div className="col-span-2"></div>
      <div className="col-span-4 mt-3 mr-2">
        <label htmlFor="" className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          {strings.placa}
        </label>
        <input
          value={formState.placa}
          type="text"
          name='placa'
          onChange={handleChange}
          pattern="^[A-Z]{3}[0-9]{3}$"
          title="Por favor, introduce 3 letras seguidas de 3 números."
          required
          className={`border focus:outline-none appearance-none w-full rounded-md h-10 pl-5 pr-10
                      ${theme === 'Dark' ? 'border-white bg-slate-800 text-white' : 'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '
            }`}/>
      </div>
      <div className="col-span-4 mt-3">
        <label htmlFor="" className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          {strings.canastillasVacias}
        </label>
        <input
          value={formState.canastillasVacias}
          type="text"
          name='canastillasVacias'
          onChange={handleChange}
          required
          className={`border focus:outline-none appearance-none w-full rounded-md h-10 pl-5 pr-10
                    ${theme === 'Dark' ? 'border-white bg-slate-800 text-white' : 'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '
            }`}/>
      </div>
      <div className="col-span-2"></div>
      <div className="col-span-2"></div>
      <div className="col-span-8 mt-3 flex justify-center items-center gap-5 flex-col">
        <h3 className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>{strings.tipoFruta.title}</h3>
        <div className="flex gap-5">
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
        </div>
      </div>
      <div className="col-span-2"></div>
      <div className="col-span-2"></div>
      <div className="col-span-8 mt-3">
        <label htmlFor="" className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          {strings.observaciones}
        </label>
        <textarea
          value={formState.observaciones}
          name='observaciones'
          onChange={handleChange}
          required
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
          {strings.botonGuardar}
        </button>
      </div>
    </form>
  )
}
