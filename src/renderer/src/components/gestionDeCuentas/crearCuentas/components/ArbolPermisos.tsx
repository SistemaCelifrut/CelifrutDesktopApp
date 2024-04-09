/* eslint-disable prettier/prettier */

import { userType } from "@renderer/types/cuentas"
import { useEffect } from "react"

type propsType = {
    permisos: object
    handleCheck: (e) => void
    usuario: userType | undefined
    modificar: boolean
}

export default function ArbolPermisos(props: propsType): JSX.Element {
    useEffect(() => {
        checkHandle();
    }, [])
    const checkHandle = (): void => {
        const inputs = document.getElementsByClassName("arbol-permisos-checkbox")
        for (const element of inputs) {
            const inputElement = element as HTMLInputElement;
            if (props.modificar) {
                if (props.usuario?.permisos_id.includes(Number(inputElement.value))) {
                    inputElement.checked = true
                } else {
                    inputElement.checked = false
                }
            } else {
                inputElement.checked = false
            }
        }
    }
    return (
        <div className="arbol-permisos-container">
            {Object.keys(props.permisos).map(dep => (
                <div key={dep}>
                    <div className="arbol-permisos-dep-head">
                        <label>
                            <p>{dep}</p>
                        </label>
                    </div>
                    <hr />
                    <div>
                        {Object.keys(props.permisos[dep]).map(seccion => (
                            <div key={seccion + dep}>
                                <div className="arbol-permisos-dep-head2">
                                    <label>
                                        <p>{seccion}</p>
                                    </label>
                                </div>
                                <div>
                                    {props.permisos[dep][seccion].map(item => (
                                        <div key={item.nombre + seccion + dep} className="arbol-permisos-dep-head3">
                                            <input
                                                className="arbol-permisos-checkbox"
                                                type="checkbox"
                                                value={item.id}
                                                onChange={props.handleCheck} />
                                            <label>
                                                <p>{item.nombre}</p>
                                            </label>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}