/* eslint-disable prettier/prettier */

import { useEffect, useState } from 'react'
import "../../../css/filtros.css"
import { userType } from '@renderer/types/cuentas';
import TablaCuentas from './components/TablaCuentas';
import useAppContext from '@renderer/hooks/useAppContext';
import "./css/usuarios-estilos.css"
import IngresarCuentas from './components/IngresarCuenta';

export default function Cuentas(): JSX.Element {
  const { messageModal } = useAppContext();
  const [filtro, setFiltro] = useState<string>('')
  const [data, setData] = useState<userType[]>();
  const [opciones, setOpciones] = useState<string>('inicio')
  const [modificar, setModificar] = useState<boolean>(false)
  const [usuario, setUsuario] = useState<userType>()


  const obtenerData = async (): Promise<void> => {
    try {
      const request = { collection: 'users', action: 'getUsers' }
      const response = await window.api.server(request);
      if (response.status !== 200)
        throw new Error(response.message)
      setData(response.data)
    } catch (e) {
      if (e instanceof Error)
        messageModal("error", e.message);
    }
  }
  const handleServerEmit = async (data): Promise<void> => {
    if (data.fn === "cambio-usuario") {
      await obtenerData()
    }
  }
  useEffect(() => {
    obtenerData();
    window.api.serverEmit('serverEmit', handleServerEmit)

    // Función de limpieza
    return () => {
      window.api.removeServerEmit('serverEmit', handleServerEmit)
    }
  }, [])
  const handleChange = (): void => {
    if(opciones === "inicio"){
      setOpciones("agregar")
      setModificar(false)
    }
    else if(opciones === "agregar")
      setOpciones("inicio")
  }
  const handleModificar = (usuario): void => {
    setOpciones("agregar")
    setModificar(true)
    setUsuario(usuario)
  }

  return (
    <div className='componentContainer'>
      <div className='navBar'></div>
      <div className='filtroContainer'>
        <h3>Cuentas</h3>
        <hr />
        <div className='div-filter-actions'>
          <button onClick={handleChange}>
            Agregar cuenta
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /><path d="M15 12h-6" /><path d="M12 9v6" /></svg>
          </button>
          <input type="text" value={filtro} placeholder='Buscar...' onChange={(e): void => setFiltro(e.target.value)} />
        </div>
      </div>
      <div>
        {opciones === "inicio" && 
          <TablaCuentas 
            data={data} 
            handleModificar={handleModificar} /> }

        {opciones === "agregar" && 
          <IngresarCuentas 
            modificar={modificar}
            usuario={usuario}
            handleChange={handleChange}/>
        }
      </div>

    </div>
  )
}