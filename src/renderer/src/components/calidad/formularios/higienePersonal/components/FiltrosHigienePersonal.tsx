/* eslint-disable prettier/prettier */
type propsType = {
    setFiltroResponsable: (responsable) => void
    setFechaInicio: (date) => void
    setFechaFin: (date) => void
}
export default function FiltrosHigienePersonal(props: propsType): JSX.Element {

    return (
        <div className="filtroContainer">
            <label>
                <p>Responsable</p>
                <input type="text" placeholder="Nombre..." onChange={(e): void => props.setFiltroResponsable(e.target.value)} />
            </label>
            <label>
                <p>Fecha Incio</p>
                <input type="date" onChange={(e): void => props.setFechaInicio(new Date(e.target.value))} />
            </label>

            <label>
                <p>Feca fin</p>
                <input type="date" onChange={(e): void => {
                    const fechaFin = new Date(e.target.value);
                    fechaFin.setHours(23, 59, 59);
                    props.setFechaFin(fechaFin);
                }} />
            </label>

        </div>
    )
}