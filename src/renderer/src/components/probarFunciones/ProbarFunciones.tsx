/* eslint-disable prettier/prettier */

export default function ProbarFunciones(): JSX.Element {
    const handleClick = async (): Promise<void> => {
        const request = {
            action:"cerrarContenedor",
            data:{
                contenedor: 1079
            }
        }
        const response = await window.api.contenedores(request)
        console.log(response)
    }
  return (
    <div className="p-10">
        <button className="bg-blue-400 w-20 h-20 hover:bg-blue-700" onClick={handleClick}>Click</button>
    </div>
  )
}
