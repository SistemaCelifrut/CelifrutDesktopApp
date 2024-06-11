/* eslint-disable prettier/prettier */
export const request_add_pallet_to_contenedor = (contendor): object => {
    return {
        data: {
            contenedor:{
                _id:contendor,
            }
        },
        collection: 'contenedores',
        action: 'add_pallet_contenedor',
        query: 'proceso'
    }
}