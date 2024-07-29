/* eslint-disable prettier/prettier */
import { format } from "date-fns";
import { es } from 'date-fns/locale';
import { headers } from "../functions/constants";
import { lotesType } from "@renderer/types/lotesType";
import { FcCancel } from 'react-icons/fc'
import { GrDocumentMissing } from "react-icons/gr";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import useAppContext from "@renderer/hooks/useAppContext";
import { useContext } from "react";
import { dataContext, sectionContext } from "@renderer/App";

type propsType = {
    datosFiltrados: lotesType[]
    handleAccederDocumento: (data: lotesType) => void
}
export default function TablaInformeCalidad(props: propsType): JSX.Element {
    const { messageModal } = useAppContext();
    const secctionMenu = useContext(sectionContext);
    const dataGlobal = useContext(dataContext);


    const handleClickEF1 = (EF1): void => {
        try {
            if (!secctionMenu) {
                throw new Error("Error informes context secction menu")
            }
            if (!dataGlobal) {
                throw new Error("Error informes context data global")
            }
            secctionMenu.setSection("Inventario y Logística//Historiales//Lotes")
            dataGlobal.setDataComponentes(EF1)
        } catch (e) {
            if (e instanceof Error) {
                messageModal("error", `${e.message}`);
            }
        }
    }
    return (
        <table className="table-main">
            <thead>
                <tr>
                    {headers.map(item => (
                        <th key={item}>{item}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.datosFiltrados.map((item, index) => (
                    <tr className={`${index % 2 === 0 ? 'fondo-par' : 'fondo-impar'}`} key={index}>
                        <td onClick={(): void => handleClickEF1(item.enf)}>
                            {item.enf}
                        </td>
                        <td>{item.predio && item.predio.PREDIO}</td>
                        <td>{item.tipoFruta}</td>
                        <td>{format(item.fechaIngreso ? new Date(item.fechaIngreso) : new Date(), 'dd/MM/yyyy HH:mm', { locale: es })}</td>
                        <td>
                            <div>
                                {item.calidad && Object.prototype.hasOwnProperty.call(item.calidad, 'calidadInterna') ?
                                    format(item.calidad.calidadInterna?.fecha ? new Date(item.calidad.calidadInterna?.fecha) : new Date(), 'dd/MM/yyyy HH:mm', { locale: es }) : <FcCancel />}
                            </div>
                        </td>
                        <td>
                            <div>
                                {item.calidad && Object.prototype.hasOwnProperty.call(item.calidad, 'clasificacionCalidad') ?
                                    format(item.calidad.clasificacionCalidad?.fecha ? new Date(item.calidad.clasificacionCalidad?.fecha) : new Date(), 'dd/MM/yyyy HH:mm', { locale: es }) : <FcCancel />}
                            </div>
                        </td>
                        <td >
                            <div >
                                {item.calidad && Object.prototype.hasOwnProperty.call(item.calidad, 'fotosCalidad') ?
                                    format(item.calidad.fotosCalidad?.fechaIngreso ? new Date(item.calidad.fotosCalidad?.fechaIngreso) : new Date(), 'dd/MM/yyyy HH:mm', { locale: es })
                                    : <FcCancel />}
                            </div>
                        </td>
                        <td >
                            <div>
                                {typeof item.deshidratacion === "number" && item.deshidratacion.toFixed(2)}%
                            </div>
                        </td>
                        <td >
                            {item.calidad && Object.prototype.hasOwnProperty.call(item.calidad, 'calidadInterna') &&
                                Object.prototype.hasOwnProperty.call(item.calidad, 'clasificacionCalidad') &&
                                Object.prototype.hasOwnProperty.call(item.calidad, 'fotosCalidad') &&
                                item.deshidratacion && item.deshidratacion <= 2 && item.deshidratacion >= 0 ?
                                <button
                                    onClick={(): void => props.handleAccederDocumento(item)}>
                                    <FontAwesomeIcon icon={faFileAlt} />
                                </button>
                                :
                                <div
                                    onClick={(): void => props.handleAccederDocumento(item)}
                                    className="table-main-noDocument">
                                    <GrDocumentMissing />
                                </div>
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}