/* eslint-disable prettier/prettier */
import { themeContext, userContext } from '@renderer/App'
import { useContext } from 'react'
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

type propsType = {
  seleccionWindow: (data: string) => void
  handleSideBarWidth: () => void
  showSideBar: boolean
}

export default function SideBar(props: propsType): JSX.Element {
  const theme = useContext(themeContext)
  const user = useContext(userContext)
  return (
    <aside
      className={`${theme === 'Dark' ? 'bg-primary shadow-white' : 'bg-white shadow-lg'
        } text-sm h-full relative`}
    >
      <div className="mx-auto px-2 py-2 flex justify-between h-max min-h-screen ml-0">
        {props.showSideBar ?
          <ul className="transition-all ease-in-out duration-500 opacity-100 transform scale-100">
            {user.permisos.sort().map(permiso => (

              <li className={`${theme === 'Dark' ? 'hover:bg-slate-950' : 'hover:bg-slate-200'} p-1`} key={permiso}>
                <div >
                  <button
                    className={`${theme === 'Dark' ? 'text-white' : 'text-black'} hover:underline w-full text-left `}
                    onClick={(): void => props.seleccionWindow(permiso)}
                  >
                    {permiso}
                  </button>
                  <hr></hr>
                </div>
              </li>

            ))}
          </ul> :
          <div className="transition-all ease-in-out duration-500 opacity-0 transform scale-0"></div>
        }
        <button
          onClick={props.handleSideBarWidth}
          className={`border-solid border-2 ${theme === 'Dark' ? 'text-white bg-gray-800 shadow-white' : 'text-black bg-white'}
                            mr-[-16px] text-2xl rounded-full p-1 absolute right-0 top-[250px]`}>
          {props.showSideBar ? <MdKeyboardDoubleArrowLeft /> : <MdOutlineKeyboardDoubleArrowRight />}
        </button>
      </div>
    </aside>
  )
}
