/* eslint-disable prettier/prettier */
export const requestObject = (page): object => {
  const resultsPerPage = 50;
  return {
    data: {
      query: { enf: { $regex: '^E', $options: 'i' } },
      select: {},
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
    query: 'proceso'
  }
}
