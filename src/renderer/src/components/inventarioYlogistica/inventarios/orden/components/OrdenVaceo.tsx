import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendar, faBox, faIndustry } from '@fortawesome/free-solid-svg-icons';

interface Predio {
    PREDIO: string;
}

interface Inventario {
    inventario: number;
}

interface Lote {
    nombrePredio: string;
    fechaIngreso: string;
    tipoFruta: string;
    inventarioActual: Inventario;
    enf: string;
    predio: Predio;
    ordenVaceo?: number; // Propiedad opcional para orden de vaceo
}

interface ServerResponse<T> {
    status: number;
    data: T;
}

const MiComponente: React.FC = () => {
    const [lotes, setLotes] = useState<Lote[]>([]);
    const [lotesOrdenVaceo, setLotesOrdenVaceo] = useState<Lote[]>([]);
    const [vaceoCount, setVaceoCount] = useState<number>(1);

    useEffect(() => {
        const obtenerLotes = async (): Promise<void> => {
            try {
                const request = {
                    data: {
                        query: { "inventarioActual.inventario": { $gt: 0 } },
                        select: { nombrePredio: 1, fechaIngreso: 1, tipoFruta: 1, inventarioActual: 1, enf: 1 },
                        populate:{
                            path: 'predio',
                            select: 'PREDIO ICA'
                        },
                        sort: { fechaIngreso: -1 }
                    },
                    collection: 'lotes',
                    action: 'getLotes',
                    query: 'proceso',
                };
        
                const response: ServerResponse<Lote[]> = await window.api.server(request);
                if (response.status === 200) {
                    const lotesFiltrados = response.data.map(lote => {
                        return {
                            nombrePredio: lote.predio ? lote.predio.PREDIO : "",
                            fechaIngreso: lote.fechaIngreso,
                            tipoFruta: lote.tipoFruta,
                            inventarioActual: { inventario: lote.inventarioActual.inventario },
                            enf: lote.enf,
                            predio: lote.predio
                        };
                    });
        
                    setLotes(lotesFiltrados);
                } else {
                    alert("Error obteniendo los lotes");
                }
            } catch (error) {
                console.error('Error al obtener lotes:', error);
            }
        };

        obtenerLotes();
    }, []);

    const handleDragStartLote = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.dataTransfer.setData("index", index.toString());
    };

    const handleDragOverOrdenVaceo = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDropOrdenVaceo = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const index = parseInt(e.dataTransfer.getData("index"));
        const draggedLote = lotes[index];
        const newLotes = lotes.filter((lote, i) => i !== index);
        setLotes(newLotes);
        setLotesOrdenVaceo([...lotesOrdenVaceo, { ...draggedLote, ordenVaceo: vaceoCount }]);
        setVaceoCount(vaceoCount + 1);
    };

    const handleDragStartOrdenVaceo = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.dataTransfer.setData("index", index.toString());
    };

    const handleDragOverLote = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDropLote = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const index = parseInt(e.dataTransfer.getData("index"));
        const draggedLote = lotesOrdenVaceo[index];
        const newLotesOrdenVaceo = lotesOrdenVaceo.filter((lote, i) => i !== index);
        setLotesOrdenVaceo(newLotesOrdenVaceo);
        setLotes([...lotes, { ...draggedLote, ordenVaceo: undefined }]);
    };

    const handleRemoveFromVaceo = (index: number) => {
        const newLotesOrdenVaceo = lotesOrdenVaceo.filter((lote, i) => i !== index);
        const removedLote = lotesOrdenVaceo[index];
        setLotesOrdenVaceo(newLotesOrdenVaceo);
        setLotes([...lotes, { ...removedLote, ordenVaceo: undefined }]);
    };

    return (
        <div className="flex justify-center items-start">
            <div className="w-1/2 p-4">
                <h1 className="text-lg font-bold mb-4">Listado de Predios</h1>
                <ul className="space-y-4">
                    {lotes.map((lote, index) => (
                        <div key={index} onClick={() => {}} className="bg-gray-100 p-2 rounded-md cursor-move mb-2" draggable onDragStart={(e) => handleDragStartLote(e, index)} onDragOver={handleDragOverLote} onDrop={handleDropLote}>
                            <p className="mb-1">
                                <FontAwesomeIcon icon={faIndustry} className="mr-2" />{lote.enf}
                            </p>
                            <p className="mb-1">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />{lote.nombrePredio}
                            </p>
                            <p className="mb-1">
                                <FontAwesomeIcon icon={faCalendar} className="mr-2" />Fecha de Ingreso: {lote.fechaIngreso ? format(new Date(lote.fechaIngreso), 'dd/MM/yyyy') : '-'}
                            </p>
                            <p className="mb-1">
                                <FontAwesomeIcon icon={faBox} className="mr-2" />Tipo de Fruta: {lote.tipoFruta}
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faBox} className="mr-2" />Canastillas: {lote.inventarioActual.inventario}
                            </p>
                        </div>
                    ))}
                </ul>
            </div>
            <div className="w-1/2 p-4 border border-gray-300 rounded-md h-128 overflow-y-auto drop-zone" onDragOver={handleDragOverOrdenVaceo} onDrop={handleDropOrdenVaceo} style={{ backgroundColor: '#f3f4f6', boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.1)' }}>
                <h1 className="text-lg font-bold mb-4">Arrastra aquí para ordenar el vaceo</h1>
                <ul className="space-y-4">
                    {lotesOrdenVaceo.map((lote, index) => (
                        <div key={index} onClick={() => {}} className="bg-blue-100 p-2 rounded-md cursor-move mb-2 relative" draggable onDragStart={(e) => handleDragStartOrdenVaceo(e, index)}>
                            <div className="absolute top-0 left-0 bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center">{index + 1}</div>
                            <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-8 w-8 flex items-center justify-center" onClick={() => handleRemoveFromVaceo(index)}>
                                X
                            </div>
                            <p className="mb-1">{lote.enf}</p>
                            <p className="mb-1">{lote.nombrePredio}</p>
                            <p className="mb-1">Fecha de Ingreso: {lote.fechaIngreso ? format(new Date(lote.fechaIngreso), 'dd/MM/yyyy') : '-'}</p>
                            <p className="mb-1">Tipo de Fruta: {lote.tipoFruta}</p>
                            <p>
                                Canastillas: {lote.inventarioActual.inventario}
                            </p>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MiComponente;

