/* eslint-disable prettier/prettier */

import useAppContext from "@renderer/hooks/useAppContext"

export default function HeaderTableFurtaSinProcesar(): JSX.Element {
  const {theme} = useAppContext();
  const header = ["EF1", "Nombre del predio", "Codigo ICA", "Fecha", "Kilos", "Canastillas", "Tipo de fruta", "Observaciones" ]
  return (
    <>
      <div className=" col-span-1 bg-blue-400 shadow-lg border-b-2 p-2 flex justify-center items-center text-sm"></div>
    {header.map( item => (
        <div
        key={item}
        className={`${
          theme === 'Dark' ? 'text-white' : 'text-black '
        } col-span-1 bg-blue-400 shadow-lg border-b-2 p-2 flex justify-center items-center text-sm `}
      >
        <h4>{item}</h4>
      </div>
    ))}
    
    </>
  )
}
