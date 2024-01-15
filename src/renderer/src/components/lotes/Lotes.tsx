/* eslint-disable prettier/prettier */

import { themeContext } from "@renderer/App"
import { useContext } from "react"
import FiltrosColumnas from "./utils/FiltrosColumnas"

export default function Lotes(): JSX.Element {
    const theme = useContext(themeContext)
    return (
        <div className="p-2">
            <div className={`bg-gray-200 p-3 rounded-lg shadow-lg`}>
                <div className={`${theme === 'Dark' ? 'text-white' : 'text-black'}
                    text-2xl font-bold`}>
                    <h2>Lotes</h2>
                </div>
                <div>
                    <FiltrosColumnas />
                </div>
            </div>
        </div>
    )
}
