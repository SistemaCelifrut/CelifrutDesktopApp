/* eslint-disable prettier/prettier */
import { contenedoresType } from '@renderer/types/contenedoresType'
import "@renderer/css/components.css"

type propsType = {
  contenedores: contenedoresType[]
  handleChange: (e) => void
}

export default function NavBarListaEmpaque(props: propsType): JSX.Element {

  return (
    <div className='navBar'>
      <select onChange={props.handleChange}>
        <option>Contenedores</option>
        {props.contenedores.length > 0 && props.contenedores.map((item) => (
          <option key={item._id} value={item._id}>
            {item.numeroContenedor} - 
            {item.infoContenedor && item.infoContenedor.clienteInfo ? item.infoContenedor.clienteInfo.CLIENTE : 'Nombre no disponible'}
          </option>
        ))}
      </select>
    </div>
  )
}
