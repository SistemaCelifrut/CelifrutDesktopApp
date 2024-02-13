/* eslint-disable prettier/prettier */
import { lotesInventarioType } from '../types/clasificacionTypes'


type propsType = {
  lotesData: lotesInventarioType[]
  setLote: (e) => void
}

export default function NavClasificacionCalidad(props: propsType): JSX.Element {

  const changeHandle = (e): void => {
    const id = e.target.value
    const lote = props.lotesData.find(item => item._id === id)
    props.setLote(lote);
  }

  return (
    <div className='flex flex-row gap-10 items-center p-2 justify-start bg-Celifrut-green rounded-t-sm m-0 border-1 border-Celifrut-green-dark pl-5'>
 
      <select
        onChange={changeHandle}
        className={`border focus:outline-none appearance-none w-2/5 mr-5 rounded-md h-10 pl-5 pr-10
                        ${'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '}`}
      >
        <option>Lotes</option>
        {props.lotesData.map((lote) => (
          <option key={lote._id} value={lote._id}>{lote.enf + ' ' + ' ' +  lote.predio.PREDIO}</option>
        ))}
      </select>
    </div>
  )
}
