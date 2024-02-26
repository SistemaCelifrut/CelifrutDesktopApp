/* eslint-disable prettier/prettier */

import { proveedoresType } from "./proveedoresType"



/* eslint-disable @typescript-eslint/ban-types */
export type lotesType = {
    _id: string
    enf: string
    predio:proveedoresType
    canastillas: string
    tipoFruta: string
    observaciones: string
    kilos: number
    placa: string
    kilosVaciados: number
    promedio: number
    rendimiento: number
    deshidratacion: number
    descarteLavado: descarteLavadoType
    descarteEncerado: descarteEnceradoType
    directoNacional: number
    informeEnviado: boolean
    inventarioActual: inventarioActualType
    fechaIngreso: string
    calidad: calidadType
    urlInformeCalidad: string
    __v: number
}

type descarteLavadoType = {
    descarteGeneral: number 
    pareja: number 
    balin: number 
    descompuesta: number 
    piel: number 
    hojas: number 
}

type descarteEnceradoType = {
    descarteGeneral: number
    pareja: number
    balin: number
    extra: number
    descompuesta: number
    suelo: number
}

type inventarioActualType = {
    inventario: number
    descarteEncerado: {
        descarteGeneral: number
        pareja: number
        balin: number
        extra: number
    }
    descarteLavado: {
        descarteGeneral: number
        pareja: number
        balin: number
    }
}

type calidadType = {
    calidadInterna:{
        acidez: number
        brix: number
        ratio: number
        peso: number
        zumo: number
        fecha: string
    }
    clasificacionCalidad: {
        acaro: number
        alsinoe:number
        dannosMecanicos:number
        division:number
        escama:number
        frutaMadura:number
        frutaVerde:number
        fumagina:number
        grillo:number
        herbicida:number
        melanosis:number
        oleocelosis: number
        piel:number
        trips:number
        nutrientes:number
        antracnosis:number
        frutaRajada:number
        ombligona:number
        despezonada:number
        fecha: string
    }
    fotosCalidad: {[key: string]: string}
}