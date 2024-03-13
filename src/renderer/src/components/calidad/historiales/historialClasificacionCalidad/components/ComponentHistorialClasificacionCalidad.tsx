/* eslint-disable prettier/prettier */

import { useEffect, useState } from "react"
import TarjetaHistorialClasificacionCalidad from "../utils/TarjetaHistorialClasificacionCalidad"
import FiltrosHistorialClasificacionCalidad from "../utils/FiltrosHistorialClasificacionCalidad"
import { lotesType } from "@renderer/types/lotesType"
import { crear_filtro } from "../functions/crearFiltro"
import useAppContext from "@renderer/hooks/useAppContext"

type filtroType = {
  tipoFruta: string
  fechaIngreso: { $gte: Date | null, $lt: Date | null }, cantidad: string
}
export default function ComponentHistorialClasificacionCalidad(): JSX.Element {
  const { messageModal } = useAppContext();
  const [filtro, setFiltro] = useState<filtroType>({ tipoFruta: '', fechaIngreso: { $gte: null, $lt: null }, cantidad: "" })
  const [data, setData] = useState<lotesType[]>([])
  const [cantidad, setCantidad] = useState<number>(50);

  const obtenerDataClasificacionCalidad = async (): Promise<void> => {
    try {
      const filtro_request = crear_filtro(filtro);

      const request = {
        data: {
          query: {
            ...filtro_request,
            "calidad.clasificacionCalidad": { $exists: true },
            enf: { $regex: '^E', $options: 'i' }
          },
          select: {},
          populate: {
            path: 'predio',
            select: 'PREDIO ICA'
          },
          sort: { "calidad.clasificacionCalidad.fecha": -1 },
          limit: cantidad

        },
        collection: 'lotes',
        action: 'getLotes',
        query: 'proceso'
      };
      const response = await window.api.server(request)
      if (response.status !== 200) {
        throw new Error(`${response.message}`);
      }
      setData(response.data)

    } catch (e) {
      if (e instanceof Error) {
        messageModal("error", e.message);
      }
    }
  }
  const handleServerEmit = async (data): Promise<void> => {
    if (data.fn === "procesoLote" || data.fn === 'ingresoLote') {
      await obtenerDataClasificacionCalidad()
    }
  }
  useEffect(() => {
    obtenerDataClasificacionCalidad();
    window.api.serverEmit('serverEmit', handleServerEmit)
    // Función de limpieza
    return () => {
      window.api.removeServerEmit('serverEmit', handleServerEmit)
    }
  }, [filtro])
  const handleFiltro = (filtroCase, elementoFiltro): void => {
    if (filtroCase === 'tipoFruta') {
      setFiltro({ ...filtro, tipoFruta: elementoFiltro })
    } else if (filtroCase === 'fechaInicio') {
      if (elementoFiltro === "") {
        const nuevoFiltro: filtroType = JSON.parse(JSON.stringify(filtro))
        nuevoFiltro.fechaIngreso.$gte = null
        setFiltro(nuevoFiltro)
      }
      else {
        const nuevoFiltro: filtroType = JSON.parse(JSON.stringify(filtro))
        nuevoFiltro.fechaIngreso.$gte = new Date(elementoFiltro)
        setFiltro(nuevoFiltro)
      }

    }
    else if (filtroCase === 'fechaFin') {
      if (elementoFiltro === "") {
        const nuevoFiltro: filtroType = JSON.parse(JSON.stringify(filtro))
        nuevoFiltro.fechaIngreso.$lt = new Date();
        setFiltro(nuevoFiltro)
      } else {
        const nuevoFiltro: filtroType = JSON.parse(JSON.stringify(filtro))
        const fecha = new Date(elementoFiltro)
        fecha.setUTCHours(23);
        fecha.setUTCMinutes(59);
        fecha.setUTCSeconds(59);
        nuevoFiltro.fechaIngreso.$lt = fecha
        setFiltro(nuevoFiltro)
      }
    }
  }
  const ordenar = (a, b): number => {
    const numA = parseInt(a._id.substring(8));
    const numB = parseInt(b._id.substring(8));
    return numB - numA;
  }
  return (
    <div className="flex flex-col gap-2 p-2">
      <FiltrosHistorialClasificacionCalidad handleFiltro={handleFiltro} setCantidad={setCantidad} />
      {Array.isArray(data) && data.sort(ordenar).map((lote, index) => (
        <div key={index} ><TarjetaHistorialClasificacionCalidad lote={lote} /></div>
      ))}
    </div>
  )
}
