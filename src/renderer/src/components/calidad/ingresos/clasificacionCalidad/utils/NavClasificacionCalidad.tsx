/* eslint-disable prettier/prettier */
import { lotesType } from "@renderer/types/lotesType"

type propsType = {
  lotesData: lotesType[]
  setLote: (e) => void
}

export default function NavClasificacionCalidad(props: propsType): JSX.Element {

  const changeHandle = (e): void => {
    const id = e.target.value
    const lote = props.lotesData.find(item => item._id === id)
    if(lote === undefined){
      props.setLote({_id:"", enf:"", predio:{PREDIO:""}, tipoFruta:'Limon'})
    } else {
      props.setLote(lote);
    }
  }

  return (
    <div className='flex flex-row gap-10 items-center p-2 justify-start bg-Celifrut-green rounded-t-sm m-0 border-1 border-Celifrut-green-dark pl-5'>
 
      <select
        onChange={changeHandle}
        className={`border focus:outline-none appearance-none w-2/5 mr-5 rounded-md h-10 pl-5 pr-10
                        ${'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '}`}
      >
        <option value="">Lotes</option>
        {props.lotesData.map((lote) => (
          <option key={lote._id} value={lote._id}>{lote.predio ? lote.enf + ' ' + ' ' +  lote.predio.PREDIO: ''}</option>
        ))}
      </select>
    </div>
  )
}
