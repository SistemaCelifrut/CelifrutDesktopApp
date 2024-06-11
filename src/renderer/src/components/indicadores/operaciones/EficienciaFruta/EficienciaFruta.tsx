/* eslint-disable prettier/prettier */

import useAppContext from "@renderer/hooks/useAppContext"
import { useState } from "react"
import { request_data } from "./services/request";
import { procesarData } from "./services/function";
import { datosExportacion } from "./types/type";
import TableInfo from "./components/TableInfo";
import './styles/styles.css'
import GaugeChart from "./components/GaugeChart";
import LinearChart from "./components/LinearChart";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"


export default function EficienciaFruta(): JSX.Element {
    const { messageModal } = useAppContext();
    const [tipoFruta, setTipoFruta] = useState("")
    const [fechaInicio, SetFechaInicio] = useState("")
    const [fechaFin, SetFechaFin] = useState("")
    const [data, setData] = useState<datosExportacion>({})
    const [activarDropp, setActivarDropp] = useState<string>('');


    const handleTipoFruta = (e): void => {
        setTipoFruta(e.target.value)
    }
    const handleBuscar = async (): Promise<void> => {
        try {
            const request = request_data(fechaInicio, fechaFin, tipoFruta)
            const response = await window.api.server2(request)
            if (response.status !== 200)
                throw new Error(`Error: ${response.message}`)
            const objectData = procesarData(fechaInicio, fechaFin, response.data)
            setData(objectData)
        } catch (e) {
            if (e instanceof Error)
                messageModal("error", e.message)
        }
    }
    return (
        <div className="componentContainer">
            <div className="navBar"></div>
            <h2>Eficiencia de la fruta</h2>
            <div className='filtroContainer'>
                <label>
                    <p>Tipo fruta</p>
                    <select onChange={handleTipoFruta}>
                        <option value="">Tipo de fruta</option>
                        <option value="Naranja">Naranja</option>
                        <option value="Limon">Limon</option>
                    </select>
                </label>
                <label>
                    <p>Fecha Incio</p>
                    <input type="date" onChange={(e): void => SetFechaInicio(e.target.value)} />
                </label>
                <label>
                    <p>Fecha Fin</p>
                    <input type="date" onChange={(e): void => SetFechaFin(e.target.value)} />
                </label>
                <label>
                    <div>{" "}</div>
                    <button onClick={handleBuscar} >Buscar</button>
                </label>
            </div>
            <hr />
            <DragDropContext onDragEnd={(result): void => {
                const { source, destination } = result;
                if (!destination) {
                    return;
                  }
                  if (source.index === destination.index && destination.droppableId === source.droppableId) {
                    return;
                  }
            }}>
                <Droppable droppableId={new Date().toISOString()} >
                    {(droppableProvider): JSX.Element =>

                        <div className="indicadores-container-cards"
                            ref={droppableProvider.innerRef}
                            {...droppableProvider.droppableProps}>

                            <Draggable draggableId="draggable-TablaInfo" index={0}>
                                {(draggableProvider): JSX.Element =>
                                    <div className="indicadores-tarjetas"
                                        ref={draggableProvider.innerRef}
                                        {...draggableProvider.draggableProps}
                                        {...draggableProvider.dragHandleProps}>
                                        <TableInfo data={data} />
                                    </div>
                                }
                            </Draggable>
                            <Draggable draggableId="draggable-GaugeChart" index={1}>
                                {(draggableProvider): JSX.Element =>
                                    <div className="indicadores-tarjetas"
                                        ref={draggableProvider.innerRef}
                                        {...draggableProvider.draggableProps}
                                        {...draggableProvider.dragHandleProps}>

                                        <GaugeChart data={data} />
                                    </div>
                                }
                            </Draggable>
                            <Draggable draggableId={"draggable-LinearChart"} index={2}>
                                {(draggableProvider): JSX.Element =>
                                    <div className="indicadores-tarjetas"
                                        ref={draggableProvider.innerRef}
                                        {...draggableProvider.draggableProps}
                                        {...draggableProvider.dragHandleProps}>

                                        <LinearChart data={data} />
                                    </div>
                                }
                            </Draggable>
                            {droppableProvider.placeholder}
                        </div>
                    }
                </Droppable>
            </DragDropContext>
            
        </div>
    )
}