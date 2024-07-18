/* eslint-disable prettier/prettier */
import "@renderer/css/main.css"
import "@renderer/css/components.css"
import { useEffect, useState } from "react";
import { contenedoresType } from "@renderer/types/contenedoresType";
import useAppContext from "@renderer/hooks/useAppContext";
import TablaContenedores from "./components/TablaContenedores";
import { contenedoresRequest } from "./functions/request";
export default function Contenedores(): JSX.Element {
  const {messageModal} = useAppContext()
  const [data, setData] = useState<contenedoresType[]>([])
  const [dataOriginal, setDataOriginal] = useState<contenedoresType[]>([])
  const [filtro, setFiltro] = useState<string>("")

  useEffect(() => {
    obtenerContenedores();
  },[])

  useEffect(() => {
    const dataFiltrada = dataOriginal.filter(item => {
        if (typeof item.infoContenedor?.clienteInfo === 'object') {
            return (
                String(item.numeroContenedor).startsWith(filtro) ||
                item.infoContenedor.clienteInfo.CLIENTE.startsWith(filtro.toUpperCase())
            );
        }
        return false; // O cualquier lógica que desees para manejar el caso de clienteInfo no siendo un objeto
    });
    setData(dataFiltrada);
}, [filtro]);


  const obtenerContenedores = async (): Promise<void> => {
    try {
      const response = await window.api.server(contenedoresRequest);
      if(response.status !== 200){
        throw new Error(response.message)
      }
      setData(response.data);
      setDataOriginal(response.data)
    } catch(e){
      if(e instanceof Error){
        messageModal("error", e.message);
      }
    }
  }
  return (
    <div className="componentContainer">
      <div className="navBar">
      <div>
          <input
            type="text"
            value={filtro}
            onChange={(e): void => setFiltro(e.target.value)}
            placeholder="Buscador ..."
            className="defaultSelect"
          />
        </div>
      </div>
      <div>
        <h2>Contenedores</h2>
      </div>
      <div>
        <TablaContenedores data={data}/>
      </div>
    </div>
  );
}