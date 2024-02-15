import React, { useState, useEffect } from 'react';

interface Lote {
    nombrePredio: string;
    fechaIngreso: string;
    observaciones: string;
    tipoFruta: string;
    promedio: number;
    inventarioActual: number;
    enf: string;
    kilosVaciados: number;
    directoNacional: number;
    inventario?: any; // Hacer la propiedad opcional si es posible que falte en algunos elementos de lotes
    descarteEncerado?: any; // Hacer la propiedad opcional si es posible que falte en algunos elementos de lotes
    descarteLavado?: any; // Hacer la propiedad opcional si es posible que falte en algunos elementos de lotes
}

interface ServerResponse<T> {
    status: number;
    data: T;
}

const MiComponente: React.FC = () => {
    const [lotes, setLotes] = useState<Lote[]>([]);

    useEffect(() => {
        const obtenerLotes = async (): Promise<void> => {
            try {
                const request = {
                    data: {
                        query: { "inventarioActual.inventario": { $gt: 0 } },
                        select: { nombrePredio: 1, fechaIngreso: 1, observaciones: 1, tipoFruta: 1, promedio: 1, inventarioActual: 1, enf: 1, kilosVaciados: 1, directoNacional: 1 },
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
                    setLotes(response.data);
                } else {
                    alert("Error obteniendo los lotes");
                }
            } catch (error) {
                console.error('Error al obtener lotes:', error);
            }
        };

        obtenerLotes();
    }, []);

    return (
        <div>
            <h1>Listado de Lotes</h1>
            
        </div>
    );
};

export default MiComponente;
