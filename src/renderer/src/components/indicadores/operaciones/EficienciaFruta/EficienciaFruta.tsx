/* eslint-disable prettier/prettier */

import useAppContext from "@renderer/hooks/useAppContext"
import { useEffect, useRef, useState } from "react"
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
    const [items, setItems] = useState([
        { id: "draggable-TablaInfo", component: TableInfo },
        { id: "draggable-GaugeChart", component: GaugeChart },
        { id: "draggable-LinearChart", component: LinearChart },
    ]);
    const isResizingRef = useRef(false)
    const currentElementRef = useRef<HTMLElement | null>(null);
    const [drag, setDrag] = useState(false)
    useEffect(()=>{},[drag])

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
    const handleMouseDown = (e): void => {
        if (e.target === e.currentTarget && drag) {
            e.stopPropagation();
            console.log("mouse down")
            isResizingRef.current = true;
            currentElementRef.current = e.currentTarget;
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('mousemove', handleMouseMove);
        }
    };
    const handleMouseUp = (): void => {
        isResizingRef.current = false;
        // console.log(isResizingRef.current)
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };
    const handleMouseMove = (e): void => {
        if (isResizingRef) {
            const currentElement = currentElementRef.current;
            if (currentElement) {
                const newWidth = e.clientX - currentElement.getBoundingClientRect().left;
                currentElement.style.width = `${newWidth}px`;
            }
        }
    };
    const hijoClick = (): void => {
        console.log("click hijo")
    }
    const editarHandle = ():void => {
        setDrag(!drag)
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
                <label>
                    <div>{" "}</div>
                    <button onClick={editarHandle}>{drag ? 'Editando tamaño' : 'Editar '}</button>
                </label>
                <label>
                    <p>Componentes</p>
                    <select onChange={handleTipoFruta}>
                        <option value="">Graficas</option>
                        <option value="Naranja">
                            <input type="checkbox" />
                        </option>
                        <option value="Limon">Limon</option>
                    </select>
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
                const reorderedItems = Array.from(items);
                const [removed] = reorderedItems.splice(source.index, 1);
                reorderedItems.splice(destination.index, 0, removed);

                setItems(reorderedItems);
            }}>
                <Droppable 
                // isDragDisabled={drag}
                droppableId={new Date().toISOString()} >
                    {(droppableProvider): JSX.Element =>

                        <div className="indicadores-container-cards"
                            ref={droppableProvider.innerRef}
                            {...droppableProvider.droppableProps}>

                            {items.map((item, index) => {
                                const Component = item.component;
                                return (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        isDragDisabled={drag}
                                        index={index}>

                                        {(draggableProvider): JSX.Element => (
                                            <div className="indicadores-tarjetas"
                                                onMouseDown={handleMouseDown}
                                                ref={draggableProvider.innerRef}
                                                {...draggableProvider.draggableProps}
                                                {...draggableProvider.dragHandleProps}>
                                                <div className="indicadores-tarjeta-div" onClick={hijoClick}>
                                                    <Component data={data} />

                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {droppableProvider.placeholder}
                        </div>
                    }
                </Droppable>
            </DragDropContext>

        </div>
    )
}