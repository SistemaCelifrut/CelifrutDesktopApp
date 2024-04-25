/* eslint-disable prettier/prettier */
import { crear_filtro } from "./crearFiltro";

export const requestData = (page, filtro): object => {
    const resultsPerPage = 50;
    const filtroQuery = crear_filtro(filtro)
    return {
        data: {
            query: {
                ...filtroQuery,
                "calidad.calidadInterna": { $exists: true },
                enf: { $regex: '^E', $options: 'i' }
            },
            select: {
                enf: 1,
                tipoFruta: 1,
                calidad: 1,
            },
            populate: {
                path: 'predio',
                select: 'PREDIO ICA'
            },
            sort: { "calidad.calidadInterna.fecha": -1 },
            limit: resultsPerPage,
            skip: (page - 1) * resultsPerPage
        },
        collection: 'lotes',
        action: 'getLotes',
        query: 'proceso'
    };
}

export const request_guardar_cambios = (lote, formData, user): object => {
    return {
        query: 'proceso',
        collection: 'lotes',
        action: 'modificar_lote',
        record: 'Modificación',
        user: { user: user.user, cargo: user.cargo },
        data: {
            lote: {
                _id: lote._id,
                "calidad.calidadInterna.acidez":formData.acidez,
                "calidad.calidadInterna.brix":formData.brix,
                "calidad.calidadInterna.ratio":formData.ratio,
                "calidad.calidadInterna.zumo":formData.zumo,
            }
        }
    }
}