export type responsePrediosDesverdizadoType = {
    status: number
    data: prediosDesverdizadoType[]
}


export type prediosDesverdizadoType = {
    enf:string
    nombrePredio:string
    canastillas:number
    kilos:number
    fechaIngreso:string
    cuartoDesverdizado:string
    fechaFinalizado?: string
}

export type stateUseReducerTypeDesverdizado = {
    type: string,
    data: prediosDesverdizadoType[]
    filtro:string
  }

