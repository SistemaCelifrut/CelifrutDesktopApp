import { ContenedoresObj } from "../types/types"

type calidadType = {
    1.5: number
    1: number
    2: number
  }
  type calibreType = {
      [key:string]: number
  }
  
  type PrincipalGeneralType = [number, calidadType, calibreType, calibreType];

export default function (contenedor:ContenedoresObj|''): PrincipalGeneralType|0 {
    try{
        if(contenedor === '') return 0
        let total = 0;
        let calidad = { 1: 0, 1.5: 0, 2:0 };
        let calibre = {};
        let tipoCaja = {}
    
    
    
        Object.keys(contenedor).forEach(pallet => {
          if (['infoContenedor'].includes(pallet)) return;
          if(contenedor[pallet].hasOwnProperty('cajasTotal')){
            total += contenedor[pallet]['cajasTotal']
          }
            Object.keys(contenedor[pallet]).forEach(enf => {
                if (['listaLiberarPallet', 'settings', 'cajasTotal', 'liberado'].includes(enf)) return;
                //console.log(contenedor[pallet][enf])
                contenedor[pallet][enf].map( item => {
                    if(contenedor[pallet].hasOwnProperty(enf) && contenedor[pallet][enf].length > 0){
                        calidad[item[4]]  += item[1]
                        //tipo caja
                        if(!tipoCaja.hasOwnProperty(item[2])){
                            tipoCaja[item[2]] = 0
                        }
                        tipoCaja[item[2]] += item[1]
                        //calibre
                        if(!calibre.hasOwnProperty(item[3])){
                            calibre[item[3]] = 0
                        }
                        calibre[item[3]] += item[1]
                    }

                })
            
                
            })
        });
    
       return [total, calidad, calibre, tipoCaja]
    } catch(e){
        return [0, {1.5:0,1:0,2:0}, {}, {}]
    }
}