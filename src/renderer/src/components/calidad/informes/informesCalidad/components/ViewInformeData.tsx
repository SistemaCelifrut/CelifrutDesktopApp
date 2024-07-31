/* eslint-disable prettier/prettier */
import { lotesType } from '@renderer/types/lotesType'
import '../css/datosLote.css'
import { useEffect, useState } from 'react';
import useAppContext from '@renderer/hooks/useAppContext';
import { contenedoresType } from '@renderer/types/contenedoresType';
import ViewInformeDatosGenerales from './ViewInformeDatosGenerales';
import ViewInformeResultados from './ViewInformeResultados';
import ViewInformeDescarte from './ViewInformeDescarte';
import { dataInformeInit, dataInformeType, obtenerPorcentage, totalLote } from '../functions/data';
import ViewInformeObservaciones from './ViewInformeObservaciones';
import ViewInformeFotos from './ViewInformeFotos';
import { totalPrecios } from '../functions/totalPrecios'
type propsType = {
    handleVolverTabla: () => void
    loteSeleccionado: lotesType | undefined
}
export default function ViewInformeData(props: propsType): JSX.Element {
    const { messageModal } = useAppContext();
    const [contenedores, setContenedores] = useState<contenedoresType[]>([]);
    const [dataInforme, setDataInforme] = useState<dataInformeType>(dataInformeInit)
    useEffect(() => {
        if (props.loteSeleccionado &&
            props.loteSeleccionado.contenedores &&
            props.loteSeleccionado.contenedores?.length > 0) {
            buscarContenedores()
        }
    }, [props.loteSeleccionado])

    const buscarContenedores = async (): Promise<void> => {
        try {
            const request = { action: "obtener_contenedores_lotes", data: props.loteSeleccionado?.contenedores }
            const response = await window.api.server2(request)
            if (response.status !== 200) throw new Error(`Code ${response.status}: ${response.message}`);
            setContenedores(response.data)
        } catch (err) {
            if (err instanceof Error) {
                messageModal("error", `${err.message}`)
            }
        }
    }
    const crearInforme = ():void => {
        console.log(dataInforme)
    }
    //si el lote es indefinido
    if (props.loteSeleccionado === undefined) {
        return (
            <div>
                <div>Opsss, no se encontro el predio seleccionado</div>
                <button className="defaulButtonAgree" onClick={props.handleVolverTabla}>Regresar</button>
            </div>
        )
    }
    return (
        <div>
            <button className="defaulButtonAgree" onClick={props.handleVolverTabla}>Regresar</button>
            <div className="container-informe-calidad-lote">
                <h2>Informe de calidad para el productor</h2>
                <hr />
                <ViewInformeDatosGenerales 
                    setDataInforme={setDataInforme}
                    contenedores={contenedores} 
                    loteSeleccionado={props.loteSeleccionado} />
                <hr />
                <div className='informe-calidad-lote-div'>
                    <h3>Resultados</h3>
                </div>
                <table className='table-main'>
                    <thead>
                        <tr>
                            <th>Clasificacion</th>
                            <th>Unidad/Kg</th>
                            <th>Porcentaje</th>
                            <th>Precio /Kg</th>
                            <th>PrecioTotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ViewInformeResultados loteSeleccionado={props.loteSeleccionado} />
                        <ViewInformeDescarte loteSeleccionado={props.loteSeleccionado}/>
                        <tr className='fondo-impar'>
                            <td>Total</td>
                            <td>
                                {totalLote(props.loteSeleccionado).toFixed(2)} Kg
                            </td>
                            <td>
                                {obtenerPorcentage(
                                    totalLote(props.loteSeleccionado),
                                    (props.loteSeleccionado.kilos ?? 1)
                                ).toFixed(2)}%
                            </td>
                            <td></td>
                            <td>
                                {
                                    new Intl.NumberFormat('es-CO', {
                                        style: 'currency',
                                        currency: 'COP',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(totalPrecios(props.loteSeleccionado))
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='informe-calidad-lote-div'>
                    <h3>Observaciones</h3>
                </div>
                <ViewInformeObservaciones loteSeleccionado={props.loteSeleccionado} />
                <div className='informe-calidad-lote-div'>
                    <h3>Evidencias fotograficas</h3>
                </div>
                <div>
                    <ViewInformeFotos loteSeleccionado={props.loteSeleccionado} />
                </div>
                <div className='informe-calidad-lote-div'>
                    <button className='defaulButtonAgree' onClick={crearInforme}>Generar informe</button>
                </div>
            </div>
        </div>
    )
}