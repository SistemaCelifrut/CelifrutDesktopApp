/* eslint-disable prettier/prettier */

import { useState, useEffect } from 'react'
import NavBarListaEmpaque from './utils/NavBarListaEmpaque'
import FiltrosListaEmpaque from './utils/FiltrosListaEmpaque'
import TablePrincipalGeneral from './tables/TablePrincipalGeneral'
import TablePallets from './tables/TablePallets'
import TablePrediosListaEmpaque from './tables/TablePrediosListaEmpaque'
import { contenedoresType } from '@renderer/types/contenedoresType'
import useAppContext from '@renderer/hooks/useAppContext'



export default function ListaDeEmpaque(): JSX.Element {
  const {messageModal} = useAppContext();
  const [contenedores, setContenedores] = useState<contenedoresType[]>([])
  const [contenedor, setContenedor] = useState<contenedoresType | undefined>()
  const [contenedorSelect, setContenedorSelect] = useState<string>('')
  const [filtro, setFiltro] = useState<string>('')
  const [filtro2, setFiltro2] = useState<string>('')

  useEffect(() => {
    obtenerDatos()
    window.api.serverEmit('serverEmit', handleServerEmit)
        // Función de limpieza
        return () => {
          window.api.removeServerEmit('serverEmit', handleServerEmit)
        }
  }, [])

  const obtenerDatos = async (): Promise<void> => {
    try {
      const request = {
        data: {
          query: {"infoContenedor.cerrado": false},
          select: {},
          populate:
            [{
              path: "infoContenedor.clienteInfo",
              select: "CLIENTE",
            }],
        },
        collection: 'contenedores',
        action: 'getContenedores',
        query: 'proceso'
      };
      const response = await window.api.server(request)
      console.log(response.data)
      if(response.status !== 200){
        throw new Error(response.message);
      }
      setContenedores(response.data)
    } catch (e) {
      if(e instanceof Error){
        messageModal("error", e.message)
      }
    }
  }

  const handleServerEmit = async (data): Promise<void> => {
    if (data.fn === "vaciado" || data.fn === "ingresoLote" || data.fn === "procesoLote" || data.fn === "descartesToDescktop") {
      await obtenerDatos()
    }
}
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setContenedorSelect((event.target.value as string))
  }
  useEffect(() => {
    const cont = contenedores.find(item => item._id === contenedorSelect)
    if (cont) {
      setContenedor(cont)
    }
  }, [contenedorSelect, contenedores])

  useEffect(() => {
    setFiltro2('')
  }, [filtro])

  useEffect(() => { }, [filtro2])

  return (
    <div className='componentContainer'>
      <NavBarListaEmpaque contenedores={contenedores} handleChange={handleChange} />
      <FiltrosListaEmpaque
        contenedor={contenedor}
        setFiltro={setFiltro}
        setFiltro2={setFiltro2}
      />
      <div>
        {filtro === '' ? (
          <TablePrincipalGeneral contenedor={contenedor} />
        ) : null}
      </div>
      <div>
        {filtro === 'pallet' ? (
          <TablePallets
            contenedor={contenedor}
            filtro={filtro2}
          />
        ) : null}
        <div>
          {filtro === 'predio' ? (
            <TablePrediosListaEmpaque
              contenedor={contenedor}
              filtro={filtro2}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
