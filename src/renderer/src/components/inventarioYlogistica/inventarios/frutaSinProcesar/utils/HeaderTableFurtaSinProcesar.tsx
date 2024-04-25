/* eslint-disable prettier/prettier */


export default function HeaderTableFurtaSinProcesar(): JSX.Element {
  const header = ["","EF1", "Nombre del predio", "Codigo ICA", "Fecha", "Kilos", "Canastillas", "Tipo de fruta", "Calidad", "Observaciones", ""]
  return (
    <thead>
      <tr >
      {header.map(item => (
          <th key={item}>{item}</th>
      ))}
      </tr>
    </thead>
  )
}
