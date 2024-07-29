/* eslint-disable prettier/prettier */
import { lotesType } from "@renderer/types/lotesType";

export function obtenerPorcentage(dato:number, total:number):number{
    return ((dato * 100) / total)
}
export function totalDescarte(lote:lotesType):number{
    let descarteEncerado: number
    let descarteLavado: number
    if(lote.descarteEncerado){
        descarteEncerado = Object.values(lote.descarteEncerado).reduce((acu, value) => acu += value, 0)
    } else {
        descarteEncerado = 0
    }
    if(lote.descarteLavado){
        descarteLavado = Object.values(lote.descarteLavado).reduce((acu, value) => acu += value, 0)
    } else {
        descarteLavado = 0
    }
    return descarteEncerado + descarteLavado
}
export function totalLote(lote:lotesType):number{
    const descarte = totalDescarte(lote);
    return lote.calidad1 + lote.calidad15 + lote.calidad2 + descarte
}