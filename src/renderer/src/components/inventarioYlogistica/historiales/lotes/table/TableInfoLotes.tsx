/* eslint-disable prettier/prettier */
import { useState } from "react"
import { filtroColumnasType } from "../type/types"
import { format } from "date-fns"
import { KEYS_FILTROS_COL } from "../functions/constantes"
import { lotesType } from "@renderer/types/lotesType"

type propsType = {
  data: lotesType[]
  columnVisibility: filtroColumnasType
}
export default function TableInfoLotes(props: propsType): JSX.Element {
  const [showDetailDescarte, setShowDetailDescarte] = useState<boolean>(false)
  const [indice1, setIndice1] = useState<string>('')
  const [indice2, setIndice2] = useState<string>('')
  const handleDetails = (e, e2): void => {
    setIndice1(e)
    setIndice2(e2)
    setShowDetailDescarte(!showDetailDescarte)
  }
  return (
    <div className="componentContainer">
      <table className="table-main">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del predio</th>
            <th>Fecha de ingreso</th>
            <th>Tipo de fruta</th>
            {Object.keys(props.columnVisibility).map(item => {
              if (props.columnVisibility[item]) {
                return (
                  <th key={item}>
                    {KEYS_FILTROS_COL[item]}
                  </th>
                )
              } else {
                return null
              }
            })}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(props.data) && props.data.map((lote, index) => (
            lote && typeof lote === 'object' && typeof lote !== undefined ?
            <tr className={`${index % 2 === 0 ? 'fondo-par' : 'fondo-impar'}`} key={index}>
              <td>{lote.predio?.PREDIO ? lote.predio.PREDIO : lote.predio?.PREDIO}</td>
              <td>{lote.enf}</td>
              <td>{format(lote.fechaIngreso ? new Date(lote.fechaIngreso) : new Date(), 'dd-MM-yyyy')}</td>
              <td>{lote.tipoFruta}</td>
              {Object.keys(props.columnVisibility).map((item, index2) => {
                if (props.columnVisibility[item]) {
                  if(item === 'descarteLavado' || item === 'descarteEncerado'){
                    return (
                      <td 
                        key={lote + item} 
                        onClick={(): void => handleDetails(index, index2)}>

                      {showDetailDescarte && (index === Number(indice1) && (index2 === Number(indice2))) ? 
                     <td>{
                      typeof lote !== 'undefined' && lote[item] !== undefined ? Object.keys(lote[item as string]).map(descarte => (
                        <p key={descarte}>{descarte}: {lote[item as string][descarte]}</p>
                      )) : null
                    }</td>
                    : 
                      Object.keys(lote[item as string]).reduce((acu, descarte) => acu += lote[item as string][descarte], 0).toFixed(2)} Kg
                    </td>
                    )
                  } else if( item === 'contenedores'){
                   
                      return <td 
                      key={lote + item} >
                       {lote.contenedores?.reduce((acu, cont) => acu += cont + ' ', '')}
                      </td>
                    
                  } else if(item === 'exportacion'){
                    return (
                      <td 
                        key={lote + item} 
                        onClick={(): void => handleDetails(index, index2)}>

                      {showDetailDescarte && (index === Number(indice1) && (index2 === Number(indice2))) ? 
                     <td>{
                        <div className="lote-proceso-tabla-exportacion-div">
                          <p> Calidad 1: {lote.calidad1}Kg</p>
                          <p> Calidad 1.5: {lote.calidad15}Kg</p>
                          <p> Calidad 2: {lote.calidad2}Kg</p>
                        </div>
           
                    }</td>
                    : 
                    lote && lote.calidad1 !== undefined && lote.calidad15 !== undefined && lote.calidad2 !== undefined ? 
                    (lote.calidad1 + lote.calidad15 + lote.calidad2).toFixed(2) + ' Kg' : 0 + 'Kg'} 
                    </td>
                    )
                  }
                  else {
                  return (
                    <td key={lote + item}>
                      {typeof lote[item] === 'number' ? lote[item].toFixed(2) : lote[item]}
                    </td>
                  )
                  }
                }else{
                  return null
                }
              })}
            </tr>
         : <div key={index}></div> ))}
        </tbody>
      </table>
    </div>
  )
}
