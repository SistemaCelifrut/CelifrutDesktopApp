import React, { useState, useEffect, useContext } from 'react';
import { format } from 'date-fns';
import { themeContext } from '@renderer/App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendar, faBox, faIndustry } from '@fortawesome/free-solid-svg-icons';

interface Predio {
    _id: string;
    PREDIO: string;
}

interface Inventario {
    inventario: number;
}

interface Lote {
    _id: string;
    nombrePredio: string;
    fechaIngreso: string;
    tipoFruta: string;
    inventarioActual: Inventario;
    enf: string;
    predio: Predio;
    ordenVaceo?: number;
    desverdizado?: {
        canastillas: number;
        fechaIngreso: string;
    };
}

interface ServerResponse<T> {
    status: number;
    data: T;
}

const MiComponente: React.FC = () => {
    const [lotes, setLotes] = useState<Lote[]>([]);
    const [lotesOrdenVaceo, setLotesOrdenVaceo] = useState<{ lote: Lote; ordenVaceo: number }[]>([]);
    const [lotesDesverdizados, setLotesDesverdizados] = useState<Lote[]>([]);
    const [vaceoCount, setVaceoCount] = useState<number>(1);
    const [showPredios, setShowPredios] = useState<{ [key: string]: boolean }>({});
    const theme = useContext(themeContext);

    useEffect(() => {
        const obtenerLotes = async (): Promise<void> => {
            try {
                const request = {
                    data: {
                        query: { "inventarioActual.inventario": { $gt: 0 } },
                        select: { nombrePredio: 1, fechaIngreso: 1, tipoFruta: 1, inventarioActual: 1, enf: 1 },
                        populate: {
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
                        const canastillas = lote.inventarioActual.inventario;
                        return {
                            _id: lote._id,
                            nombrePredio: lote.predio ? lote.predio.PREDIO : "",
                            fechaIngreso: lote.fechaIngreso,
                            tipoFruta: lote.tipoFruta,
                            inventarioActual: { inventario: canastillas },
                            enf: lote.enf,
                            predio: lote.predio,
                            desverdizado: lote.desverdizado // Agregamos esta propiedad para manejar la segunda petición
                        };
                    });
                    setLotes(lotesFiltrados);
                } else {
                    alert("Error al obtener los lotes.");
                }
            } catch (error) {
                console.error('Error al obtener los lotes:', error);
                alert('Error al obtener los lotes.');
            }
        };
    
        const obtenerLotesDesverdizados = async (): Promise<void> => {
            try {
                const request = {
                    data: {
                        query: {
                            "desverdizado": { $exists: true },
                            "desverdizado.canastillas": { $gt: 0 },
                            "desverdizado.fechaFinalizar": { $exists: true },
                        },
                        select: { nombrePredio: 1, fechaIngreso: 1, tipoFruta: 1, desverdizado: 1, enf: 1 },
                        populate: {
                            path: 'predio',
                            select: 'PREDIO ICA'
                        },
                        sort: { "desverdizado.fechaIngreso": -1 }
                    },
                    collection: 'lotes',
                    action: 'getLotes',
                    query: 'proceso'
                };
        
                const response: ServerResponse<Lote[]> = await window.api.server(request);
                if (response.status === 200) {
                    console.log("desverdizado", response.data);
        
                    // Modificar los objetos Lote para incluir el nombre del predio
                    const lotesDesverdizadosConPredio = response.data.map(lote => ({
                        ...lote,
                        nombrePredio: lote.predio ? lote.predio.PREDIO : "",
                    }));
        
                    setLotesDesverdizados(lotesDesverdizadosConPredio);
                    
                    // Agregar los lotes desverdizados al estado lotes
                    setLotes(prevLotes => [...prevLotes, ...lotesDesverdizadosConPredio]);
        
                    // Actualizar el estado de visibilidad para incluir los nuevos predios desverdizados
                    const newShowPredios = { ...showPredios };
                    lotesDesverdizadosConPredio.forEach(lote => {
                        newShowPredios[lote._id] = true; // Establecer como visible
                    });
                    setShowPredios(newShowPredios);
                } else {
                    alert("Error al obtener los lotes desverdizados.");
                }
            } catch (error) {
                console.error('Error al obtener los lotes desverdizados:', error);
                alert('Error al obtener los lotes desverdizados.');
            }
        };        
    
        const fetchData = async () => {
            await obtenerLotes();
            await obtenerLotesDesverdizados();
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        const obtenerOrdenVaceo = async (): Promise<void> => {
            try {
                console.log('Realizando solicitud para obtener orden de vaciado...');
                const response: string[] = await window.api.server({
                    action: 'obtenerOrdenDeVaceo',
                    collection: 'variablesDesktop',
                    query: 'variablesDelProceso'
                });
                console.log('Respuesta del servidor al obtener orden de vaciado:', response);

                const idsOrdenVaceo = response;
                console.log('IDs de orden de vaceo obtenidos:', idsOrdenVaceo);

                const nuevosLotesOrdenVaceo = lotes
                    .filter(lote => idsOrdenVaceo.includes(lote._id))
                    .map((lote, index) => ({ lote, ordenVaceo: index + 1 }));

                console.log('Lotes de orden de vaciado actualizados:', nuevosLotesOrdenVaceo);
                setLotesOrdenVaceo(nuevosLotesOrdenVaceo);
            } catch (error) {
                console.error('Error al obtener el orden de vaciado:', error);
                alert('Error al obtener el orden de vaciado.');
            }
        };

        obtenerOrdenVaceo();
    }, [lotes]);

    useEffect(() => {
        const newShowPredios = { ...showPredios };
        lotesOrdenVaceo.forEach(({ lote }) => {
            newShowPredios[lote._id] = false;
        });
        setShowPredios(newShowPredios);
    }, [lotesOrdenVaceo]);

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

        if (draggedLote && draggedLote.predio !== null) {
            const newShowPredios = { ...showPredios };
            newShowPredios[draggedLote._id] = false;
            setShowPredios(newShowPredios);

            const newLotesOrdenVaceo = [...lotesOrdenVaceo];
            const existingLoteIndex = newLotesOrdenVaceo.findIndex(lote => lote.lote._id === draggedLote._id);

            if (existingLoteIndex !== -1) {
                newLotesOrdenVaceo[existingLoteIndex].ordenVaceo = vaceoCount;
            } else {
                newLotesOrdenVaceo.push({ lote: draggedLote, ordenVaceo: vaceoCount });
            }

            newLotesOrdenVaceo.sort((a, b) => a.ordenVaceo - b.ordenVaceo);

            enviarOrdenVaceoAlServidor(newLotesOrdenVaceo.map(item => item.lote))
                .then(() => {
                    setLotesOrdenVaceo(newLotesOrdenVaceo);
                    setVaceoCount(vaceoCount + 1);
                })
                .catch((error) => {
                    console.error('Error al enviar la orden de vaceo al servidor:', error);
                    alert('Error al enviar la orden de vaceo al servidor.');
                    setLotesOrdenVaceo(lotesOrdenVaceo);
                });
        }
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

        const dropIndex = lotes.length;

        const newLotesOrdenVaceo = lotesOrdenVaceo.filter((_, i) => i !== index)
            .map(item => ({ lote: item.lote, ordenVaceo: item.ordenVaceo }));

        setLotesOrdenVaceo(newLotesOrdenVaceo);

        setLotes([...lotes.slice(0, dropIndex), { ...draggedLote.lote, ordenVaceo: undefined }, ...lotes.slice(dropIndex)]);
    };

    const handleRemoveFromVaceo = async (index: number) => {
        try {
            const removedLote = lotesOrdenVaceo[index];
            if (removedLote) {
                const newShowPredios = { ...showPredios };
                newShowPredios[removedLote.lote._id] = true;
                setShowPredios(newShowPredios);

                const newLotesOrdenVaceo = lotesOrdenVaceo.filter((_, i) => i !== index);
                setLotesOrdenVaceo(newLotesOrdenVaceo);

                await enviarOrdenVaceoAlServidor(newLotesOrdenVaceo.map(item => item.lote));
            }
        } catch (error) {
            console.error('Error al eliminar el lote del orden de vaceo:', error);
            alert('Error al eliminar el lote del orden de vaceo.');
        }
    };

    const enviarOrdenVaceoAlServidor = async (newLotesOrdenVaceo: Lote[]) => {
        try {
            if (newLotesOrdenVaceo.length === 0) {
                console.log('No hay lotes para enviar la orden de vaceo.');
                return;
            }

            console.log('Enviando lotes a orden de vaceo:', newLotesOrdenVaceo);

            const idsLotesOrdenVaceo = newLotesOrdenVaceo.map(lote => lote._id);
            const response = await window.api.server({
                data: idsLotesOrdenVaceo,
                action: 'guardarOrdenDeVaceo',
                collection: 'variablesDesktop',
                query: 'variablesDelProceso'
            });
            console.log('id:', idsLotesOrdenVaceo);
            console.log('Respuesta del servidor:', response);

            if (response && response.status === 200) {
                console.log('Orden de vaceo enviada correctamente al servidor.');
            } else {
                throw new Error('Error al enviar la orden de vaceo al servidor. Respuesta:', response);
            }
        } catch (error) {
            throw error;
        }
    };

    return (
        <div className="flex justify-center items-start">
            <div className="w-1/2 p-4">
                <h1 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-lg font-bold mb-4`}>Listado de Predios</h1>
                <ul className="space-y-4">
                    {lotes.map((lote, index) => {
                        const isOrdenVaceo = lotesOrdenVaceo.some(item => item.lote._id === lote._id);
                        const isDesverdizado = lotesDesverdizados.some(item => item._id === lote._id);
    
                        return (
                            <div key={index} onClick={() => { }} style={{ display: showPredios[lote._id] !== false ? 'block' : 'none' }} className={`p-2 rounded-md cursor-move mb-2 border border-gray-200 shadow-lg hover:shadow-xl transition duration-300 ${isOrdenVaceo ? 'bg-green-200' : isDesverdizado ? 'bg-orange-200' : 'bg-gray-100'}`} draggable onDragStart={(e) => handleDragStartLote(e, index)} onDragOver={handleDragOverLote} onDrop={handleDropLote}>
                                {showPredios[lote._id] !== false && (
                                    <p className="mb-1 text-sm">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />{lote.nombrePredio}
                                    </p>
                                )}
                                <p className="mb-1 text-sm">
                                    <FontAwesomeIcon icon={faIndustry} className="mr-1" />{lote.enf}
                                </p>
                                <p className="mb-1 text-sm">
                                    <FontAwesomeIcon icon={faCalendar} className="mr-1" />Fecha de Ingreso: {lote.fechaIngreso ? format(new Date(lote.fechaIngreso), 'dd/MM/yyyy') : '-'}
                                </p>
                                <p className="mb-1 text-sm">
                                    <FontAwesomeIcon icon={faBox} className="mr-1" />Tipo de Fruta: {lote.tipoFruta}
                                </p>
                                {!lote.desverdizado && (
                                    <p className="text-sm">
                                        <FontAwesomeIcon icon={faBox} className="mr-1" />Canastillas: {lote.inventarioActual?.inventario}
                                    </p>
                                )}
                                {lote.desverdizado && (
                                    <div>
                                        <p className="text-sm"><FontAwesomeIcon icon={faBox} className="mr-1" />Canastillas: {lote.desverdizado.canastillas}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </ul>
            </div>
            <div className="w-1/2 p-4 border border-gray-300 rounded-md max-h-96 overflow-y-auto drop-zone" style={{ backgroundColor: '#f3f4f6', boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.1)', position: 'sticky', top: '20px' }} onDragOver={handleDragOverOrdenVaceo} onDrop={handleDropOrdenVaceo}>
                <h1 className="text-lg font-bold mb-4">Arrastra aquí para ordenar el vaceo</h1>
                <ul className="space-y-4">
                    {lotesOrdenVaceo.map((loteOrdenVaceo, index) => (
                        <div key={index} onClick={() => { }} className="bg-blue-100 p-2 rounded-md cursor-move mb-2 relative border border-gray-200 shadow-lg hover:shadow-xl transition duration-300" draggable onDragStart={(e) => handleDragStartOrdenVaceo(e, index)}>
                            <div className="absolute top-0 left-0 bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center" style={{ opacity: 0.7 }}>{index + 1}</div>
                            <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center" onClick={() => handleRemoveFromVaceo(index)}>
                                X
                            </div>
                            <p className="mb-1 text-sm">{loteOrdenVaceo.lote.enf}</p>
                            <p className="mb-1 text-sm">{loteOrdenVaceo.lote.nombrePredio}</p>
                            <p className="mb-1 text-sm">Fecha de Ingreso: {loteOrdenVaceo.lote.fechaIngreso ? format(new Date(loteOrdenVaceo.lote.fechaIngreso), 'dd/MM/yyyy') : '-'}</p>
                            <p className="mb-1 text-sm">Tipo de Fruta: {loteOrdenVaceo.lote.tipoFruta}</p>
                            <p className="text-sm">Canastillas: {loteOrdenVaceo.lote.inventarioActual?.inventario}</p>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MiComponente;
