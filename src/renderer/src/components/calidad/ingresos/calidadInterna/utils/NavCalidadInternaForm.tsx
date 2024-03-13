/* eslint-disable prettier/prettier */
import { lotesType } from "@renderer/types/lotesType";

type propsType = {
  lotesData: lotesType[]
  setLote: (e) => void
}

export default function NavCalidadInternaForm(props: propsType): JSX.Element {

  const handleChange = (e): void => {
    const id = e.target.value;
    const lote = props.lotesData.find(item => item._id === id)
    props.setLote(lote)
  }

  return (
    <div className='flex flex-row justify-between items-center bg-Celifrut-green rounded-t-sm m-0 border-1 border-Celifrut-green-dark pl-5'>
      <div
        className={`z-50 w-[100%] h-16 flex justify-start items-center `}
      >
        <div className=" z-50 flex justify-center flex-row items-center  hover:bg-Celifrut-green-dark rounded-full p-2">
        </div>
      </div>

      <select
        onChange={handleChange}
        className={`border focus:outline-none appearance-none w-2/5 mr-5 rounded-md h-10 pl-5 pr-10
                        ${'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '}`}
      >
        <option>Lotes</option>
        {props.lotesData.map((lote) => (
          <option key={lote._id} value={lote._id}>
            {lote && lote.predio ?  lote.enf + ' ' + ' ' + lote.predio.PREDIO : ' '}
          </option>
        ))}
      </select>
    </div>
  )
}
