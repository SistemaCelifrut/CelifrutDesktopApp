/* eslint-disable prettier/prettier */
import { themeType } from '@renderer/env'
import { useState, useEffect } from 'react'
import NavBarListaEmpaque from './utils/NavBarListaEmpaque'
import { ContenedoresObj, serverInfoContenedoresType } from './types/types'
import FiltrosListaEmpaque from './utils/FiltrosListaEmpaque'
import TablePrincipalGeneral from './tables/TablePrincipalGeneral'
import TablePallets from './tables/TablePallets'
import TablePrediosListaEmpaque from './tables/TablePrediosListaEmpaque'
import { initialContenedor } from './functions/initialContenedor'

type propsType = {
  theme: themeType
  user: string
}

export default function ListaDeEmpaque(props: propsType): JSX.Element {
  const [contenedores, setContenedores] = useState<ContenedoresObj[]>([])
  const [contenedor, setContenedor] = useState<ContenedoresObj>(initialContenedor)
  const [contenedorSelect, setContenedorSelect] = useState<string>('')
  const [filtro, setFiltro] = useState<string>('')
  const [filtro2, setFiltro2] = useState<string>('')

  useEffect(() => {
    const obtenerDatos = async (): Promise<void> => {
      try {
        const request = { action: 'obtenerDataContenedor' }
        const response = await window.api.contenedores(request)
        console.log(response)
        setContenedores(response.data)
      } catch (e) {
        console.log(e)
      }
    }
    obtenerDatos()

    window.api.listaEmpaqueInfo('listaEmpaqueInfo', (response: serverInfoContenedoresType) => {
      setContenedores(response.data)
      console.log(response);
    })
  }, [])

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>): void => {
    setContenedorSelect((event.target.value as string))
  }
  useEffect(()=>{
    const cont = contenedores.find(item => item._id === Number(contenedorSelect))
    if(cont){
      setContenedor(cont)
    }
  },[contenedorSelect, contenedores])

  useEffect(() => {
    setFiltro2('')
  }, [filtro])

  useEffect(()=>{},[filtro2])

  return (
    <div>
      <NavBarListaEmpaque contenedores={contenedores} handleChange={handleChange} />
      <FiltrosListaEmpaque
        contenedor={contenedor}
        setFiltro={setFiltro}
        setFiltro2={setFiltro2}
        theme={props.theme}
      />
      <div>
        {filtro === '' ? (
          <TablePrincipalGeneral contenedor={contenedor} theme={props.theme} />
        ) : null}
      </div>
      <div>
        {filtro === 'pallet' ? (
          <TablePallets
            contenedor={contenedor}
            filtro={filtro2}
            theme={props.theme}
          />
        ) : null}
        <div>
          {filtro === 'predio' ? (
            <TablePrediosListaEmpaque
              theme={props.theme}
              contenedor={contenedor}
              filtro={filtro2}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
