import { ContenedoresObj } from "../types/types";


export default function(contenedor:ContenedoresObj) : string[]{
    try{
        let arr:string[] = []
        Object.keys(contenedor.pallets).map(pallet => {
                contenedor.pallets[pallet].EF1.map(enf => {
                    arr.push(enf.id)
                })
            
        })

        let set = new Set(arr)
        return Array.from(set)
    } catch(e) {
        return []
    }
}