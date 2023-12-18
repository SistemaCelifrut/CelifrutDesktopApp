import { higienePersonalType } from "../types/higienePersonal"

export const filtroColaborador = (data:higienePersonalType[], colaborador:string) => {
    const filtro = data.filter(item => item.colaborador.toLowerCase().indexOf(colaborador.toLowerCase()) !== -1)
    return filtro
} 