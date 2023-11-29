import { responseIngresarPredio } from "./predios"

export type serverResponseType  = {
    status:number
    data: vectorResponseIngresoPredio | string
}

type vectorResponseIngresoPredio = responseIngresarPredio[]