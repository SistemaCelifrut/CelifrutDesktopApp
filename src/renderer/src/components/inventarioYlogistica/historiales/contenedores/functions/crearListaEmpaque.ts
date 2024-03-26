/* eslint-disable prettier/prettier */
import { contenedoresType } from "@renderer/types/contenedoresType";
import { itemListaEmpaqueType } from "../types/types";

export const crear_lista_empaque = (contenedor: contenedoresType): itemListaEmpaqueType[] | string => {
    try {
        const listaEmpaque: itemListaEmpaqueType[] = [];
        if (contenedor.pallets === undefined) {
            throw new Error("Error creando los datos de lista de empaque")
        }
        for (const [index, pallet] of contenedor.pallets.entries()) {
            for (const item of pallet.EF1){
                const fechaItem = item.fecha ?  new Date(item.fecha) : new Date();
                const objLabels = getLabel(item.tipoCaja,contenedor.infoContenedor ? contenedor.infoContenedor.tipoFruta : 'Limon' , item.calibre);
                const [label, variedad, producto, pesoCaja] = objLabels;

                const rowInfo: itemListaEmpaqueType = {
                    pallet: String((Number(index) + 1)) + String(contenedor.numeroContenedor),
                    fecha: fechaItem.getMonth() + 1 + "/" + fechaItem.getDate() + "/" + fechaItem.getFullYear(),
                    label:label,
                    variedad: variedad,
                    producto: producto,
                    peso: pesoCaja + "LB",
                    categoria: item.calidad ? item.calidad : 0,
                    tamaño: item.calibre ? item.calibre : 0,
                    cantidad: item.cajas ? item.cajas : 0,
                    ICA: item.lote && item.lote.ICA ? item.lote.ICA : "",
                    GGN: item.lote && item.lote.ICA ? item.lote.ICA : "",
                    fechaVencimiento: item.lote && item.lote.VENCIMIENTO ? item.lote.VENCIMIENTO : ""
                }
                listaEmpaque.push(rowInfo);
            }
        }
        return listaEmpaque;
    } catch (e) {
        if (e instanceof Error) {
            return e.message
        }
    }
    return "Error desconocido"
}

function getLabel(caja, tipoFruta, calibre): string[] {
    const variedades = {
      Limon: "TAHITI",
      Naranja: "Naranja",
    };
  
    const labels = {
      G: "Kraft Celifrut",
      B: "White Celifrut",
      default: "Celifrut",
    };
  
    const variedad = variedades[tipoFruta];

    if (!variedad) {
        throw new Error(`Tipo de fruta no soportado: ${tipoFruta}`);
    }
  
    const [tipoCaja, pesoCaja] = caja.split("-");
    const label = labels[tipoCaja] || labels["default"];
  
    const medida = pesoCaja == 4.5 ? "Kg" : "Lbs";
    const variedadProducto = tipoFruta == "Naranja" ? "Orange" : "Limes";
  
    return [label, variedad, "COL-" + pesoCaja + medida + " " + variedadProducto + " " + calibre + "ct", pesoCaja];
  
  
  
  }