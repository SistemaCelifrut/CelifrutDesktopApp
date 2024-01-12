/* eslint-disable prettier/prettier */
export const obtenerDiasSemana = (data: string): number[] => {
  // Dividir la cadena de entrada en año y semana
  const parts = data.split('-W')
  const year = Number(parts[0])
  const week = Number(parts[1])

  // Crear una fecha a partir del año y la semana
  const date = new Date(year, 0, 1 + (week - 1) * 7)

  // Ajustar al lunes de la semana
  const day = date.getDay()
  if (day <= 4) date.setDate(date.getDate() - date.getDay() + 1)
  else date.setDate(date.getDate() + 8 - date.getDay())

  // Crear un arreglo para los días de la semana
  const weekDays: number[] = []
  for (let i = 0; i < 7; i++) {
    weekDays.push(
      new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + i)).getDate()
    )
  }
  return weekDays;
}
