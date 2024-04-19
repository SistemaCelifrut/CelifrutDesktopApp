/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { contenedoresType, formularioInspeccionMulaType } from '@renderer/types/contenedoresType';
import { crear_request, initialData, labels } from '../functions/request';
import useAppContext from '@renderer/hooks/useAppContext';
import "@renderer/css/components.css"
import "@renderer/css/form.css"

type porpsType = {
  contenedores: contenedoresType[]
  modificar: boolean
  handleChange: () => void
  contenedor: contenedoresType | undefined
}

export default function FormularioProgramacionMula(props: porpsType): JSX.Element {
  const { messageModal } = useAppContext();
  const [state, setState] = useState<formularioInspeccionMulaType>(initialData);
  const [contenedorSelect, setContenedorSelect] = useState<string>('');
  useEffect(()=>{dataContenedor()},[props.modificar])

  const dataContenedor = ():void => {
    if(props.modificar && props.contenedor !== undefined){
      const formData = {...state}
      formData.placa = props.contenedor.formularioInspeccionMula?.placa
      formData.trailer = props.contenedor.formularioInspeccionMula?.trailer
      formData.conductor = props.contenedor.formularioInspeccionMula?.conductor
      formData.cedula = props.contenedor.formularioInspeccionMula?.cedula
      formData.celular = props.contenedor.formularioInspeccionMula?.celular
      formData.color = props.contenedor.formularioInspeccionMula?.color
      formData.modelo = props.contenedor.formularioInspeccionMula?.modelo
      formData.marca = props.contenedor.formularioInspeccionMula?.marca
      formData.prof = props.contenedor.formularioInspeccionMula?.prof
      formData.puerto = props.contenedor.formularioInspeccionMula?.puerto
      formData.naviera = props.contenedor.formularioInspeccionMula?.naviera
      formData.agenciaAduanas = props.contenedor.formularioInspeccionMula?.agenciaAduanas
      setState(formData)
      setContenedorSelect(String(props.contenedor._id))
    } else {
      const formData = {...state}
      formData.placa = ""
      formData.trailer = ""
      formData.conductor = ""
      formData.cedula =""
      formData.celular = ""
      formData.color = ""
      formData.modelo =""
      formData.marca = ""
      formData.prof =""
      formData.puerto =""
      formData.naviera = ""
      formData.agenciaAduanas = ""
      setState(formData)
      setContenedorSelect("")
    }
  }
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

      if (response.status !== 200) {
        throw new Error(response.message);
      }
      // Limpiar los campos después de enviar los datos
      messageModal("success", "Datos guardados con exito")
      setState(initialData);
    } catch (e) {
      if (e instanceof Error) {
        messageModal("error", e.message)
      }
    }
  };

  return (
    <div className='componentContainer'>
      <h2>Programación Tractomula</h2>
      <form onSubmit={enviarDatosMulas} onPaste={handlePaste} className='form-container'>
        <div>
          <label>Contenedores</label>
          <select className='defaultSelect' onChange={(e): void => setContenedorSelect(e.target.value)}>
            <option value="">Contendores</option>
            {props.contenedores?.map(item => (
              <option key={item._id} value={item._id}>{item.infoContenedor?.clienteInfo &&
                item.numeroContenedor + " - " + item.infoContenedor?.clienteInfo?.CLIENTE}</option>
            ))}
          </select>
        </div>
        {Object.keys(state).map((key, index) => (
          <div key={key}>
            <label>{labels[index]}</label>
            <input type="text" onChange={handleChange} name={key} value={state[key]} required />
          </div>
        ))}
        <div className='defaultSelect-button-div'>
          {props.modificar ?
            <button className="defaulButtonAgree" type='submit'>Modificar</button>
            :
            <button className="defaulButtonAgree" type='submit'>Guardar</button>
          }
        </div>
      </form>
    </div>
  );
};
