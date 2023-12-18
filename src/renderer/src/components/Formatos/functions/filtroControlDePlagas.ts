import { AreaSchema } from "../types/controlPlagas";

export const filtroArea = (data:AreaSchema[], area:string) => {
    const filtro = data.filter(item => {
        return Object.keys(item).some(key => key.startsWith(area))
    })
    return filtro
}