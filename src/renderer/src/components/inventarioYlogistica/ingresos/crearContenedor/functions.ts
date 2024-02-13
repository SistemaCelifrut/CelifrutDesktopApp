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
            infoCliente: data.cliente,
            tipoEmpaque: data.tipoEmpaque,
            tipoFruta: data.tipoFruta,
            fechaCreacion: new Date().toUTCString(),
            desverdizado: data.desverdizado,
            observaciones: data.observaciones,
            cerrado: false,
            pesoCaja: {
                "G-37": 16.1,
                "B-37": 16.1,
                "G-4_5": 4.5,
                "G-30": 13.5,
                "B-30": 13.5,
                "B-40": 18,
                "G-40": 18,
                Rojo: 40,
                verde: 40,
                granel: 40,
              },
        },
        pallets: subDocumentos,
    }

    return new_contenedor;
}

