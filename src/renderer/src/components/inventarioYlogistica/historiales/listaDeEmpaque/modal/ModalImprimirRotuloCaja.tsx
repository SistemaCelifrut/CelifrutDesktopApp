/* eslint-disable prettier/prettier */
import { useContext } from 'react'
import { themeContext } from '@renderer/App'
// import { contenedoresType } from '@renderer/types/contenedoresType'

type vaciadoType = {
    closeModal: () => void
    // contenedor: contenedoresType
    predio: enfType
  }
  
  type enfType = {
    [key: string]: object
  }

export default function ModalImprimirRotulocaja(props: vaciadoType): JSX.Element {
const theme = useContext(themeContext)
  // const [caja, setCajas] = useState<number>(0)
  // const [tipoCaja, setTipoCaja] = useState<string>('')

  // const handleImprimir = async (): Promise<void> => {
  //   console.log(props.predio)
  //   const key = Object.keys(props.predio);
  //   const data = {
  //     tipoRotulo:'rotuloCaja',
  //     cliente:props.contenedor.infoContenedor.nombreCliente,
  //     enf:props.predio[key[0]][0].id,
  //     nombrePredio: props.predio[key[0]][0].nombre,
  //     contenedor: props.contenedor._id,
  //     cajas: caja,
  //     tipoCaja: tipoCaja
  //   }
  //   window.api.imprimirRotulos(data);
  //   props.closeModal()
  // }

  return (
    <div className={` fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}>
    <div className={`${theme === 'Dark' ? 'bg-slate-800' : 'bg-white'} rounded-xl w-96 h-90 overflow-hidden pb-5`}>
      <div className={`bg-Celifrut-green flex justify-between items-center border-b-2 border-gray-200 p-3 mb-4 rounded-sm`}>
        <h2 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-lg font-semibold`}>Imprimir rotulo caja</h2>
      </div>
      <div className="flex justify-center pb-5">
        <p className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-md`}>Copias</p>
      </div>
      <div className="flex justify-center pb-10">
        <input
          type="number"
          min="0"
          step="1"
          className="border-2 border-gray-200 rounded-md p-2"
          // onChange={(e): void => setCajas(Number(e.target.value))}
        />
      </div>
      <div className="flex justify-center pb-5">
        <p className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-md`}>Tipo de caja</p>
      </div>
      <div className="flex justify-center pb-10">
        <input
          type="text"
          className="border-2 border-gray-200 rounded-md p-2"
          // onChange={(e): void => setTipoCaja(e.target.value)}
        />
      </div>
      <div className="flex justify-center gap-4">
        <button
          className={`flex items-center justify-center bg-blue-600 text-white rounded-md px-4 py-2`}
          // onClick={handleImprimir}
        >
          Imprimir
        </button>
        <button
          className={`border-2 border-gray-200 rounded-md px-4 py-2 ${theme === 'Dark' ? 'bg-slate-800 text-white' : 'bg-white text-black'} `}
          onClick={props.closeModal}
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
);
}

