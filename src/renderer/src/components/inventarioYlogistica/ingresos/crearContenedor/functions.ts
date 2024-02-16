/* eslint-disable prettier/prettier */
import { contenedorType, datosType } from "./type";

export const crearObjetoContenedor = (data: datosType): contenedorType => {
    const subDocumentos = {}
    for (let i = 1; i<=data.pallets; i++){
        const subDocumento = {
            EF1: [],
            cajasTotal: 0,
            listaLiberarPallet: {
              rotulado: false,
              paletizado: false,
              enzunchado: false,
              estadoCajas: false,
              estiba: false,
            },
            settings: {
              tipoCaja: "",
              calidad: 0,
              calibre: 0,
            },
          };
  
          subDocumentos[`${i}`] = subDocumento;
    }

    const new_contenedor: contenedorType = {
        numeroContenedor: data.numeroContenedor,
        infoContenedor:{
            clienteInfo: data.cliente,
            tipoEmpaque: data.tipoEmpaque,
            tipoFruta: data.tipoFruta,
            fechaCreacion: new Date().toUTCString(),
            fechaEstimadaCargue: data.fechaEstimadaCargue,
            fechaInicio: data.fechaInicioProceso,
            desverdizado: data.desverdizado,
            observaciones: data.observaciones,
            cerrado: false,
            tipoCaja: data.tipoCaja,
            calidad: data.calidad,
            calibres: data.calibres
     
        },
        pallets: subDocumentos,
    }

    return new_contenedor;
}

