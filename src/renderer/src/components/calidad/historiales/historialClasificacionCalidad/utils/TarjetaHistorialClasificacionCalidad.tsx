/* eslint-disable prettier/prettier */
import { useContext } from "react"
import { themeContext } from "@renderer/App"
import { format } from "date-fns"
import { lotesType } from "@renderer/types/lotesType"
import { INITIAL_STATE_LIMON, INITIAL_STATE_NARANJA } from "../functions/reduce"

type propsType = {
    lote: lotesType
}

export default function TarjetaHistorialClasificacionCalidad(props: propsType): JSX.Element {
    const theme = useContext(themeContext)
    return (
        <div className={`w-full rounded-xl h-auto overflow-hidden border-l-2 ${theme === 'Dark' ? '' : 'border-blue-400'}`}>
            <div className={`${theme === 'Dark' ? 'bg-slate-500 text-white' : 'bg-slate-100 text-black shadow-lg '} 
            font-bold p-0 pl-4 flex flex-col gap-4 h-full justify-start `}>
                <div className="flex flex-row gap-2">
                    <h2>{props.lote.enf}</h2>
                    <p>{props.lote.predio && props.lote.predio.PREDIO}</p>
                    <p>{props.lote.tipoFruta}</p>
                    <p>{props.lote.calidad && Object.prototype.hasOwnProperty.call(props.lote.calidad.clasificacionCalidad, 'fecha') &&
                        format(props.lote.calidad.clasificacionCalidad ?
                            new Date(props.lote.calidad.clasificacionCalidad.fecha) : new Date(), 'dd-MM-yyyy')}
                    </p>
                </div>
                <div className={`${theme === 'Dark' ? 'bg-slate-900' : 'bg-slate-300'} flex flex-row flex-wrap gap-4 m-4 p-2 rounded-lg`}>
                    {props.lote.calidad && props.lote.calidad.clasificacionCalidad &&
                        Object.keys(props.lote.calidad.clasificacionCalidad).map((item, index) => {
                            if (item !== 'fecha') {
                                if (props.lote.calidad &&
                                    props.lote.calidad.clasificacionCalidad &&
                                    props.lote.calidad.clasificacionCalidad[item] !== 0) {
                                    return (
                                        <div key={index + item} >

                                            {props.lote.tipoFruta === 'Naranja' ?
                                                INITIAL_STATE_NARANJA.find(key => key.key === item)?.id : INITIAL_STATE_LIMON.find(key => key.key === item)?.id}
                                            : {props.lote.calidad.clasificacionCalidad[item]}%
                                        </div>
                                    )
                                } else {
                                    return null
                                }
                            } else {
                                return <div key={index + item}></div>
                            }
                        })}
                </div>
            </div>
        </div>
    )
}
