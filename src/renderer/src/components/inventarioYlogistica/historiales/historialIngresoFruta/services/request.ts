/* eslint-disable prettier/prettier */
export const requestLotes = (page): object => {
    return {
        action:'get_ingresos_lotes',
        page: page
    }
}

export const request_predios = {
    action: 'getProveedores',
}

export const request_guardar_cambios = (lote, formData): object => {
    const promedio = Number(formData.kilos) / Number(formData.canastillas);
    return {
        action: 'modificar_ingreso_lote',
        _id: lote.documento._id,
        data: {
                enf: formData.enf,
                predio: formData.predio,
                canastillas: formData.canastillas,
                kilos: Number(formData.kilos),
                fechaIngreso: formData.fechaIngreso,
                tipoFruta: formData.tipoFruta,
                observaciones: formData.observaciones,
                placa: formData.placa,
                promedio:promedio,
        }
    }
}