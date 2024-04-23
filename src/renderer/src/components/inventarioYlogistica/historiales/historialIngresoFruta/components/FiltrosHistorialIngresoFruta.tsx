/* eslint-disable prettier/prettier */

type propsType = {
    setEf1: (ef1) => void
}

export default function FiltrosHistorialIngresoFruta (props: propsType): JSX.Element {
    return(
        <div className="filtroContainer">
            <label>
                <p>Codigo del lote</p>
                <input type="text" placeholder="EF1-..." onChange={(e):void => props.setEf1(e.target.value)} />
            </label>
        </div>
    )
}