/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react"
import { filtroCalidadType, filtroColumnasCalidadType } from "../type/types"
import { KEY_FILTRO_COL_CALIDAD, filtrosColumnasObjCalidad } from "../functions/constantes"
import FiltroFilasCalidad from "../utils/FiltrosFilasCalidad"
import TableInfolotesCalidad from "../table/TableInfolotesCalidad"
import PromediosCalidad from "../utils/PromediosCalidad"
import GraficasBarrasCalidad from "../utils/GraficasBarrasCalidad"
import GraficasLinealCalidad from "../utils/GraficaLinealCalidad"
import { crear_filtro } from "../functions/filtroProceso"
import { lotesType } from "@renderer/types/lotesType"

export default function CalidadData(): JSX.Element {
  const [columnVisibility, setColumnVisibility] = useState<filtroColumnasCalidadType>(filtrosColumnasObjCalidad)
  const [filtro, setFiltro] = useState<filtroCalidadType>({ tipoFruta: '', fechaIngreso: { $gte: null, $lt: null }, nombrePredio: '', rendimiento: { $gte: "", $lt: "" }, cantidad: '', tipoDato: {} })
  const [prediosData, setPrediosData] = useState<string[]>([])
  const [ef1, setEf1] = useState<string>('')
  const [data, setData] = useState<lotesType[]>([])
  const [tipoGraficas, setTipoGraficas] = useState<string>('')
  const [filtroPredio, setFiltroPredio] = useState<string>('');
  const [cantidad, setCantidad] = useState<number>(50);
  const [dataOriginal, setDataOriginal] = useState<lotesType[]>([])
  const [ordenar, seteOrdenar] = useState<object>({ "fechaIngreso": -1 })

  useEffect(() => {

    obtenerData()
    window.api.serverEmit('serverEmit', handleServerEmit)
    // Función de limpieza
    return () => {
      window.api.removeServerEmit('serverEmit', handleServerEmit)
    }

  }, [filtro, cantidad])

  useEffect(() => {
    let filteredData = dataOriginal;

    if (ef1 !== '') {
      filteredData = filteredData.filter(item => item.enf && item.enf.startsWith(ef1.toUpperCase()));
    }

    if (filtroPredio !== '') {
      filteredData = filteredData.filter(item => item.predio?.PREDIO && item.predio?.PREDIO.includes(filtroPredio));
    }

    setData(filteredData);
  }, [ef1, filtroPredio])
  const obtenerData = async (): Promise<void> => {
    if (prediosData.length === 0) {
      const requestProveedor = {
        data: {
          query: {},
        },
        collection: 'proveedors',
        action: 'obtenerProveedores',
        query: 'proceso'
      };
      const response = await window.api.server(requestProveedor);
      const nombrePredio = await response.data.map((item) => item.PREDIO)
      setPrediosData(nombrePredio)
    }
    const filtro_request = crear_filtro(filtro);
    const request = {
      data: {
        query: { ...filtro_request, enf: { $regex: '^E', $options: 'i' } },
        select: {},
        populate: {
          path: 'predio',
          select: 'PREDIO ICA'
        },
        sort: ordenar,
        limit: cantidad,
      },
      collection: 'lotes',
      action: 'getLotes',
      query: 'proceso'
    };
    const datosLotes = await window.api.server(request);
    setDataOriginal(datosLotes.data)

    if (ef1 === '') {
      setData(datosLotes.data)
    }
    else if (ef1 !== '') {
      setData(() => datosLotes.data.filter(item => item._id.toLowerCase().includes(ef1.toLowerCase())))
    }
    // const dataGrafica = datosGraficas(datosLotes.data)
    // setDataGrafica(dataGrafica)
  }
  const handleServerEmit = async (data): Promise<void> => {
    if (data.fn === "ingresoLote" || data.fn === "procesoLote") {
      await obtenerData()
    }
  }

  const handleChange = (e): void => {
    setColumnVisibility({
      ...columnVisibility,
      [e.target.value]: e.target.checked,
    });
  }
  const handleFiltro = (filtroCase, elementoFiltro): void => {
    if (filtroCase === 'tipoFruta') {
      setFiltro({ ...filtro, tipoFruta: elementoFiltro })
    }
    else if (filtroCase === 'fechaInicio') {
      if (elementoFiltro === "") {
        const nuevoFiltro: filtroCalidadType = JSON.parse(JSON.stringify(filtro))
        nuevoFiltro.fechaIngreso.$gte = null
        setFiltro(nuevoFiltro)
      }
      else {
        const nuevoFiltro: filtroCalidadType = JSON.parse(JSON.stringify(filtro))
        nuevoFiltro.fechaIngreso.$gte = new Date(elementoFiltro)
        setFiltro(nuevoFiltro)
      }

    }
    else if (filtroCase === 'fechaFin') {
      if (elementoFiltro === "") {
        const nuevoFiltro: filtroCalidadType = JSON.parse(JSON.stringify(filtro))
        nuevoFiltro.fechaIngreso.$lt = new Date();
        setFiltro(nuevoFiltro)
      } else {
        const nuevoFiltro: filtroCalidadType = JSON.parse(JSON.stringify(filtro))
        const fecha = new Date(elementoFiltro)
        fecha.setUTCHours(23);
        fecha.setUTCMinutes(59);
        fecha.setUTCSeconds(59);
        nuevoFiltro.fechaIngreso.$lt = fecha
        setFiltro(nuevoFiltro)
      }
    }
    else if (filtroCase === 'acidezMin') {
      const nuevoFiltro: filtroCalidadType = JSON.parse(JSON.stringify(filtro))
      if (nuevoFiltro.tipoDato.acidez && Object.prototype.hasOwnProperty.call(nuevoFiltro.tipoDato.acidez, "$gte")) {
        nuevoFiltro.tipoDato.acidez.$gte = elementoFiltro
      } else {
        nuevoFiltro.tipoDato = {}
        nuevoFiltro.tipoDato.acidez = { $gte: '', $lt: '' }
        nuevoFiltro.tipoDato.acidez.$gte = elementoFiltro
      }
      setFiltro(nuevoFiltro)
    }
    else if (filtroCase === 'brixMin') {
      const nuevoFiltro: filtroCalidadType = JSON.parse(JSON.stringify(filtro))
      if (nuevoFiltro.tipoDato.brix && Object.prototype.hasOwnProperty.call(nuevoFiltro.tipoDato.brix, "$gte")) {
        nuevoFiltro.tipoDato.brix.$gte = elementoFiltro
      } else {
        nuevoFiltro.tipoDato = {}
        nuevoFiltro.tipoDato.brix = { $gte: '', $lt: '' }
        nuevoFiltro.tipoDato.brix.$gte = elementoFiltro
      }
      setFiltro(nuevoFiltro)
    }
    else if (filtroCase === 'ratioMin') {
      const nuevoFiltro: filtroCalidadType = JSON.parse(JSON.stringify(filtro))
      if (nuevoFiltro.tipoDato.ratio && Object.prototype.hasOwnProperty.call(nuevoFiltro.tipoDato.ratio, "$gte")) {
        nuevoFiltro.tipoDato.ratio.$gte = elementoFiltro
      } else {
        nuevoFiltro.tipoDato = {}
        nuevoFiltro.tipoDato.ratio = { $gte: '', $lt: '' }
        nuevoFiltro.tipoDato.ratio.$gte = elementoFiltro
      }
      setFiltro(nuevoFiltro)
    }
    else if (filtroCase === 'pesoMin') {
      const nuevoFiltro: filtroCalidadType = JSON.parse(JSON.stringify(filtro))
      if (nuevoFiltro.tipoDato.peso && Object.prototype.hasOwnProperty.call(nuevoFiltro.tipoDato.peso, "$gte")) {
        nuevoFiltro.tipoDato.peso.$gte = elementoFiltro
      } else {
        nuevoFiltro.tipoDato = {}
        nuevoFiltro.tipoDato.peso = { $gte: '', $lt: '' }
        nuevoFiltro.tipoDato.peso.$gte = elementoFiltro
      }
      setFiltro(nuevoFiltro)
    }
    else if (filtroCase === 'zumoMin') {
      const nuevoFiltro: filtroCalidadType = JSON.parse(JSON.stringify(filtro))
      if (nuevoFiltro.tipoDato.zumo && Object.prototype.hasOwnProperty.call(nuevoFiltro.tipoDato.zumo, "$gte")) {
        nuevoFiltro.tipoDato.zumo.$gte = elementoFiltro
      } else {
        nuevoFiltro.tipoDato = {}
        nuevoFiltro.tipoDato.zumo = { $gte: '', $lt: '' }
        nuevoFiltro.tipoDato.zumo.$gte = elementoFiltro
      }
      setFiltro(nuevoFiltro)
    }

    else if (filtroCase === 'acidezMax') {
      const nuevoFiltro: filtroCalidadType = JSON.parse(JSON.stringify(filtro))
      if (nuevoFiltro.tipoDato.acidez && Object.prototype.hasOwnProperty.call(nuevoFiltro.tipoDato.acidez, "$lt")) {
        nuevoFiltro.tipoDato.acidez.$lt = elementoFiltro
        setFiltro(nuevoFiltro)
      }
    }
    else if (filtroCase === 'brixMax') {
      const nuevoFiltro: filtroCalidadType = JSON.parse(JSON.stringify(filtro))
      if (nuevoFiltro.tipoDato.brix && Object.prototype.hasOwnProperty.call(nuevoFiltro.tipoDato.brix, "$lt")) {
        nuevoFiltro.tipoDato.brix.$lt = elementoFiltro
        setFiltro(nuevoFiltro)
      }
    }
    else if (filtroCase === 'ratioMax') {
      const nuevoFiltro: filtroCalidadType = JSON.parse(JSON.stringify(filtro))
      if (nuevoFiltro.tipoDato.ratio && Object.prototype.hasOwnProperty.call(nuevoFiltro.tipoDato.ratio, "$lt")) {
        nuevoFiltro.tipoDato.ratio.$lt = elementoFiltro
        setFiltro(nuevoFiltro)
      }
    }
    else if (filtroCase === 'pesoMax') {
      const nuevoFiltro: filtroCalidadType = JSON.parse(JSON.stringify(filtro))
      if (nuevoFiltro.tipoDato.peso && Object.prototype.hasOwnProperty.call(nuevoFiltro.tipoDato.peso, "$lt")) {
        nuevoFiltro.tipoDato.peso.$lt = elementoFiltro
        setFiltro(nuevoFiltro)
      }
    }
    else if (filtroCase === 'zumoMax') {
      const nuevoFiltro: filtroCalidadType = JSON.parse(JSON.stringify(filtro))
      if (nuevoFiltro.tipoDato.zumo && Object.prototype.hasOwnProperty.call(nuevoFiltro.tipoDato.zumo, "$lt")) {
        nuevoFiltro.tipoDato.zumo.$lt = elementoFiltro
        setFiltro(nuevoFiltro)
      }
    }
  }
  return (
    <div className="componentContainer">
      <div><h2>Lotes calidad</h2></div>
      <div className="m-2">
        <div className="filtroContainer">
          <div className="lotes-filtros-columnas-div">
            {Object.keys(columnVisibility).map(item => (
              <label key={item} className="lotes-filtros-columnas-label">
                <input type="checkbox" value={item} onClick={handleChange} />
                <p>{KEY_FILTRO_COL_CALIDAD[item]}</p>
              </label>
            ))}
          </div>
        </div>
        <div>
          <FiltroFilasCalidad
            handleFiltro={handleFiltro}
            prediosData={prediosData}
            setEf1={setEf1}
            seteOrdenar={seteOrdenar}
            setCantidad={setCantidad}
            setFiltroPredio={setFiltroPredio} />
        </div>
      </div>
      <div>
        <PromediosCalidad data={data} columnVisibility={columnVisibility} />
      </div>
      <div className="lotes-select-tipo-grafica-div">
        <select className="defaultSelect" onChange={(e): void => setTipoGraficas(e.target.value)}>
          <option value="">Tipo de gráficas</option>
          <option value="barras">Grafica de barras</option>
          <option value="lineal">Histograma</option>
        </select>
      </div>
      <div className="lotes-grafica-container">
        {tipoGraficas === 'barras' && <GraficasBarrasCalidad data={data} />}
        {tipoGraficas === 'lineal' && <GraficasLinealCalidad data={data} />}

      </div>
      <div>
        <TableInfolotesCalidad data={data} columnVisibility={columnVisibility} />
      </div>
    </div>
  )
}
