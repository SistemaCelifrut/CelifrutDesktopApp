/* eslint-disable prettier/prettier */

import { cargoType } from "@renderer/types/cargos"

 type propsType = {
    data:cargoType | undefined
 }
export default function CrearCargo(props:propsType): JSX.Element{
    if(props.data === undefined){
        return(
            <div>No se cargo los datos...</div>
        )
    }
    return(
        <div>
            {Object.keys(props.data).map(key => {
                if(!["_id", "createdAt", "Cargo"].includes(key) && props.data !== undefined){
                    return (
                        <div key={key}>
                            <h3>{key}</h3>
                            {Object.keys(props.data[key]).map(seccion => {
                                if(props.data !== undefined){
                                    return(
                                        <div key={key + seccion}>
                                        <h4>{seccion}</h4>
                                        {Object.keys(props.data[key][seccion]).map(subSeccion => (
                                            <div key={key + seccion + subSeccion}>{subSeccion}</div>
                                        ))}
                                    </div>
                                    )
                                } else return null
                            })}
                        </div>
                    )
                }else{
                    return null
                }
            })}
        </div>
    )
}
