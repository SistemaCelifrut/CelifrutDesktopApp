/* eslint-disable prettier/prettier */
export const requestLotes = (page): object => {
    const resultsPerPage = 50;
    return {
        data: {
            query: {
                enf: { $exists: true }
            },
            select: {
                enf: 1,
                canastillas: 1,
                fechaIngreso: 1,
                kilos: 1,
                canastillasVacias: 1,
                tipoFruta: 1,
                observaciones: 1,
                placa: 1
            },
            populate: {
                path: 'predio',
                select: 'PREDIO ICA'
            },
            sort: { fechaIngreso: -1 },
            limit: resultsPerPage,
            skip: (page - 1) * resultsPerPage
        },
        collection: 'lotes',
        action: 'getLotes',
        query: 'proceso',
    }

}

export const request_predios = {
    data: {
        query: {}
    },
    collection: 'proveedors',
    action: 'obtenerProveedores',
    query: 'proceso'
}

export const request_guardar_cambios = (lote, formData, user): object => {
    const promedio = Number(formData.kilos) / Number(formData.canastillas);
    return {
        query: 'proceso',
        collection: 'lotes',
        action: 'modificar_lote',
        record: 'Modificación',
        user: { user: user.user, cargo: user.cargo },
        data: {
            lote: {
                _id: lote._id,
                enf: formData.enf,
                predio: formData.predio,
                canastillas: formData.canastillas,
                kilos: Number(formData.kilos),
                fechaIngreso: formData.fechaIngreso,
                tipoFruta: formData.tipoFruta,
                observaciones: formData.observaciones,
                placa: formData.placa,
                promedio:promedio
            }
        }
    }
}