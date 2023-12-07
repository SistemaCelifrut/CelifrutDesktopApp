import { themeType } from '@renderer/env'
import { useState, useEffect } from 'react'
import NavBarListaEmpaque from './utils/NavBarListaEmpaque'
import { ContenedoresObj } from './types/types'
import FiltrosListaEmpaque from './utils/FiltrosListaEmpaque'
import TablePrincipalGeneral from './tables/TablePrincipalGeneral'
import TablePallets from './tables/TablePallets'
import TablePrediosListaEmpaque from './tables/TablePrediosListaEmpaque'

type propsType = {
  theme: themeType
  user: string
}

export default function ListaDeEmpaque(props: propsType) {
  const [contenedores, setContenedores] = useState<ContenedoresObj>({})
  const [contenedorSelect, setContenedorSelect] = useState<string>('')
  const [filtro, setFiltro] = useState<string>('')
  const [filtro2, setFiltro2] = useState<string>('')

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const request = { action: 'obtenerListaEmpaque' }
        const response = await window.api.contenedores(request)
        console.log(response)
        setContenedores(response.data)
      } catch (e) {
        console.log(e)
      }
    }
    obtenerDatos()

    window.api.listaEmpaqueInfo('listaEmpaqueInfo', (response: any) => {
      setContenedores(response.listaEmpaque)
    })
  }, [])

  const handleChange = (event: any) => {
    setContenedorSelect(event.target.value as string)
  }

  useEffect(() => {
    setFiltro2('')
  }, [filtro])

  useEffect(()=>{},[filtro2])

  return (
    <div>
      <NavBarListaEmpaque contenedores={contenedores} handleChange={handleChange} />
      <FiltrosListaEmpaque
        contenedor={contenedores[contenedorSelect]}
        setFiltro={setFiltro}
        setFiltro2={setFiltro2}
        theme={props.theme}
      />
      <div>
        {filtro === '' ? (
          <TablePrincipalGeneral contenedor={contenedores[contenedorSelect]} theme={props.theme} />
        ) : null}
      </div>
      <div>
        {filtro === 'pallet' ? (
          <TablePallets
            contenedor={contenedores[contenedorSelect]}
            filtro={filtro2}
            theme={props.theme}
          />
        ) : null}
        <div>
          {filtro === 'predio' ? (
            <TablePrediosListaEmpaque
              theme={props.theme}
              contenedor={contenedores[contenedorSelect]}
              filtro={filtro2}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
