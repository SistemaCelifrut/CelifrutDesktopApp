/* eslint-disable prettier/prettier */

import { themeContext } from "@renderer/App";
import { useContext, useState } from "react";
import { obtenerDiasSemana } from "../functions/functions";

type propsType = {
    setFechaInicio: (e: Date) => void
    setFechaFin: (e: Date) => void
    setTipoFruta: (e: string) => void
}

export default function FilstrosFecha(props: propsType): JSX.Element {
    const theme = useContext(themeContext)
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
        const fechainicio = new Date(Number(e.target.value), 0, 1)
        const fechafinal = new Date(Number(e.target.value) + 1, 0, 0)
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
            const mesValue = mes.split('-')[1]
            const fechainicio = new Date(año + '-' + mesValue + '-' + e.target.value + 'T00:00:00')
            const fechafinal = new Date(año + '-' + mesValue + '-' + e.target.value + 'T23:59:59')
            props.setFechaInicio(fechainicio);
            props.setFechaFin(fechafinal)
            setDia(e.target.value)

        }
    }
    const handleTipoFruta = (e): void => {
        props.setTipoFruta(e.target.value)
    }


    return (
        <div className={`${theme === 'Dark' ? 'bg-slate-600' : 'bg-slate-200'} p-4 rounded-xl shadow-lg m-2 flex flex-row flex-wrap gap-4`}>
            <label className={`flex flex-col gap-2 ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
                Filtro tipo fruta
                <select onChange={handleTipoFruta}
                className={`border-solid border-2 border-blue-200 rounded-lg p-2  ${theme === 'Dark' ? 'text-white bg-slate-950' : 'text-black'}`}>
                    <option value="">Tipo de fruta</option>
                    <option value="naranja">Naranja</option>
                    <option value="limon">Limon</option>
                </select>
            </label>
            <label className={`flex flex-col gap-2 ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
                Filtro Año
                <select
                    value={año}
                    onChange={handleAño}
                    className={`border-solid border-2 border-blue-200 rounded-lg p-2  ${theme === 'Dark' ? 'text-white bg-slate-950' : 'text-black'}`} >
                    <option value={0}>Año</option>
                    {years.map(year => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </label>
            {showMes &&
                <label className={`flex flex-col gap-2 ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
                    Filtro mes
                    <input
                        type="month"
                        value={mes}
                        onChange={handleMes}
                        className={`border-solid border-2 border-blue-200 rounded-lg p-2  ${theme === 'Dark' ? 'text-white bg-slate-950' : 'text-black'}`} />

                </label>}
            {showSemana &&
                <label className={`flex flex-col gap-2 ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
                    Filtro semana
                    <input
                        type="week"
                        value={semana}
                        onChange={handleSemana}
                        className={`border-solid border-2 border-blue-200 rounded-lg p-2  ${theme === 'Dark' ? 'text-white bg-slate-950' : 'text-black'}`} />

                </label>}

            {showDia && <label className={`flex flex-col gap-2 ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
                Filtro dia
                <select
                    value={dia}
                    onChange={handleDia}
                    className={`border-solid border-2 border-blue-200 rounded-lg p-2  ${theme === 'Dark' ? 'text-white bg-slate-950' : 'text-black'}`} >
                    <option value={0}>dias</option>
                    {dias.map(item => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </label>}
        </div>

    )

}
