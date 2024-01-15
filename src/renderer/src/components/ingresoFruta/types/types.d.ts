/* eslint-disable prettier/prettier */
export type serverResponseType = {
    status: number
    enf: number
    data: proveedoresType[]
  }

type proveedoresType = {
  _id: string
  PREDIO: string
}

