/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { contenedoresType, formularioInspeccionMulaType } from '@renderer/types/contenedoresType';
import { crear_request, initialData, labels, request } from './functions/request';
import useAppContext from '@renderer/hooks/useAppContext';
import "@renderer/css/components.css"
import "@renderer/css/form.css"

const FormularioMulas: React.FC = () => {
  const { messageModal } = useAppContext();
  const [state, setState] = useState<formularioInspeccionMulaType>(initialData);
  const [contenedorSelect, setContenedorSelect] = useState<string>('');
  const [contenedores, setContenedores] = useState<contenedoresType[]>();

  useEffect(() => {
    obtenerContenedores();
  }, []);

  const obtenerContenedores = async (): Promise<void> => {
    try {
      const response = await window.api.server(request);
      console.log(response)
      if (response.status !== 200) {
        throw new Error(response.message);
      }
      setContenedores(response.data);

    } catch (e) {
      if (e instanceof Error) {
        messageModal("error", e.message)
      }
    }
  };
  const handleChange = (event): void => {
    const { name, value } = event.target;
    const uppercaseValue = name === 'placa' ? value.toUpperCase() : value;
    setState({
      ...state,
      [name]: uppercaseValue,
    });
  };
  const handlePaste: React.ClipboardEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const parsedData = pastedData.split('\t');

    if (parsedData.length >= 6) {
      setState((prev) => ({
        ...prev,
        cnt: parsedData[0] || '',
        prof: parsedData[1] || '',
        cliente: parsedData[2] || '',
        puerto: parsedData[3] || '',
        naviera: parsedData[4] || '',
        agenciaAduanas: parsedData[5] || '',
      }));
    }
  };
  const enviarDatosMulas = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      if (!state) throw new Error("Error hay datos indefinidos")
      const sendData = crear_request(state, contenedorSelect)
      console.log(sendData)

      const response = await window.api.server(sendData);

      if(response.status !== 200){
        throw new Error(response.message);
      }
      // Limpiar los campos después de enviar los datos
      messageModal("success", "Datos guardados con exito")
      setState(initialData);
    } catch (e) {
      if(e instanceof Error){
        messageModal("error", e.message)
      }
    }
  };
  return (
    <div className='componentContainer'>
      <div className='navBar'></div>
      <h2>Programación Tractomula</h2>
      <form onSubmit={enviarDatosMulas} onPaste={handlePaste} className='form-container'>
        <div>
          <label>Contenedores</label>
          <select className='defaultSelect' onChange={(e): void => setContenedorSelect(e.target.value)}>
            <option value="">Contendores</option>
            {contenedores && contenedores?.map(item => (
              <option key={item._id} value={item._id}>{item.infoContenedor?.clienteInfo && 
               item.numeroContenedor + " - " + item.infoContenedor?.clienteInfo?.CLIENTE}</option>
            ))}
          </select>
        </div>
        {Object.keys(state).map((key, index) => (
          <div key={key}>
            <label>{labels[index]}</label>
            <input type="text" onChange={handleChange} name={key} value={state[key]} required/>
          </div>
        ))}
        <div className='defaultSelect-button-div'>
        <button type='submit'>Guardar</button>
        </div>
      </form>
    </div>
  );
};
export default FormularioMulas;