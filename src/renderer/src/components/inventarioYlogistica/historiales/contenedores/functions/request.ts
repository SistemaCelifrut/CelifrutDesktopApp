/* eslint-disable prettier/prettier */

export const contenedoresRequest = {
    data: {
        query: {},
        select: {},
        sort: { "infoContenedor.fechaCreacion": -1 },
        populate:
            [{
                path: "infoContenedor.clienteInfo",
                select: "CLIENTE",
            }],
    },
    collection: 'contenedores',
    action: 'getContenedoresInforme',
    query: 'proceso'
}