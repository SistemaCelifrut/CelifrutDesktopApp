/* eslint-disable prettier/prettier */
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
                "inventarioActual.inventario":formData,
            }
        }
    }
}