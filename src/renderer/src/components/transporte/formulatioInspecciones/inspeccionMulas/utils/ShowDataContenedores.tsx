/* eslint-disable prettier/prettier */
import { contenedoresType } from "@renderer/types/contenedoresType"

type propsTypes = {
    contenedorSelect: contenedoresType;
}

export default function ShowDataContenedores(props:propsTypes): JSX.Element {
  return(
    <div className="formulario-inspeccion-mulas-programacion">
        <p><span>Placa:</span> {props.contenedorSelect.formularioInspeccionMula?.placa}</p>
        <p><span>Conductor:</span> {props.contenedorSelect.formularioInspeccionMula?.conductor}</p>
        <p><span>Cedula:</span>{props.contenedorSelect.formularioInspeccionMula?.cedula}</p>
        <p><span>Color:</span> {props.contenedorSelect.formularioInspeccionMula?.color}</p>
        <p><span>Trailer:</span> {props.contenedorSelect.formularioInspeccionMula?.trailer}</p>
    </div>
  )
}
