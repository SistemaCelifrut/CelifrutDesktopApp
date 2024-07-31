/* eslint-disable prettier/prettier */
import { lotesType } from "@renderer/types/lotesType";

export function totalPrecios(lote: lotesType): number {
    if (!lote.predio || !lote.predio.precio) {
        throw new Error("Lote predio or precio is undefined");
    }

    const precio = lote.predio.precio[lote.tipoFruta as string];
    if (precio === undefined) {
        throw new Error(`No price found for fruit type: ${lote.tipoFruta}`);
    }

    const { calidad1, calidad15, calidad2 } = lote;
    const descarteLavado = lote.descarteLavado
        ? Object.values(lote.descarteLavado).reduce(
            (acu, item) => acu + item * precio.descarte,
            0
        )
        : 0;

    const descarteEncerado = lote.descarteEncerado
        ? Object.values(lote.descarteEncerado).reduce(
            (acu, item) => acu + item * precio.descarte,
            0
        )
        : 0;

    const exportacion = (calidad1 * precio[1]) + (calidad15 * precio[15]) + (calidad2 * precio[2]);

    return descarteEncerado + descarteLavado + exportacion;
}