/* eslint-disable prettier/prettier */
export const requestlotes = {
  data: {
    query: {
      'calidad.clasificacionCalidad': { $exists: false },
      enf: { $regex: '^E', $options: 'i' }
    },
    select: { enf: 1, tipoFruta: 1, calidad: 1 },
    populate: {
      path: 'predio',
      select: 'PREDIO'
    },
    sort: { fechaIngreso: -1 }
  },
  collection: 'lotes',
  action: 'getLotes',
  query: 'proceso'
}
