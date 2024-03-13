/* eslint-disable prettier/prettier */
import { useContext, useEffect, useState } from 'react'
import { format } from 'date-fns'
import { FaPrint } from "react-icons/fa6";
import { userContext } from '@renderer/App'
import { contenedoresType, palletType } from '@renderer/types/contenedoresType';
import { pesoCajas } from '../const/constants';



type propsType = {
  contenedor: contenedoresType | undefined
  filtro: string
}

export default function TablePallets(props: propsType): JSX.Element {
  const [tabla, setTabla] = useState<palletType[]>()
  const user = useContext(userContext);

  useEffect(() => {
    let data;
    if(props.filtro !== ''){
      data = []
       data.push(props.contenedor?.pallets && props.contenedor?.pallets[props.filtro]);
    } else {
      data = props.contenedor?.pallets
    }
    if (props.contenedor)
      setTabla(data)
  }, [props.contenedor, props.filtro])

  const handleImprimir = (pallet): void => {
    const data = {
      tipoRotulo: 'rotuloPallet',
      pallet: pallet
    }
    window.api.server(data);
  }

  return (
    <div>
      {tabla && tabla.map((pallet, index) => (
        <ul key={pallet + 'div'}
          className="listaEmpaque-table-pallets-container">
          <li>
            <div className="listaEmpaque-table-pallets-container-cabecera">
              <p>
                {props.contenedor && props.contenedor.infoContenedor?.tipoEmpaque === 'Caja' ? 'Pallet: ' : 'Estiba: '}
                {props.filtro === '' ? index + 1 : Number(props.filtro) + 1} -- {(pallet.EF1.reduce((acu, item) => acu += item.cajas ? item.cajas : 0, 0))} cajas
                ---
                {(pallet.EF1.reduce((acu, item) => {
                  acu += item.cajas !== undefined && item.tipoCaja ? item.cajas * pesoCajas[item.tipoCaja] : 0
                  return acu
                }, 0)).toFixed(2)}Kg
              </p>
              {user.cargo === "auxiliar-listaEmpaque" &&
                <button onClick={(): void => handleImprimir(pallet)}>
                  <span >
                    <FaPrint />
                  </span>
                  <span>
                    Imprimir Rotulo
                  </span>
                </button>
              }
            </div>
            <ul className="ml-4">
              {pallet.EF1.map((enf, index) => (
                <li
                  key={index}
                  className="listaEmpaque-table-pallets-container-dic-item">
                  <div>
                    <p>
                      {enf.lote && enf.lote.enf && enf.lote.enf}
                    </p>
                    <p>
                      {enf.lote && enf.lote.predio && enf.lote.predio}
                    </p>
                    <p>
                      {enf.cajas} Cajas
                    </p>
                    <p>
                      {enf.tipoCaja}
                    </p>
                    <p>
                      Calibre: {enf.calibre}
                    </p>
                    <p>
                      Calidad:{enf.calidad}
                    </p>
                    <p>
                      {format(enf.fecha ? new Date(enf.fecha) : new Date(), 'dd-MM-yyyy')}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      ))}
    </div>
  )
}
