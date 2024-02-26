/* eslint-disable prettier/prettier */
type consultaType = {
    tipoFruta?: string
    "calidad.calidadInterna.fecha"?: {
        $gte?: Date
        $lt?: Date
    }
}

export const crear_filtro = (filtro): consultaType => {
  const consulta: consultaType = {}
  if (filtro.tipoFruta !== '') {
    consulta.tipoFruta = filtro.tipoFruta
  }
  if (filtro.fechaIngreso.$gte !== null  ) {
    consulta["calidad.calidadInterna.fecha"] = {};
    if (filtro.fechaIngreso.$gte !== null) {
      consulta["calidad.calidadInterna.fecha"].$gte = filtro.fechaIngreso.$gte;
      consulta["calidad.calidadInterna.fecha"].$lt = new Date();
    } 
    if (filtro.fechaIngreso.$lt !== null) {
      consulta["calidad.calidadInterna.fecha"].$lt = filtro.fechaIngreso.$lt;
    } else {
      consulta["calidad.calidadInterna.fecha"].$lt = new Date();
    }
  }
  return consulta
}