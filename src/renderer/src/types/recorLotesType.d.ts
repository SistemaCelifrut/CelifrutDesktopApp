/* eslint-disable prettier/prettier */
import { lotesType } from "./lotesType"

export type recordLotesType = {
    _id:string
    operacionRealizada: string
    documento:lotesType
    fecha:string
    createdAt:string
    updatedAt: string
    __v:number
    user:string
}