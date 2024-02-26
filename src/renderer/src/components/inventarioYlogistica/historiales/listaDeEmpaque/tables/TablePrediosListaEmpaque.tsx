/* eslint-disable prettier/prettier */
import { useContext, useEffect, useState } from 'react'
import { format } from 'date-fns'
import { themeType } from '@renderer/env'
import ObtenerInfoPrediosListaEmpaque from '../functions/ObtenerInfoPrediosListaEmpaque'
import ObtenerPrediosContenedor from '../functions/ObtenerPrediosContenedor'
import { userContext } from '@renderer/App'
import { FaPrint } from "react-icons/fa6";
import ModalImprimirRotulocaja from '../modal/ModalImprimirRotuloCaja'
import { isServerResponse } from '../functions/comprobarTypes'
import { contenedoresType } from '@renderer/types/contenedoresType'

type propsType = {
  contenedor: contenedoresType | undefined
  filtro: string
  theme: themeType
}

type outObjtype = {
  [key: string]: enfType
}

type enfType = {
  [key: string]: object
}

export default function TablePrediosListaEmpaque(props: propsType): JSX.Element {
  const user = useContext(userContext);
  const [tabla, setTabla] = useState<outObjtype>({})
  const [rendimiento, setRendimiento] = useState<rendimientoType[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [dataModal, setDataModal] = useState<enfType>({})

  useEffect(() => {
    const funcionAuxiliar = async (): Promise<void> => {
      const response: outObjtype = ObtenerInfoPrediosListaEmpaque(props.contenedor, props.filtro)
      const predios = ObtenerPrediosContenedor(props.contenedor)
      //console.log(response)
      const request = { action: 'obtenerRendimiento', data:predios }
      const rendimientoReq = await window.api.contenedores(request)
      console.log("obtener rendimiento", rendimientoReq)
      if(isServerResponse(rendimientoReq)){
        setRendimiento(rendimientoReq.data)
      } else{
        alert("error al obtener el rendimiento")
      }
      setTabla(response)
    }
    funcionAuxiliar()
    window.api.listaEmpaqueInfo('listaEmpaqueInfo', (response) => {
      setRendimiento(response.data)
    })
    window.api.descartes('descartes', async () => {
      const predios = ObtenerPrediosContenedor(props.contenedor)
      const request = { action: 'obtenerRendimiento', data:predios }
      const rendimientoReq = await window.api.contenedores(request)

      if(isServerResponse(rendimientoReq)){
        setRendimiento(rendimientoReq.data)
      } else{
        alert("error al obtener el rendimiento")
      }
    })
  }, [props.contenedor, props.filtro])

  const closeModal = (): void => {
    setOpenModal(false)
  }

  const clickpenModal = (e): void => {
    setDataModal(e)
    setOpenModal(true)
  }

  return (
    <div>
      {Object.keys(tabla).map((enf) => (
        <ul key={enf}
          className={`${props.theme === 'Dark' ? 'bg-slate-700' : 'bg-slate-100'}
                   list-none ml-2 mr-2 mb-5 border border-gray-300 rounded shadow-md p-2`}
        >
          <li >

          <div className='flex flex-row justify-between m-2'>
            <div className="flex flex-row gap-5 items-center ml-4">
              <p className={`${props.theme === 'Dark' ? 'text-white' : 'text-blue-500'} font-bold`}>
                {enf}
              </p>
              <p className={`${props.theme === 'Dark' ? 'text-white' : 'text-blue-500'} font-bold`}>
                {tabla[enf][Object.keys(tabla[enf])[0]][0].nombre}
              </p>
              {rendimiento && rendimiento.find(item => item._id === enf) && (
                <p
                  className={`${props.theme === 'Dark' ? 'text-white' : 'text-blue-500'} font-bold`}
                >
                  {rendimiento.find(item => item._id === enf)?.rendimiento.toFixed(2) + '%'}
                </p>
              )}
              <p className={`${props.theme === 'Dark' ? 'text-white' : 'text-blue-500'} font-bold`}>
                {Object.keys(tabla[enf]).reduce(
                  (acu, pallet) =>
                    (acu += Object.keys(tabla[enf][pallet]).reduce(
                      (acu1, item) => (acu1 += tabla[enf][pallet][item].cajas),
                      0
                    )),
                  0
                )}{' '}
                Cajas
              </p>
              <p className={`${props.theme === 'Dark' ? 'text-white' : 'text-blue-500'} font-bold`}>
                {Object.keys(tabla[enf]).reduce(
                  (acu, pallet) =>
                    (acu += Object.keys(tabla[enf][pallet]).reduce(
                      (acu1, item) =>

                      { 
                    const tipoCaja = tabla[enf][pallet][item].tipoCaja.replace('.', '_');
                        
                        acu1 +=
                        tabla[enf][pallet][item].cajas * 
                        props.contenedor.infoContenedor.pesoCaja[
                          tipoCaja
                        ]
                      return acu1
                      }
                       ,
                      0
                    )),
                  0
                ).toFixed(2)}{' '}
                Kg
              </p>
             
            </div>
            
            {user.cargo === 'auxiliar_lista_de_empaque' && 
            <button
            onClick={(): void => clickpenModal(tabla[enf])}
            className={
              user.cargo === 'auxiliar_lista_de_empaque' || user.cargo === 'admin' 
                ? 'group relative inline-flex w-40 h-10 items-center overflow-hidden rounded bg-red-700 px-8 py-3 text-white focus:outline-none active:bg-red-900 active:border-red-700'
                : 'invisible group relative inline-flex w-40 h-10 items-center overflow-hidden'
            }
          >
            <span className="absolute  -end-full transition-all group-hover:end-4">
            <FaPrint />
            </span>
    
            <span className="text-sm font-medium transition-all group-hover:me-4">
              Imprimir Rotulo
            </span>
          </button>
            }
            </div>
            <ul>
              {Object.keys(tabla[enf]).map((pallet) => (
                <li key={pallet}
                  className={`${
                    props.theme === 'Dark' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-black'
                  }
                            p-4 rounded-md mb-2`}
                >
                  <div className="flex flex-row gap-5">
                    <p className="font-bold">Pallet: {pallet}</p>
                  </div>
                  <div>
                    {Object.keys(tabla[enf][pallet]).map((item) => {
                      return (
                        <div className="flex gap-4" key={item + 'div'}>
                          <p key={item + 'cajas'}>Cajas: {tabla[enf][pallet][item].cajas}</p>
                          <p key={item + 'tipocaja'}>
                            Tipo caja: {tabla[enf][pallet][item].tipoCaja}
                          </p>
                          <p key={item + 'calibre'}>Calibre: {tabla[enf][pallet][item].calibre}</p>
                          <p key={item + 'calidad'}>Calidad: {tabla[enf][pallet][item].calidad}</p>
                          <p key={item + 'fecha'}>
                            Fecha: {format(new Date(tabla[enf][pallet][item].fecha), 'dd-MM-yyyy')}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      ))}
      {openModal && <ModalImprimirRotulocaja closeModal={closeModal} contenedor={props.contenedor} predio={dataModal}/>}

    </div>
  )
}
