import { AreaSchema } from '../types/controlPlagas'
import { nombreAcciones, nombreCampo, nombreObservaciones } from '../functions/llavesControlDePlagas'

type propsType = {
  campo: string
  item: AreaSchema
}

export default function ColumnasControlPlagas(props: propsType) {
  if (props.campo === 'nombreCampo') {
    const components = Object.entries(props.item).map(([key, value]) => {
      if (
        key !== 'responsable' &&
        key !== 'fecha' &&
        key !== '_id' &&
        key !== '__v' &&
        !key.includes('observaciones') &&
        value !== ''
      ) {
        const nombreMostrado = nombreCampo[key] || key // Usa el nombre deseado si está definido en nombreCampo
        return (
          <p key={key} className="border-2 border-slate-400 rounded-md p-1">
            {nombreMostrado}: {value ? 'Si' : 'No'}
          </p>
        )
      }
      return null
    })

    return <>{components}</>; // Retorna los componentes directamente
  }
  else if (props.campo === 'nombreObservacion') {
    const components =  Object.entries(props.item).map(([key, value]) => {
        if (
          key !== 'responsable' &&
          key !== 'fecha' &&
          key.includes('observaciones') &&
          !key.includes('accion') &&
          value !== ''
        ) {
          const nombreMostrado = nombreObservaciones[key] || key // Usa el nombre deseado si está definido en nombreObservaciones
          return (
            <p key={key}>
              {nombreMostrado}: {value}
            </p>
          )
        }
        return null
      })
    

    return <>{components}</>; // Retorna los componentes directamente
  }
  else if (props.campo === 'nombreAcciones') {
  
    const components = Object.entries(props.item).map(([key, value]) => {
      if (
        key !== 'responsable' &&
        key !== 'fecha' &&
        key.includes('accion') &&
        value !== ''
      ) {
        const nombreMostrado = nombreAcciones[key] || key // Usa el nombre deseado si está definido en nombreAcciones
        return (
          <p key={key}>
            {nombreMostrado}: {value}
          </p>
        )
      }
      return null
    })
      
    

    return <>{components}</>; // Retorna los componentes directamente
  }

  return null; // Retorna null si props.campo no es igual a 'nombreCampo'
}
