/* eslint-disable prettier/prettier */
export type serverResponse<T> = { status: number; data: T }

export type registrosType = {
  id: number
  tipo_fruta: string
  unidades_revisadas: number
  numero_defectos: number
  fecha_ingreso: string
  operario: string
  nombre: string
  apellido: string
  id_operario: number
}

export type promedioOperarioType = {
  operario: string
  porcentaje: number
}
