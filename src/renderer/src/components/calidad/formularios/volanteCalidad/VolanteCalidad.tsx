/* eslint-disable prettier/prettier */

import { useEffect, useState } from "react"
import FilstrosFecha from "./utils/FilstrosFecha"
import { registrosType } from "./type/type"
import TablaVolantecalidad from "./table/TablaVolantecalidad"
import { FaCircleArrowRight } from "react-icons/fa6";
import TableResumenVolanteCalidad from "./table/TableResumenVolanteCalidad"
import Graficas from "./components/Graficas"
import useAppContext from "@renderer/hooks/useAppContext"
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import "./css/styles.css"

export default function VolanteCalidad(): JSX.Element {
    const { messageModal } = useAppContext()
    const [data, setData] = useState<registrosType[]>([])
    const [fechaInicio, setFechaInicio] = useState<Date>()
    const [fechaFin, setFechaFin] = useState<Date>()
    const [tipoFruta, setTipoFruta] = useState<string>('')
    const [showResume, setShowResume] = useState<boolean>(true)
    const [page, setPage] = useState<number>(1);
    useEffect((): void => {
        obtenerDatos()
    }, [tipoFruta, fechaFin, fechaInicio, page])
    const obtenerDatos = async (): Promise<void> => {
        try {
            const request = {
                collection: 'calidad',
                action: 'getVolanteCalidad',
                tipo_fruta: tipoFruta,
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin,
                page: page
            }
            const response = await window.api.server(request);
            console.log(response)

            if (response.status !== 200) {
                throw new Error(response.message)
            }
            setData(response.data)
            console.log(response)
        } catch (e) {
            if (e instanceof Error)
                messageModal("error", e.message)
        }
    }
    return (
        <div className="componentContainer">
            <div className="navBar"></div>
            <div>
                <h2>
                    Volante calidad
                </h2>
            </div>
            <div>
                <FilstrosFecha setFechaFin={setFechaFin} setFechaInicio={setFechaInicio} setTipoFruta={setTipoFruta} />
            </div>
            <div >
                <div className="volante-calidad-div-graficas">
                    <Graficas data={data} />
                </div>
            </div>
            <div className="volante-calidad-div-botones-cambio-tabla">
                {showResume ?
                    <button onClick={(): void => setShowResume(!showResume)} className="volante-calidad-boton-cambio-tabla">
                        <span>
                            Resumen
                        </span>
                        <span >
                            <FaCircleArrowRight />
                        </span>
                    </button>
                    :
                    <button
                        onClick={(): void => setShowResume(!showResume)} className="volante-calidad-boton-cambio-tabla">
                        <span >
                            Tabla
                        </span>
                        <span>
                            <FaCircleArrowRight />
                        </span>
                    </button>
                }
            </div>
            {showResume ?
                <div >
                    <TableResumenVolanteCalidad data={data} />
                </div> : <div>
                    <TablaVolantecalidad data={data} />
                </div>
            }
            {!showResume &&
                <div className="volante-calidad-button-page-div">
                    <button
                        onClick={(): void => setPage(page - 1)}
                        disabled={page === 1}
                        className="volante-calidad-button-page">
                        {<IoIosArrowBack />}
                    </button>
                    {page}
                    <button
                        onClick={(): void => setPage(page + 1)}
                        className="volante-calidad-button-page">
                        {<IoIosArrowForward />}
                    </button>
                </div>
            }
        </div>

    )
}
