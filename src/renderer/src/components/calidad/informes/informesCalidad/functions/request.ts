/* eslint-disable prettier/prettier */
export const requestObject = (page): object => {
  const resultsPerPage = 50;
  return {
    data: {
      query: { enf: { $regex: '^E', $options: 'i' } },
      skip: (page - 1) * resultsPerPage,
      limit: resultsPerPage,
    },
    action: 'get_lotes_informe_calidad'
  }
}
