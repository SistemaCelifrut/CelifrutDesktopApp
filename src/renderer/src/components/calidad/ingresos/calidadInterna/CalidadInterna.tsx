/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import NavCalidadInternaForm from './utils/NavCalidadInternaForm'
import PruebasCalidadInterna from './components/PruebasCalidadInterna'
import { calidadInternalote } from './types/calidadInterna';

const request = {
  data:{
    query:{ 
      "calidad.calidadInterna": { $exists : false},
      enf: { $regex: '^E', $options: 'i' }
    },
    select : { enf:1 },
    populate:{
      path: 'predio',
      select: 'PREDIO ICA'
    },
    sort:{fechaIngreso: -1}
  },
  collection:'lotes',
  action: 'getLotes',
  query: 'proceso'
};

export default function CalidadInterna(): JSX.Element {
  const [lotesData, setLotesData] = useState([])
  const [lote, setLote] = useState<calidadInternalote>({_id:"",enf:"",})

  useEffect(() => {
    const interval = async (): Promise<void> => {
      try {
        const lotes = await window.api.server(request)
        setLotesData(lotes.data)
      } catch (e) {
        alert(e)
      }
    }
    interval()
  }, [])

  return (
    <div className='flex flex-col gap-4 p-2 w-full'>
      <NavCalidadInternaForm lotesData={lotesData} setLote={setLote} />
      <div>
        <PruebasCalidadInterna lote={lote} setLotesData={setLotesData} />
      </div>
    </div>
  )
}
