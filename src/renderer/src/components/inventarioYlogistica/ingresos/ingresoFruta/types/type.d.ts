/* eslint-disable prettier/prettier */
export type serverResponseType = {
    status: number
    enf: number
    data: proveedoresType[]
  }

export type proveedoresType = {
  _id: string
  PREDIO: string
}

