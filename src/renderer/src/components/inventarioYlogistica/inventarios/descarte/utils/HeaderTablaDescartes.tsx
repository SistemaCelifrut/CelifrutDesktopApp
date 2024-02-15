/* eslint-disable prettier/prettier */
type propsType = {
  theme: string
}

export default function HeaderTablaDescartes(props: propsType): JSX.Element {
  return (
    <>
      <div className=" col-span-1 bg-blue-400 shadow-lg border-b-2 p-2 flex justify-center items-center text-sm"></div>

      <div
        className={`${
          props.theme === 'Dark' ? 'text-white' : 'text-black'
        } col-span-1 bg-blue-400 shadow-lg border-b-2 p-2 flex justify-center items-center text-sm`}
      >
        <h4>Nombre del predio</h4>
      </div>
      <div
        className={`${
          props.theme === 'Dark' ? 'text-white' : 'text-black'
        } col-span-1 bg-blue-400 shadow-lg border-b-2 p-2 flex justify-center items-center text-sm`}
      >
        <h4>Tipo Fruta</h4>
      </div>
      <div
        className={`${
          props.theme === 'Dark' ? 'text-white' : 'text-black'
        } col-span-1 bg-blue-400 shadow-lg border-b-2 p-2 flex justify-center items-center text-sm`}
      >
        <h4>General Lavado</h4>
      </div>
      <div
        className={`${
          props.theme === 'Dark' ? 'text-white' : 'text-black'
        } col-span-1 bg-blue-400 shadow-lg border-b-2 p-2 flex justify-center items-center text-sm`}
      >
        <h4>Pareja Lavado</h4>
      </div>
      <div
        className={`${
          props.theme === 'Dark' ? 'text-white' : 'text-black'
        } col-span-1 bg-blue-400 shadow-lg border-b-2 p-2 flex justify-center items-center text-sm`}
      >
        <h4>Balin Lavado</h4>
      </div>
      <div
        className={`${
          props.theme === 'Dark' ? 'text-white' : 'text-black'
        } col-span-1 bg-blue-400 shadow-lg border-b-2 p-2 flex justify-center items-center text-sm`}
      >
        <h4>General Encerado</h4>
      </div>
      <div
        className={`${
          props.theme === 'Dark' ? 'text-white' : 'text-black'
        } col-span-1 bg-blue-400 shadow-lg border-b-2 p-2 flex justify-center items-center text-sm`}
      >
        <h4>Pareja Encerado</h4>
      </div>
      <div
        className={`${
          props.theme === 'Dark' ? 'text-white' : 'text-black'
        } col-span-1 bg-blue-400 shadow-lg border-b-2 p-2 flex justify-center items-center text-sm`}
      >
        <h4>Balin Encerado</h4>
      </div>
      <div
        className={`${
          props.theme === 'Dark' ? 'text-white' : 'text-black'
        } col-span-1 bg-blue-400 shadow-lg border-b-2 p-2 flex justify-center items-center text-sm`}
      >
        <h4>Extra Encerado</h4>
      </div>
    </>
  )
}
