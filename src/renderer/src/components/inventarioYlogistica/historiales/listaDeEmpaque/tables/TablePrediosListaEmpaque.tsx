/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import ObtenerInfoPrediosListaEmpaque from '../functions/ObtenerInfoPrediosListaEmpaque'
import ModalImprimirRotulocaja from '../modal/ModalImprimirRotuloCaja'
import { contenedoresType } from '@renderer/types/contenedoresType'
import useAppContext from '@renderer/hooks/useAppContext'
import ObtenerListaIdsPredios from '../functions/ObtenerListaIdsPredios'
import { pesoCajas } from '../const/constants';
import "../css/table.css"
import { lotesType } from '@renderer/types/lotesType';
import { es } from 'date-fns/locale';

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
    <>
      {Object.keys(tabla).map((_id) => (
        <table className="table-main" key={_id} style={{backgroundColor:"white"}}>
          <thead>
            <tr>
              <th>{tabla[_id][Object.keys(tabla[_id])[0]][0].lote.enf}</th>
              <th>{tabla[_id][Object.keys(tabla[_id])[0]][0].lote.predio}</th>
              <th>
                <p>Rendimiento:</p>
                {rendimiento && rendimiento.find(item => item._id === _id)?.rendimiento?.toFixed(2) + '%'}
              </th>
              <th>
                <p>Total cajas:</p>
                {Object.keys(tabla[_id]).reduce(
                  (acu, pallet) =>
                  (acu += Object.keys(tabla[_id][pallet]).reduce(
                    (acu1, item) => (acu1 += tabla[_id][pallet][item].cajas),
                    0
                  )),
                  0
                )}{' '}
                Cajas
              </th>
              <th>
                <p>Peso:</p>
                {Object.keys(tabla[_id]).reduce(
                  (acu, pallet) =>
                  (acu += tabla[_id][pallet].reduce(
                    (acu1, item) => {
                      acu1 += item.cajas * pesoCajas[item.tipoCaja]
                      return acu1
                    }, 0
                  )), 0
                ).toFixed(2)}{' '}
                Kg
              </th>
              <th>
                <button onClick={(): void => clickpenModal(tabla[_id])}>
                  <span className="text-sm font-medium transition-all group-hover:me-4">
                    Imprimir Rotulo
                  </span>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6}>
                <table className="table-main">
                  <thead>
                    <tr>
                      <th>Pallet</th>
                      <th>Cajas</th>
                      <th>Tipo de caja</th>
                      <th>Calibre</th>
                      <th>Calidad</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                      {Object.keys(tabla[_id]).map((pallet, index) => (
                        <tr key={pallet} className={`${index % 2 === 0 ? 'fondo-par' : 'fondo-impar'}`} >
                          <td>Pallet: {Number(pallet) + 1}</td>
                          <td>
                            {Object.keys(tabla[_id][pallet]).reduce((acu, item) => (
                            acu += Number(tabla[_id][pallet][item].cajas)
                            ), 0)}
                          </td>
                          <td>
                            {tabla[_id][pallet][0].tipoCaja}
                          </td>
                          <td>
                            {tabla[_id][pallet][0].calibre}
                          </td>
                          <td>
                            {tabla[_id][pallet][0].calidad}
                          </td>
                          <td>
                            {format(tabla[_id][pallet][0].fecha ? new Date(tabla[_id][pallet][0].fecha) : new Date(), 'dd/MM/yyyy HH:mm', { locale: es })}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>

        </table>
      ))}
           {openModal && <ModalImprimirRotulocaja closeModal={closeModal} predio={dataModal} />}
    </>
  )

  // return (
  //   <div className="listaEmpaque-table-pallets-container">
  //     {Object.keys(tabla).map((_id) => (
  //       <ul key={_id}>
  //         <li >
  //           <div className="listaEmpaque-table-pallets-container-cabecera" >
  //             <div className='listaEmpaque-table-predios-infoPredios'>
  //               <p>{tabla[_id][Object.keys(tabla[_id])[0]][0].lote.enf}</p>
  //               <p>
  //                 {tabla[_id][Object.keys(tabla[_id])[0]][0].lote.predio}
  //               </p>

  //               <p>
  //                 {rendimiento && rendimiento.find(item => item._id === _id)?.rendimiento?.toFixed(2) + '%'}
  //               </p>

  //               <p>
  //                 {Object.keys(tabla[_id]).reduce(
  //                   (acu, pallet) =>
  //                   (acu += Object.keys(tabla[_id][pallet]).reduce(
  //                     (acu1, item) => (acu1 += tabla[_id][pallet][item].cajas),
  //                     0
  //                   )),
  //                   0
  //                 )}{' '}
  //                 Cajas
  //               </p>
  //               <p>
  //                 {Object.keys(tabla[_id]).reduce(
  //                   (acu, pallet) =>
  //                   (acu += tabla[_id][pallet].reduce(
  //                     (acu1, item) => {
  //                       acu1 += item.cajas * pesoCajas[item.tipoCaja]
  //                       return acu1
  //                     },0
  //                   )),0
  //                 ).toFixed(2)}{' '}
  //                 Kg
  //               </p>

  //             </div>


  //             <button onClick={(): void => clickpenModal(tabla[_id])}>
  //               <span className="text-sm font-medium transition-all group-hover:me-4">
  //                 Imprimir Rotulo
  //               </span>
  //             </button>

  //           </div>
  //           <ul>
  //             {Object.keys(tabla[_id]).map((pallet) => (
  //               <li key={pallet} className='listaEmpaque-table-pallets-container-dic-item'>
  //                 <div>
  //                   <p>Pallet: {Number(pallet) + 1}</p>
  //                 </div>
  //                 <div style={{display:"flex", flexDirection:"column"}} >
  //                   {Object.keys(tabla[_id][pallet]).map((item) => {
  //                     return (
  //                       <div key={item + 'div'} >
  //                         <p key={item + 'cajas'}>Cajas: {tabla[_id][pallet][item].cajas}</p>
  //                         <p key={item + 'tipocaja'}>
  //                           Tipo caja: {tabla[_id][pallet][item].tipoCaja}
  //                         </p>
  //                         <p key={item + 'calibre'}>Calibre: {tabla[_id][pallet][item].calibre}</p>
  //                         <p key={item + 'calidad'}>Calidad: {tabla[_id][pallet][item].calidad}</p>
  //                         <p key={item + 'fecha'}>
  //                           Fecha: {format(new Date(tabla[_id][pallet][item].fecha), 'dd-MM-yyyy')}
  //                         </p>
  //                       </div>
  //                     )
  //                   })}
  //                 </div>
  //               </li>
  //             ))}
  //           </ul>
  //         </li>
  //       </ul>
  //     ))}


  //   </div>
  // )
}
