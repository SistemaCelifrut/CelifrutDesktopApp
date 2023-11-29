type propsType = {
    theme: string
}

export default function HeaderTableHistorialProcesado(props:propsType) {
    return (
        <>
            <div className=" col-span-1 bg-blue-400 shadow-lg border-b-2 p-2 flex justify-center items-center text-sm">
          
            </div>
            <div className={`${props.theme === 'Dark' ? 'text-white': 'text-black '} col-span-1 bg-blue-400 shadow-lg border-b-2 p-2 flex justify-center items-center text-sm `}>
              <h4>EF1</h4>
            </div>
            <div className={`${props.theme === 'Dark' ? 'text-white': 'text-black'} col-span-1 bg-blue-400 shadow-lg border-b-2 p-2 flex justify-center items-center text-sm`}>
              <h4>Nombre del predio</h4>
            </div>
            <div className={`${props.theme === 'Dark' ? 'text-white': 'text-black'} col-span-1 bg-blue-400 shadow-lg border-b-2 p-2 flex justify-center items-center text-sm`}>
              <h4>Canastillas</h4>
            </div>
            <div className={`${props.theme === 'Dark' ? 'text-white': 'text-black'} col-span-1 bg-blue-400 shadow-lg border-b-2 p-2 flex justify-center items-center text-sm`}>
              <h4>Kilos</h4>
            </div>
            <div className={`${props.theme === 'Dark' ? 'text-white': 'text-black'} col-span-1 bg-blue-400 shadow-lg border-b-2 p-2 flex justify-center items-center text-sm`}>
              <h4>Tipo de fruta</h4>
            </div>
            <div className={`${props.theme === 'Dark' ? 'text-white': 'text-black'} col-span-1 bg-blue-400 shadow-lg border-b-2 p-2 flex justify-center items-center text-sm`}>
              <h4>Fecha</h4>
            </div>
            <div className={`${props.theme === 'Dark' ? 'text-white': 'text-black'} col-span-1 bg-blue-400 shadow-lg border-b-2 p-2 flex justify-center items-center text-sm`}>
              <h4>Rendimiento</h4>
            </div>
        </>
      )
    }