/* eslint-disable prettier/prettier */

import { useState } from "react";
import { obtenerDiasSemana } from "../functions/functions";

type propsType = {
    setFechaInicio: (e: Date) => void
    setFechaFin: (e: Date) => void
    setTipoFruta: (e: string) => void
}

export default function FilstrosFecha(props: propsType): JSX.Element {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2022 }, (_, i) => 2023 + i);
    const [año, setAño] = useState<number>(0)
    const [mes, setMes] = useState<string>('')
    const [showMes, setShowMes] = useState<boolean>(false)
    const [showSemana, setShowSemana] = useState<boolean>(false)
    const [semana, setSemana] = useState<string>('')
    const [showDia, setShowDia] = useState<boolean>(false)
    const [dias, setDias] = useState<number[]>([])
    const [dia, setDia] = useState<number>(0)


    const handleAño = (e): void => {
        let fechafinal;
        if (Number(e.target.value) === 0) {
            fechafinal = new Date()
        } else {
            fechafinal = new Date(Number(e.target.value) + 1, 0, 0)
        }
        const fechainicio = new Date(Number(e.target.value), 0, 1)
        props.setFechaInicio(fechainicio);
        props.setFechaFin(fechafinal)
        setAño(Number(e.target.value))
        setShowDia(false)
        setShowSemana(false)
        setShowMes(true)
        setMes('')

    }
    const handleMes = (e): void => {
        if (e.target.value) {
            const mesValue = e.target.value.split('-')[1]

            const fechainicio = new Date(año, Number(mesValue) - 1, 1)
            const fechafinal = new Date(año, Number(mesValue), 0)
            props.setFechaInicio(fechainicio);
            props.setFechaFin(fechafinal)
            setMes(e.target.value)
            setShowSemana(true)
        } else {
            const fechainicio = new Date(año, 0, 1)
            const fechafinal = new Date(año + 1, 0, 0)
            props.setFechaInicio(fechainicio);
            props.setFechaFin(fechafinal)
            setDia(0)
            setSemana('')
            setMes('')
            setShowDia(false)
            setShowSemana(false)
            setMes('')
        }
    }
    const handleSemana = (e): void => {
        if (e.target.value) {
            const mesValue = mes.split('-')[1]
            const weekDays = obtenerDiasSemana(e.target.value)

            const fechainicio = new Date(año + '-' + mesValue + '-' + weekDays[0] + 'T00:00:00')
            const fechafinal = new Date(año + '-' + mesValue + '-' + weekDays[weekDays.length - 1] + 'T23:59:59')
            props.setFechaInicio(fechainicio);
            props.setFechaFin(fechafinal)
            setSemana(e.target.value)
            // setDias(año + '-W01')
            setShowDia(true)
            setDias(weekDays);
        } else {
            const mesValue = mes.split('-')[1]

            const fechainicio = new Date(año, Number(mesValue) - 1, 1)
            const fechafinal = new Date(año, Number(mesValue), 0)
            props.setFechaInicio(fechainicio);
            props.setFechaFin(fechafinal)
            setSemana('')
            setDia(0)
            setShowSemana(false)
            setShowDia(false)
        }
    }
    const handleDia = (e): void => {
        if (Number(e.target.value) === 0) {
            const mesValue = mes.split('-')[1]
            const fechainicio = new Date(año + '-' + mesValue + '-' + dias[0] + 'T00:00:00')
            const fechafinal = new Date(año + '-' + mesValue + '-' + dias[dias.length - 1] + 'T23:59:59')
            props.setFechaInicio(fechainicio);
            props.setFechaFin(fechafinal)
            setDia(e.target.value)
            setShowDia(false)
        } else {
            const diax = Number(e.target.value) + 1
            console.log(diax)

            let diaString 
            if(diax < 10){
                diaString = "0" + diax
            } else {
                diaString = diax
            }
            console.log(diaString)

            const mesValue = mes.split('-')[1]
            const fechainicio = new Date(año + '-' + mesValue + '-' + diaString + 'T00:00:00')
            const fechafinal = new Date(año + '-' + mesValue + '-' + diaString + 'T23:59:59')
            props.setFechaInicio(fechainicio);
            props.setFechaFin(fechafinal)
            setDia(e.target.value)

        }
    }
    const handleTipoFruta = (e): void => {
        props.setTipoFruta(e.target.value)
    }


    return (
        <div className="filtroContainer">
            <div className='div-filter-actions'>
                <select onChange={handleTipoFruta}>
                    <option value="">Tipo de fruta</option>
                    <option value="Naranja">Naranja</option>
                    <option value="Limon">Limon</option>
                </select>
                <select
                    value={año}
                    onChange={handleAño}>
                    <option value={0}>Año</option>
                    {years.map(year => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                {showMes &&
                    <input
                        type="month"
                        value={mes}
                        onChange={handleMes} />
                }
                {showSemana &&
                    <input
                        type="week"
                        value={semana}
                        onChange={handleSemana} />
                }
                {showDia &&
                    <select
                        value={dia}
                        onChange={handleDia}>
                        <option value={0}>dias</option>
                        {dias.map(item => (
                            <option key={item} value={item}>
                                {Number(item) + 1}
                            </option>
                        ))}
                    </select>}
            </div>
        </div>

    )

}
