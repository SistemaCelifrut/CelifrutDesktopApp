/* eslint-disable prettier/prettier */

type propsType = {
  handleFiltro: (tipoFiltro, elemento) => void
  prediosData: string[]
  setEf1: (e) => void
  setFiltroPredio: (e) => void
  setCantidad: (e) => void
}

export default function FiltrosFilas(props: propsType): JSX.Element {

  const handleTipoFruta = (e): void => {
    props.handleFiltro("tipoFruta", e.target.value)
  }
  const handleFechaInicio = (e): void => {
    props.handleFiltro('fechaInicio', e.target.value)
  }
  const handleFechaFin = (e): void => {
    props.handleFiltro('fechaFin', e.target.value)
  }
  const handleMinRendimiento = (e): void => {
    props.handleFiltro('minRendimiento', e.target.value)
  }
  const handleMaxRendimiento = (e): void => {
    props.handleFiltro('maxRendimiento', e.target.value)
  }

  return (
    <div className="filtroContainer">
      <label>
        <p>Tipo de fruta</p>
        <select onChange={handleTipoFruta}>
          <option value="">Tipo de fruta</option>
          <option value="Naranja">Naranja</option>
          <option value="Limon">Limon</option>
        </select>
      </label>
      <label>
        <p>Nombre predio</p>
        <select onChange={(e): void => props.setFiltroPredio(e.target.value)}>
          <option value="">Nombre predios</option>
          {props.prediosData.map((item, index) => (
            <option key={item + index} value={item}>{item}</option>
          ))}
        </select>
      </label>
      <label>
        <p>Codigo de lote</p>
        <input type="text" placeholder="EF1-" onChange={(e): void => props.setEf1(e.target.value)} />
      </label>
      <label>
        <p>Fecha Incio</p>
        <input type="date" onChange={handleFechaInicio} />
      </label>

      <label>
        <p>Feca fin</p>
        <input type="date" onChange={handleFechaFin} />
      </label>


      <label>
        <p>Rendimiento</p>
        <div>
          <input onChange={handleMinRendimiento} type="number" placeholder="min" /> - <input onChange={handleMaxRendimiento} type="number" placeholder="max" />
        </div>
      </label>

      <label>
        <p>Cantidad de datos</p>
        <input onChange={(e): void => props.setCantidad(Number(e.target.value))} type="number" min={0} />
      </label>


    </div>
  )
}
