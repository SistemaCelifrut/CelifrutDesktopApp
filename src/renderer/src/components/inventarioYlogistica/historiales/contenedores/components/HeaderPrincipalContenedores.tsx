/* eslint-disable prettier/prettier */
export default function HeaderPrincipalContenedores(): JSX.Element {
    const headers = ["N° Contenedor", "Cliente", "Fecha", "Lista de empaque", "Informacion", "Inspeccion Tractomula", "Informe"]
    return (
        <thead className="table-main">
            <tr>
                {headers.map(item => (
                    <th key={item}>{item}</th>
                ))}
            </tr>
        </thead>
    )
}