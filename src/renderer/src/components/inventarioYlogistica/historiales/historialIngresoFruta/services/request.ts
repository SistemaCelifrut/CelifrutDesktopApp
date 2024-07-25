/* eslint-disable prettier/prettier */
export const requestLotes = (page): object => {
    return {
        action: 'get_ingresos_lotes',
        page: page
    }
}

export const request_predios = {
    action: 'getProveedores',
}

export const request_guardar_cambios = (lote, formData): object => {
    const promedio = Number(formData.kilos) / Number(formData.canastillas);
    const data = {}
    Object.keys(formData).forEach(item => {

        if (item === 'predio') {
            if (formData[item] !== lote.documento[item]._id) {
                data[item] = formData[item]
            }
        } else if(item === "kilos"){
            if (Number(formData[item] )!== lote.documento[item]) {
                data[item] = Number(formData[item])
            }
        }
        else {
            if (formData[item] !== lote.documento[item]) {
                data[item] = formData[item]
            }
        }
    })
    console.log(data)
    return {
        action: 'modificar_ingreso_lote',
        _idLote: lote.documento._id,
        _idRecord: lote._id,
        __v: lote.__v,
        data: {
            ...data,
            promedio: promedio,
        }
    }
}