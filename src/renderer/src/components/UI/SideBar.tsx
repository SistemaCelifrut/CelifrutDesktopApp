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
      className={`${props.theme === 'Dark' ? 'bg-primary shadow-white' : 'bg-white shadow-lg'}`}
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
              <hr />
              Inventario
              <hr />
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
        </ul>
      </div>
    </aside>
  )
}
