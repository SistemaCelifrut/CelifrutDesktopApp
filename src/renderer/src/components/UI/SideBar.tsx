import { themeType } from '@renderer/env'
import { userType } from '@renderer/types/login'

type propsType = {
  theme: themeType
  user: userType
  seleccionWindow: (data: string) => void
}

export default function SideBar(props: propsType) {
  return (
    <aside
      className={`${props.theme === 'Dark' ? 'bg-primary shadow-white' : 'bg-white shadow-lg'} text-sm`}
    >
      <div className="mx-auto px-2 py-2 flex justify-between items-center h-max">
        <ul className="m-1">
          {props.user.permisos.includes('Ingreso de fruta') && (
            <li className="mb-2">
              <div>
                <button
                  className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}
                  onClick={() => props.seleccionWindow('Ingreso de fruta')}
                >
                  Ingreso de fruta
                </button>
              </div>
            </li>
          )}
          {props.user.permisos.includes('Fruta sin procesar') && (
            <li className="mb-2">
              <div>
                <button
                  className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}
                  onClick={() => props.seleccionWindow('Fruta sin procesar')}
                >
                  Fruta sin procesar
                </button>
              </div>
            </li>
          )}
             {props.user.permisos.includes('Descarte') && (
            <li className="mb-2">
              <div>
                <button
                  className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}
                  onClick={() => props.seleccionWindow('Descarte')}
                >
                  Descarte
                </button>
              </div>
            </li>
          )}
            {props.user.permisos.includes('Desverdizado') && (
            <li className="mb-2">
              <div>
                <button
                  className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}
                  onClick={() => props.seleccionWindow('Desverdizado')}
                >
                  Desverdizado
                </button>
              </div>
            </li>
          )}
           {props.user.permisos.includes('Crear contenedor') && (
            <li className="mb-2">
              <div>
                <button
                  className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}
                  onClick={() => props.seleccionWindow('Crear contenedor')}
                >
                  Crear contenedor
                </button>
              </div>
            </li>
          )}
            {props.user.permisos.includes('Lista de empaque') && (
            <li className="mb-2">
              <div>
                <button
                  className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}
                  onClick={() => props.seleccionWindow('Lista de empaque')}
                >
                  Lista de empaque
                </button>
              </div>
            </li>
          )}
               {props.user.permisos.includes('Calidad interna') && (
            <li className="mb-2">
              <div>
                <button
                  className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}
                  onClick={() => props.seleccionWindow('Calidad interna')}
                >
                  Calidad interna
                </button>
              </div>
            </li>
          )}
                  {props.user.permisos.includes('Clasificacion calidad') && (
            <li className="mb-2">
              <div>
                <button
                  className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}
                  onClick={() => props.seleccionWindow('Clasificacion calidad')}
                >
                  Clasificacion calidad
                </button>
              </div>
            </li>
          )}
        </ul>
      </div>
    </aside>
  )
}
