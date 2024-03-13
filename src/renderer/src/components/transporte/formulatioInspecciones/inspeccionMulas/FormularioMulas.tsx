/* eslint-disable prettier/prettier */
import '@fortawesome/fontawesome-free/css/all.css';
import { contenedoresType } from '@renderer/types/contenedoresType';
import { useEffect, useState } from 'react';
import { contenedoresRequest, initData, send_data } from './functions/constants';
import useAppContext from '@renderer/hooks/useAppContext';
import ShowDataContenedores from './utils/ShowDataContenedores';
import FormularioInspeccion from './utils/FormularioInspeccion';

const FormularioMulas: React.FC = () => {
  const { messageModal } = useAppContext();
  const [contenedores, setContenedores] = useState<contenedoresType[]>()
  const [contenedorSelect, setContenedorSelect] = useState<contenedoresType>()
  const [responsable, setResponsable] = useState<string>("")
  const [formState, setFormState] = useState(initData)

  useEffect(() => {
    obtenerContenedores();
  }, []);
  const obtenerContenedores = async (): Promise<void> => {
    try {
      const response = await window.api.server(contenedoresRequest);
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
  const handleChangeCheckBoxk = (event): void => {
    const { name, checked } = event.target;
    setFormState({
      ...formState,
      [name]:{...formState[name],cumple:checked}
    });
  };
  const handleChangeObservaciones  = (event): void =>{
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]:{...formState[name],observaciones:value}
    });
  }
  const handleSubmit = async (event): Promise<void> => {
    event.preventDefault();
    try {
      const sendData = send_data(formState, responsable, contenedorSelect);
      const response = await window.api.server(sendData);
      if(response.status !== 200) 
        throw new Error(response.message)
      messageModal("success","datos guardados con exito!")
    } catch(e){
      if(e instanceof Error){
        messageModal("error", e.message)
      }
    }
  }

  return (
    <div className="componentContainer">
      <div className='navBar'></div>
      <h2>Formulario de Inspección</h2>
      <form className='formulario-inspeccion-mula-container' onSubmit={handleSubmit}>
        <div>
          <label>Responsable</label>
          <input type="text" onChange={(e): void => setResponsable(e.target.value)} className="formulario-inspeccion-mula-container-input" required />
        </div>
        <div>
          <label>Contenedores</label>
          <select className='defaultSelect'
            onChange={(e): void => setContenedorSelect(contenedores?.find(item => item._id === e.target.value))}>
            <option value="">Contendores</option>
            {contenedores && contenedores?.map(item => (
              <option key={item._id} value={item._id}>{item.infoContenedor?.clienteInfo &&
                item.numeroContenedor + " - " + item.infoContenedor?.clienteInfo?.CLIENTE}</option>
            ))}
          </select>
        </div>
        <div>
          {contenedorSelect !== undefined && <ShowDataContenedores contenedorSelect={contenedorSelect} />}
        </div>
        <div>
          <FormularioInspeccion 
            formState={formState}
            handleChangeCheckBoxk={handleChangeCheckBoxk} 
            handleChangeObservaciones={handleChangeObservaciones}/>
        </div>
        <div className='formulario-inspeccionMula-div-button'>
          <button className='formulario-inspeccionMula-button'>Guardar</button>
        </div>
      </form>
    </div>
  );
};
export default FormularioMulas;