/* eslint-disable prettier/prettier */
import { themeContext, userContext } from '@renderer/App'

import { useContext } from 'react'

type propsType = {
  seleccionWindow: (data: string) => void
}

export default function SideBar(props: propsType): JSX.Element {
  const theme = useContext(themeContext)
  const user = useContext(userContext)
  return (
    <aside
      className={`${
        theme === 'Dark' ? 'bg-primary shadow-white' : 'bg-white shadow-lg'
      } text-sm`}
    >
      <div className="mx-auto px-2 py-2 flex justify-between items-center h-max ml-0">
        <ul className=" w-full">
          {user.permisos.map(permiso => (
         
              <li className={`${theme === 'Dark' ? 'hover:bg-slate-950' : 'hover:bg-slate-200'} p-1`} key={permiso}>
                <div >
                  <button
                    className={`${theme === 'Dark' ? 'text-white' : 'text-black'} hover:underline w-full text-left `}
                    onClick={(): void => props.seleccionWindow(permiso)}
                  >
                    {permiso}
                  </button>
                </div>
              </li>
            
          ))}
        </ul>
      </div>
    </aside>
  )
}
