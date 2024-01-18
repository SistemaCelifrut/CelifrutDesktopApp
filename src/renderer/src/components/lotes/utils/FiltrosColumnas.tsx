/* eslint-disable prettier/prettier */

import { themeContext } from "@renderer/App";
import { useContext } from "react";
import { filtroColumnasType } from "../type/types";

type propsType = {
    columnVisibility: filtroColumnasType
    handleChange: (e) => void
}

export default function FiltrosColumnas(props:propsType): JSX.Element {
    const theme = useContext(themeContext)

 
    return (
        <div className={`flex flex-row flex-wrap gap-2 p-3 rounded-xl
                        ${theme === 'Dark' ? 'bg-slate-800' : 'bg-white'}`}>
            {Object.keys(props.columnVisibility).map(item => (
                <label key={item} className={`flex flex-row gap-1 ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
                    <input type="checkbox" value={item} onClick={props.handleChange}/>
                    <p>{item}</p>
                </label>
            ))}
        </div>
    )
}
