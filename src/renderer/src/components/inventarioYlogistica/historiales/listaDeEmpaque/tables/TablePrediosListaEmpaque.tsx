/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import ObtenerInfoPrediosListaEmpaque from '../functions/ObtenerInfoPrediosListaEmpaque'
import { FaPrint } from "react-icons/fa6";
import ModalImprimirRotulocaja from '../modal/ModalImprimirRotuloCaja'
import { contenedoresType } from '@renderer/types/contenedoresType'
import useAppContext from '@renderer/hooks/useAppContext'
import ObtenerListaIdsPredios from '../functions/ObtenerListaIdsPredios'
import { pesoCajas } from '../const/constants';
import "../css/table.css"
import { lotesType } from '@renderer/types/lotesType';

type propsType = {
  contenedor: contenedoresType | undefined
  filtro: string
}



type enfType = {
  [key: string]: object
}

export default function TablePrediosListaEmpaque(props: propsType): JSX.Element {
  const { messageModal } = useAppContext();
  const [tabla, setTabla] = useState<object>({})
  const [rendimiento, setRendimiento] = useState<lotesType[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [dataModal, setDataModal] = useState<enfType>({})

  useEffect(() => {
    funcionAuxiliar()
    // window.api.listaEmpaqueInfo('listaEmpaqueInfo', (response) => {
    //   setRendimiento(response.data)
    // })
    // window.api.descartes('descartes', async () => {
    //   const predios = ObtenerPrediosContenedor(props.contenedor)
    //   const request = { action: 'obtenerRendimiento', data:predios }
    //   const rendimientoReq = await window.api.contenedores(request)

    //   if(isServerResponse(rendimientoReq)){
    //     setRendimiento(rendimientoReq.data)
    //   } else{
    //     alert("error al obtener el rendimiento")
    //   }
    // })
  }, [props.contenedor, props.filtro])

  const funcionAuxiliar = async (): Promise<void> => {
    try {
      if (!props.contenedor) throw new Error("Error con la informacion del contenedor")
      const response = ObtenerInfoPrediosListaEmpaque(props.contenedor, props.filtro)
      const predios = ObtenerListaIdsPredios(props.contenedor);
      const request = {
        data: {
          query: {
            _id: { $in: predios }
          },
          select: { enf: 1, rendimiento: 1 },
          populate: {
            path: "predio",
            select: "PREDIO ICA"
          },
          sort: {}
        },
        collection: "lotes",
        action: "getLotes",
        query: "proceso",
      };
      const rendimientoReq = await window.api.server(request)
      if (rendimientoReq.status !== 200) {
        throw new Error(rendimientoReq.message);
      }
      console.log("obtener rendimiento", rendimientoReq)
      console.log("obtener tabla", response)
      setRendimiento(rendimientoReq.data)
      setTabla(response)
    } catch (e) {
      if (e instanceof Error) {
        messageModal("error", e.message);
      }
    }
  }

  const closeModal = (): void => {
    setOpenModal(false)
  }

  const clickpenModal = (e): void => {
    setDataModal(e)
    setOpenModal(true)
  }

  return (
    <div className="listaEmpaque-table-pallets-container">
      {Object.keys(tabla).map((_id) => (
        <ul key={_id}>
          <li >
            <div className="listaEmpaque-table-pallets-container-cabecera" >
              <div className='listaEmpaque-table-predios-infoPredios'>
                <p>{tabla[_id][Object.keys(tabla[_id])[0]][0].lote.enf}</p>
                <p>
                  {tabla[_id][Object.keys(tabla[_id])[0]][0].lote.predio}
                </p>

                <p>
                  {rendimiento && rendimiento.find(item => item._id === _id)?.rendimiento + '%'}
                </p>

                <p>
                  {Object.keys(tabla[_id]).reduce(
                    (acu, pallet) =>
                    (acu += Object.keys(tabla[_id][pallet]).reduce(
                      (acu1, item) => (acu1 += tabla[_id][pallet][item].cajas),
                      0
                    )),
                    0
                  )}{' '}
                  Cajas
                </p>
                <p>
                  {Object.keys(tabla[_id]).reduce(
                    (acu, pallet) =>
                    (acu += tabla[_id][pallet].reduce(
                      (acu1, item) => {
                        acu1 += item.cajas * pesoCajas[item.tipoCaja]
                        return acu1
                      },0
                    )),0
                  ).toFixed(2)}{' '}
                  Kg
                </p>

              </div>


              <button onClick={(): void => clickpenModal(tabla[_id])}>
                <span className="absolute  -end-full transition-all group-hover:end-4">
                  <FaPrint />
                </span>

                <span className="text-sm font-medium transition-all group-hover:me-4">
                  Imprimir Rotulo
                </span>
              </button>

            </div>
            <ul>
              {Object.keys(tabla[_id]).map((pallet) => (
                <li key={pallet} className='listaEmpaque-table-pallets-container-dic-item'>
                  <div>
                    <p>Pallet: {pallet}</p>
                  </div>
                  <div>
                    {Object.keys(tabla[_id][pallet]).map((item) => {
                      return (
                        <div key={item + 'div'}>
                          <p key={item + 'cajas'}>Cajas: {tabla[_id][pallet][item].cajas}</p>
                          <p key={item + 'tipocaja'}>
                            Tipo caja: {tabla[_id][pallet][item].tipoCaja}
                          </p>
                          <p key={item + 'calibre'}>Calibre: {tabla[_id][pallet][item].calibre}</p>
                          <p key={item + 'calidad'}>Calidad: {tabla[_id][pallet][item].calidad}</p>
                          <p key={item + 'fecha'}>
                            Fecha: {format(new Date(tabla[_id][pallet][item].fecha), 'dd-MM-yyyy')}
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
      {openModal && <ModalImprimirRotulocaja closeModal={closeModal} predio={dataModal} />}

    </div>
  )
}
