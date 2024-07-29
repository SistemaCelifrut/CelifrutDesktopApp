/* eslint-disable prettier/prettier */
import { lotesType } from '@renderer/types/lotesType'
import '../css/datosLote.css'
import { useEffect, useState } from 'react';
import useAppContext from '@renderer/hooks/useAppContext';
import { contenedoresType } from '@renderer/types/contenedoresType';
import ViewInformeDatosGenerales from './ViewInformeDatosGenerales';
import ViewInformeResultados from './ViewInformeResultados';
import ViewInformeDescarte from './ViewInformeDescarte';
import { obtenerPorcentage, totalLote } from '../functions/data';
import ViewInformeObservaciones from './ViewInformeObservaciones';

type propsType = {
    handleVolverTabla: () => void
    loteSeleccionado: lotesType | undefined
}
export default function ViewInformeData(props: propsType): JSX.Element {
    const { messageModal } = useAppContext();
    const [contenedores, setContenedores] = useState<contenedoresType[]>([]);
    useEffect(() => {
        if (props.loteSeleccionado) buscarContenedores()

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
                <ViewInformeDatosGenerales contenedores={contenedores} loteSeleccionado={props.loteSeleccionado} />
                <table>
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
                        <ViewInformeDescarte loteSeleccionado={props.loteSeleccionado} />
                        <tr>
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
                        </tr>
                    </tbody>
                </table>
                <ViewInformeObservaciones loteSeleccionado={props.loteSeleccionado} />
            </div>
        </div>
    )
}