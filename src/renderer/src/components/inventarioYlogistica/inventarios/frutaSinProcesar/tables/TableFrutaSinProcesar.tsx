/* eslint-disable prettier/prettier */
import { format } from 'date-fns'
import HeaderTableFurtaSinProcesar from '../utils/HeaderTableFurtaSinProcesar'
import { lotesType } from '@renderer/types/lotesType'
import { PiNotePencilDuotone } from "react-icons/pi";
import { es } from 'date-fns/locale';

type propsType = {
  table: lotesType[]
  propsModal: lotesType
  clickLote: (e) => void
  handleModificar: () => void
  setLoteSeleccionado: (lote) => void
}

export default function TableFrutaSinProcesar(props: propsType): JSX.Element {
  const handleButton = (lote): void => {
    props.handleModificar()
    props.setLoteSeleccionado(lote)
}
  const handleClick = (e): void => {
    props.clickLote(e);
  };
  return (
    <table className='table-main'>
      <HeaderTableFurtaSinProcesar />
      <tbody>
        {props.table.sort().map((lote, index) => (
          <tr className={`${index % 2 === 0 ? 'fondo-par' : 'fondo-impar'}`} key={index} >
            <td>
              <input
                type="radio"
                onChange={handleClick}
                id={lote.enf}
                value={lote.enf}
                name='lote' ></input>
            </td>
            <td>
              {lote.enf}
            </td>
            <td>
              {lote.predio && lote.predio.PREDIO}
            </td>
            <td>
              {lote.predio && lote.predio.ICA}
            </td>
            <td>
              {lote.fechaIngreso ? format(new Date(lote.fechaIngreso), 'dd/MM/yyyy HH:mm', { locale: es }) : ""}
            </td>
            <td>
              {(lote?.inventario && lote.promedio) ? (lote.inventario * lote.promedio).toFixed(2) : 0}
            </td>
            <td>
              {lote?.inventario && lote.inventario}
            </td>
            <td>
              {lote.tipoFruta}
            </td>
            <td>
              {lote.clasificacionCalidad}
            </td>
            <td>
              {lote.observaciones}
            </td>
            <td>
              <button style={{ color: "blue" }} onClick={(): void => handleButton(lote)} ><PiNotePencilDuotone /></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
