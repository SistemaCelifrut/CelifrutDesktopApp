/* eslint-disable prettier/prettier */
import { crear_filtro } from "./crearFiltro";

export const requestData = (page, filtro): object => {
    const resultsPerPage = 50;
    const filtroQuery = crear_filtro(filtro)
    return {
        data: {
            query: {
              ...filtroQuery,
              "calidad.clasificacionCalidad": { $exists: true },
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
            sort: { "calidad.clasificacionCalidad.fecha": -1 },
            limit: resultsPerPage,
            skip: (page - 1) * resultsPerPage
  
          },
          collection: 'lotes',
          action: 'getLotes',
          query: 'proceso'
        };
}

export const request_guardar_cambios = (lote, formData, user): object => {
  const dataChange = {};
  Object.keys(formData).forEach(item => {
    if(formData[item] > 0){
      dataChange[`calidad.clasificacionCalidad.${item}`] = formData[item]
    }
  })
  return {
      query: 'proceso',
      collection: 'lotes',
      action: 'modificar_lote',
      record: 'Modificación',
      user: { user: user.user, cargo: user.cargo },
      data: {
          lote: {
              ...dataChange,
              _id: lote._id,
          }
      }
  }
}