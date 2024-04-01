/* eslint-disable prettier/prettier */

import IngresarOperario from "./components/IngresarOperario";

export default function Operario(): JSX.Element {
    return (
        <div className="componentContainer">
            <div className="navBar"></div>
            <IngresarOperario />
        </div>
    )
}