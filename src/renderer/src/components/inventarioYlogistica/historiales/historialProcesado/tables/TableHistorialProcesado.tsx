/* eslint-disable prettier/prettier */
import { format } from 'date-fns'
import HeaderTableHistorialProcesado from '../utils/HeaderTableHistorialProcesado'
import { historialLotesType } from '@renderer/types/lotesType'
import { es } from 'date-fns/locale';

type propsType = {
  table: historialLotesType[]
  clickLote: (e) => void
}

export default function TableHistorialProcesado(props: propsType): JSX.Element {
  return (
    <table className='table-main'>
      <HeaderTableHistorialProcesado />
        <tbody>
          {props.table && props.table.map((item, index) => (
            <tr key={item._id} className={`${index % 2 === 0 ? 'fondo-par' : 'fondo-impar'}`} >
              <td>
                <input type="radio"  id={item._id} value={item._id} onClick={props.clickLote} name='lote'></input>
              </td>
              <td>{item.documento.enf}</td>
              <td>{item.documento.predio && item.documento.predio.PREDIO}</td>
              <td>
                { item.documento.kilosVaciados && item.documento.promedio ?  
                (item.documento.kilosVaciados / item.documento.promedio).toLocaleString('es-ES'): 0}
              </td>
              <td>{item.documento.kilosVaciados && item.documento.kilosVaciados.toLocaleString('es-ES')}</td>
              <td>{item.documento.tipoFruta}</td>
              <td>{format(new Date(item.fecha), 'dd/MM/yyyy HH:mm', { locale: es })}</td>
              <td>{item.user && item.user}</td>

            </tr>
          ))}
        </tbody>

    </table>
  )
}
