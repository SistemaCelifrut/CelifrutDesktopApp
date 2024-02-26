/* eslint-disable prettier/prettier */

import { useEffect, useState } from "react"
import TableHistorialCalidadInterna from "../tables/TableHistorialCalidadInterna"
import FiltrosHistorialCalidadInterna from "../utils/FiltrosHistorialCalidadInterna"
import { lotesType } from "@renderer/types/lotesType"
import { crear_filtro } from "../functions/crearFiltro"
type propsType = {
    setShowSuccess: (e) => void
    setShowError: (e) => void
    setMessage: (e) => void
}

type filtroType = {
    tipoFruta: string
    fechaIngreso:{ $gte: Date | null, $lt: Date | null }, cantidad:string
}

export default function ComponentHistorialCalidadInterna(props: propsType): JSX.Element {
    const [data, setData] = useState<lotesType[]>([])
    const [filtro, setFiltro] = useState<filtroType>({ tipoFruta: '', fechaIngreso: { $gte: null, $lt: null }, cantidad:"" })
    const [cantidad, setCantidad] = useState<number>(50);

    useEffect(() => {
        const requestDataCalidadInterna = async (): Promise<void> => {
            const filtro_request = crear_filtro(filtro);
            const request = {
                data:{
                  query:{
                    ...filtro_request,
                    "calidad.calidadInterna": { $exists : true},
                    enf: { $regex: '^E', $options: 'i' }
                  },
                  select : {},
                  populate:{
                    path: 'predio',
                    select: 'PREDIO ICA'
                  },
                  sort:{"calidad.calidadInterna.fecha": -1},
                  limit: cantidad

                },
                collection:'lotes',
                action: 'getLotes',
                query: 'proceso'
              };
            console.log(request)

            const response = await window.api.server(request);
            console.log(response)
            if (response.status === 200) {
                setData(response.data)
            } else {
                props.setShowError(true)
                props.setMessage("Error obteniendo los datos del servidor")
                setInterval(() => {
                    props.setShowError(false)
                }, 5000)
            }
        }
        requestDataCalidadInterna()
    }, [filtro, cantidad])

    const handleFiltro = (filtroCase, elementoFiltro): void => {
        if (filtroCase === 'tipoFruta') {
            setFiltro({ ...filtro, tipoFruta: elementoFiltro })
        }     else if (filtroCase === 'fechaInicio') {
            if(elementoFiltro === "") {
              const nuevoFiltro:filtroType = JSON.parse(JSON.stringify(filtro))
              nuevoFiltro.fechaIngreso.$gte = null
              setFiltro(nuevoFiltro)
            }
            else{
              const nuevoFiltro:filtroType = JSON.parse(JSON.stringify(filtro))
              nuevoFiltro.fechaIngreso.$gte = new Date(elementoFiltro)
              setFiltro(nuevoFiltro)
            }
      
          } 
          else if (filtroCase === 'fechaFin') {
            if(elementoFiltro === "") {
              const nuevoFiltro:filtroType = JSON.parse(JSON.stringify(filtro))
              nuevoFiltro.fechaIngreso.$lt = new Date();
              setFiltro(nuevoFiltro)
            } else {
              const nuevoFiltro:filtroType = JSON.parse(JSON.stringify(filtro))
              const fecha = new Date(elementoFiltro)
              fecha.setUTCHours(23);
              fecha.setUTCMinutes(59);
              fecha.setUTCSeconds(59);
              nuevoFiltro.fechaIngreso.$lt = fecha
              setFiltro(nuevoFiltro)
            }
          } 
    }
    return (
        <div className="flex flex-col gap-2">
            <FiltrosHistorialCalidadInterna handleFiltro={handleFiltro} setCantidad={setCantidad} />
            <TableHistorialCalidadInterna data={data} />
        </div>
    )
}
