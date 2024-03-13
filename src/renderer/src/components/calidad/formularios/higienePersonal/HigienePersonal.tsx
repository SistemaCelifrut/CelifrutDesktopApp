/* eslint-disable prettier/prettier */
// import { themeContext } from '@renderer/App'
// import React, { useContext, useEffect, useState } from 'react'
// import { higienePersonalType, serverResponseHigienePersonalType } from './types/higienePersonal'
// import { format } from 'date-fns'
// import { FcOk } from 'react-icons/fc'
// import { FcCancel } from 'react-icons/fc'
// import { filtroColaborador } from './functions/filtroHigienePersonal'

// export default function HigienePersonal(): JSX.Element {
//   const theme = useContext(themeContext)
//   const [table, setTable] = useState<higienePersonalType[]>([])
//   const [dataOriginal, setDataOriginal] = useState<higienePersonalType[]>([])
//   const [filtroNombre, setFiltroNombre] = useState<string>('')

//   // useEffect(() => {
//   //   // const asyncFunction = async (): Promise<void> => {
//   //   //   const request = { action: 'obtenerRegistroHigiene', query:'personal' }
//   //   //   const response: serverResponseHigienePersonalType = await window.api.calidad(request)
//   //   //   setTable(response.data)
//   //   //   setDataOriginal(response.data)
//   //   // }
//   //   asyncFunction()
//   // }, [])

//   const formatText = (key): string => {
//     // Convierte el nombre de la propiedad a un texto más legible y el valor booleano a "Cumple" o "No Cumple"
//     switch (key) {
//       case 'unasCortas':
//         return 'Uñas Cortas'
//       case 'estadoSalud':
//         return 'Estado de Salud'
//       case 'tapaoidos':
//         return 'Tapa oidos'
//       default:
//         return key
//     }
//   }

//   const handleChangeFiltroColaborador = (e:React.ChangeEvent<HTMLInputElement>): void => {
//     setFiltroNombre(e.target.value)
//   }

//   // const handleChangeFiltroFecha = async (e): Promise<void> => {
//   //   const request = { action: 'obtenerRegistroHigiene', data:e.target.value, query:'personal' }
//   //   const response: serverResponseHigienePersonalType = await window.api.calidad(request)
//   //   console.log(response)
//   //   setTable(response.data)
//   //   setDataOriginal(response.data)
//   // }

//   useEffect(() => {
//     const dataFiltrada = filtroColaborador(dataOriginal, filtroNombre)
//     setTable(dataFiltrada)
//   }, [filtroNombre])

//   return (
//     <div className="p-1">
//       <div
//         className={`${theme === 'Dark' ? 'bg-slate-700' : 'bg-slate-200'}
//                         flex flex-row m-2 p-4 rounded-lg shadow-xl gap-2 justify-between`}
//       >
//         <label
//           className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}
//           htmlFor="fechaFiltro"
//         >
//           Filtrar por fecha:
//         </label>
//         <input
//           className="w-1/5 rounded-md pl-2"
//           type="date"
//           id="fechaFiltro"
//           onChange={handleChangeFiltroFecha}
//         />
//         <label
//           className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}
//           htmlFor="nombreFiltro"
//         >
//           Filtrar por nombre de colaborador:
//         </label>
//         <input
//           className="w-1/5 rounded-md pl-2"
//           type="text"
//           id="nombreFiltro"
//           value={filtroNombre}
//           onChange={handleChangeFiltroColaborador}
//         />
//       </div>
//       <h2
//         className={`${theme === 'Dark' ? 'text-white' : 'text-black'}
//                     font-bold text-2xl mt-8 ml-4`}
//       >
//         HIGIENE PERSONAL
//       </h2>
//       <table className={`mr-2 ml-2 w-full mt-2 border-2`}>
//         <thead className={`${theme === 'Dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
//           <tr className="h-14 broder-2">
//             <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>Fecha</th>
//             <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>Responsable</th>
//             <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>Colaborador</th>
//             <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>Elementos</th>
//           </tr>
//         </thead>
//         <tbody className="border-2">
//           {table.map((item, index) => (
//             <tr className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`} key={index}>
//               <td className={`p-2 text-sm`}>
//                 {format(new Date(item.fecha), 'dd/MM/yyyy HH:mm:ss')}
//               </td>
//               <td className="p-2 text-sm ">{item.responsable}</td>
//               <td className="p-2 text-sm">{item.colaborador}</td>
//               <td className="text-sm">
//                 <h3 className="font-bold">Elementos de Higiene Personal:</h3>
//                 <div className="flex flex-row flex-wrap gap-1 justify-start items-center">
//                   {Object.entries(item.elementosHigiene).map(([key, value]) => {
//                     if (key !== '_id') {
//                       return (
//                         <div key={key + "div"} className="border-2 border-slate-300 flex flex-row mt-1 mb-1 gap-2 items-center p-1">
//                           <p key={key}>{formatText(key)}:</p>
//                           <div> {value ? <FcOk /> : <FcCancel />}</div>
//                         </div>
//                       )
//                     }else{
//                       return <div key={key}></div>
//                     }
//                   })}
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }
