/* eslint-disable prettier/prettier */
const startOfDay = new Date();
startOfDay.setHours(0,0,0,0);

const nextDay = new Date(startOfDay);
nextDay.setDate(startOfDay.getDate() + 1);

export const requestLotesVaciados = {
    data:{
        query:{ 
          operacionRealizada: "vaciarLote", fecha: {$gte: startOfDay, $lt: nextDay}
        },
        select : { },
        sort:{fecha: -1},
        limit:50
      },
      collection:'historialLotes',
      action: 'obtenerHistorialLotes',
      query: 'proceso'
}

export const requestHabilitarDescarte = (loteDescarte): object => {
  return {
    data:{
      lote: loteDescarte?.documento,
    },
    collection:'variablesDesktop',
    action: 'modificar_sistema',
    query: 'modificar_predio_proceso_descartes',
  }
}
export const requestHabilitarListaEmpaque = (loteListaEmpaque): object => {
  return {
    data:{
      lote: loteListaEmpaque?.documento,
    },
    collection:'variablesDesktop',
    action: 'modificar_sistema',
    query: 'modificar_predio_proceso_descartes',
  }
}