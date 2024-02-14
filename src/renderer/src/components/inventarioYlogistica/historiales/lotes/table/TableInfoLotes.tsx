/* eslint-disable prettier/prettier */
import { useContext, useState } from "react"
import { LoteDataType, filtroColumnasType } from "../type/types"
import { themeContext } from "@renderer/App"
import { format } from "date-fns"
import { KEYS_FILTROS_COL } from "../functions/constantes"

type propsType = {
  data: LoteDataType[]
  columnVisibility: filtroColumnasType
}
export default function TableInfoLotes(props: propsType): JSX.Element {
  const theme = useContext(themeContext);
  const [showDetailDescarte, setShowDetailDescarte] = useState<boolean>(false)
  const [indice1, setIndice1] = useState<string>('')
  const [indice2, setIndice2] = useState<string>('')
  const handleDetails = (e, e2): void => {
    setIndice1(e)
    setIndice2(e2)
    setShowDetailDescarte(!showDetailDescarte)
  }
  return (
    <div>
      <table className={`mr-2 ml-2 w-full mt-4 border-2 table-fixed`}>
        <thead className={`${theme === 'Dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
          <tr className="h-14 broder-2">
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>ID</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Nombre del predio</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Fecha de ingreso</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Tipo de fruta</th>
            {Object.keys(props.columnVisibility).map(item => {
              if (props.columnVisibility[item]) {
                return (
                  <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex-wrap overflow-auto text-sm`} key={item}>
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
            <tr
              className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`} key={index}
            >
              <td className="p-2 text-sm  text-center">{lote.enf}</td>
              <td className="p-2 text-sm  text-center">{lote.predio?.PREDIO ? lote.predio.PREDIO : lote.predio?.PREDIO}</td>
              <td className="p-2 text-sm  text-center">{format(new Date(lote.fechaIngreso), 'dd-MM-yyyy')}</td>
              <td className="p-2 text-sm  text-center">{lote.tipoFruta}</td>
              {Object.keys(props.columnVisibility).map((item, index2) => {
                if (props.columnVisibility[item]) {
                  if(item === 'descarteLavado' || item === 'descarteEncerado'){
                    return (
                      <td className={`p-2 text-sm  text-center cursor-pointer`}
                        key={lote + item} 
                        onClick={(): void => handleDetails(index, index2)}>

                      {showDetailDescarte && (index === Number(indice1) && (index2 === Number(indice2))) ? 
                      <td>{
                        Object.keys(lote[item]).map(descarte => (
                          <p key={descarte}>{descarte}: {lote[item][descarte]}</p>
                        ))
                        }</td> : 
                      Object.keys(lote[item]).reduce((acu, descarte) => acu += lote[item][descarte], 0).toFixed(2)} Kg
                    </td>
                    )
                  } else if( item === 'exportacion'){
                    if(!Object.prototype.hasOwnProperty.call(lote, 'exportacion')){
                      return <td className={`p-2 text-sm  text-center cursor-pointer`}
                      key={lote + item} >
                        0
                      </td>
                    } else{
                    return (
                      <td className={`p-2 text-sm  text-center cursor-pointer`}
                      key={lote + item} 
                      onClick={(): void => handleDetails(index, index2)}>
                      {showDetailDescarte && (index === Number(indice1) && (index2 === Number(indice2))) ? 
                      <td>{
                        Object.keys(lote[item]).map(contenedor => (
                          <div key={contenedor}>
                          <p><span className="font-bold">contenedor: {contenedor}</span>: Calidad1:{lote[item][contenedor].calidad1.toFixed(2)} Kg</p>
                          <p>            Calidad 1.5: {lote[item][contenedor].calidad1_5.toFixed(2)} Kg</p>
                          <p>            Calidad 2: {lote[item][contenedor].calidad2.toFixed(2)} Kg</p>

                          </div>
                        ))
                        }</td> : 
                       Object.keys(lote[item]).reduce((acu1, contenedor) => acu1 += Object.keys(lote[item][contenedor]).reduce((acu2, calidades) => acu2 += lote[item][contenedor][calidades], 0), 0).toFixed(2)} Kg
                      </td>

                    )
                  }}
                  else {
                  return (
                    <td className={`p-2 text-sm  text-center`} key={lote + item}>
                      {typeof lote[item] === 'number' ? lote[item].toFixed(2) : lote[item]}
                    </td>
                  )
                  }
                }else{
                  return null
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
