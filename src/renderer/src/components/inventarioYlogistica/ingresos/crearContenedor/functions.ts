/* eslint-disable prettier/prettier */

import { EF1Type, contenedoresType, palletType } from "@renderer/types/contenedoresType";

export const crearObjetoContenedor = (data): contenedoresType => {
    const subDocumentos = [] as palletType[]
    for (let i = 1; i<=data.pallets; i++){
        const subDocumento = {
            EF1: [] as EF1Type[],
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
  
          subDocumentos.push(subDocumento);
    }

    const new_contenedor: contenedoresType = {

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

