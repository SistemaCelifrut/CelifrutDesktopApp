/* eslint-disable prettier/prettier */
export const request = {
  data: {
    query: { enf: { $regex: '^E', $options: 'i' } },
    select: {},
    populate: {
      path: 'predio',
      select: 'PREDIO ICA'
    },
    sort: { fechaIngreso: -1 },
    limit: 50
  },
  collection: 'lotes',
  action: 'getLotes',
  query: 'proceso'
}
