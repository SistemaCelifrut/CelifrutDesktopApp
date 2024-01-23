/* eslint-disable prettier/prettier */
import { themeContext } from '@renderer/App'
import { useContext, useState } from 'react'

type vaciadoType = {
    closeModal: () => void
    setShowSuccess: (e) => void
    setShowError: (e) => void
    setMessageSuccess: (e) => void
    setMessageError: (e) => void
}

export default function ModificarEF1(props: vaciadoType): JSX.Element {
    const theme = useContext(themeContext)
    const [loading, setLoading] = useState<boolean>(false)
    const [ef1, setEf1] = useState<string>('')


    return (
        <div className={` fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}>
            <div className={`${theme === 'Dark' ? 'bg-slate-800' : 'bg-white'} rounded-xl w-96 h-90 overflow-hidden pb-5`}>
                <div className={`bg-Celifrut-green flex justify-between items-center border-b-2 border-gray-200 p-3 mb-4 rounded-sm`}>
                    <h2 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-lg font-semibold`}>Modificar EF1</h2>
                </div>
                <div className="flex justify-center pb-5">
                    <p className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-md`}>Ingrese los ultimos digitos del EF1</p>
                </div>
                <div className="flex justify-center pb-10">
                    <input
                    
                        type="number"
                        min="0"
                        step="1"
                        className="border-2 border-gray-200 rounded-md p-2"
                        
                    />
                </div>
                <div className="flex justify-center gap-4">
                    <button
                        className={`flex items-center justify-center ${loading ? 'bg-blue-500' : 'bg-blue-600'} text-white rounded-md px-4 py-2`}
                    
                    >
                        {loading && <span className="loader"></span>}
                        Guardar
                    </button>
                    <button
                        disabled={loading}
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

