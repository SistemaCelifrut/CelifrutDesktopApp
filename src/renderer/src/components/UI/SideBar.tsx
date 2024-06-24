/* eslint-disable prettier/prettier */
import useAppContext from '@renderer/hooks/useAppContext';
import { useEffect, useRef, useState, Fragment } from 'react'
import { FcFolder } from "react-icons/fc";
import { FcOpenedFolder } from "react-icons/fc";
import { FcDepartment } from "react-icons/fc";
import { FcCommandLine } from "react-icons/fc";


type propsType = {
  seleccionWindow: (data: string) => void
  handleSideBarWidth: () => void
  showSideBar: boolean
  setWidthBar: (e:number) => void
}

export default function SideBar(props: propsType): JSX.Element {
  const {theme, user} = useAppContext();
  const isResizingRef = useRef(false)
  const [width, setWidth] = useState<number>(100)
  // const [items, setItems] = useState<string[][]>([]);
  const [areaState, setAreaState] = useState<string[]>([])
  const [elementoState, setElementoState] = useState<string[][]>([])
  const [areaSelect, setAreaSelect] = useState<number[]>([])
  const [elementSelect, setElementSelect] = useState<number[]>([])
  const [permisos, setPermisos] = useState<string[][]>([])
  
  useEffect((): void => {
    const areas: string[] = [];
    const elementos: string[] = [];

    const permisosArr = user.permisos.map(item => {
      const [area, elemento, permiso] = item.split("//")
      areas.push(area);
      elementos.push(area + "//" + elemento)
      return [area, elemento, permiso]
    })
    const areaSet = new Set(areas);
    const elementosSet = new Set(elementos);
    const areaArr = [...areaSet]
    const elementosArr = [...elementosSet]
    const elementoArr2 = elementosArr.map(elementoArr => {
      const [area, elemento] = elementoArr.split("//")
      return [area, elemento]
    })
    setAreaState(areaArr);
    setElementoState(elementoArr2)
    setPermisos(permisosArr)
  }, [user])

  useEffect(() => {
    if (props.showSideBar) {
      setWidth(250)
      props.setWidthBar(250)
    } else {
      setWidth(0)
      props.setWidthBar(0)

    }
  }, [props.showSideBar])


  const handleMouseMove = (e): void => {
    if (isResizingRef) {
      setWidth(e.clientX);
      props.setWidthBar(e.clientX)

    }
  };

  const handleMouseDown = (e): void => {
    if (e.target === e.currentTarget) {
      e.stopPropagation();
      isResizingRef.current = true;
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  const handleMouseUp = (): void => {
    isResizingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
  };

  const handleClickArea = (index): void => {
    if (areaSelect.includes(index)) {
      const indexToRemove = areaSelect.findIndex(item => item === index)
      setAreaSelect(prevState => prevState.filter((_, indexArr) => indexArr !== indexToRemove));
    } else {
      setAreaSelect(prevState => [...prevState, index]);
    }
  }

  const handleClickElement = (index): void => {
    if (elementSelect.includes(index)) {
      const indexToRemove = elementSelect.findIndex(item => item === index)
      setElementSelect(prevState => prevState.filter((_, indexArr) => indexArr !== indexToRemove));
    } else {
      setElementSelect(prevState => [...prevState, index]);
    }
  }


  return (
    <aside
      className={`${theme === 'Dark' ? 'bg-primary border-slate-600' : 'bg-white border-gray-200 '} felx border-solid border-r-2 m-0 
      cursor-col-resize pr-[1px] text-[15px] h-screen max-h-screen pb-[90px]  ${isResizingRef.current ? 'cursor-ew-resize' : 'pointer-events-auto'}`}
      style={{
        width: `${width}px`,
        minWidth: `${width}px`
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="mx-auto flex h-full justify-between overflow-x-hidden overflow-y-auto   min-h-[350px] ml-0  w-full m-0 p-0" onClick={(): null => null}>
        {props.showSideBar ?
          <ul className="transition-all ease-in-out duration-500 opacity-100 transform scale-100 w-full min-w-[200px] m-0 p-0 hover:cursor-default">
            {areaState.map((item, index) => (
              <Fragment key={index}>
                <li className={`hover:cursor-pointer  w-full pl-2 ${theme === 'Dark' ? 'text-white hover:bg-slate-500' : 'text-black hover:bg-slate-200'}`}>
                  <button className='flex flex-row justify-start items-center gap-2' onClick={(): void => handleClickArea(index)}>
                    <div className=' text-sm'>
                      <FcDepartment />
                    </div>
                    {item}
                  </button>
                </li>
                <li>
                  {areaSelect.includes(index) ?
                    <ul className='ml-4'>
                      {elementoState.map((itemElemento, indexElement) => {
                        if (itemElemento[0] === item) {
                          return (
                            <Fragment key={indexElement}>
                              <li key={itemElemento[1] + indexElement} className={`hover:cursor-pointer  w-full pl-2 ${theme === 'Dark' ? 'text-white hover:bg-slate-500' : 'text-black hover:bg-slate-200'}`} >
                                <button className='flex flex-row w-full justify-start items-center gap-2' onClick={(): void => handleClickElement(indexElement)}>
                                  <div className=' text-sm'>
                                    { elementSelect.includes(indexElement) ? <FcOpenedFolder /> : <FcFolder />}
                                  </div>
                                  {itemElemento[1]}
                                </button>
                              </li>
                              <li className='w-full'>
                                {elementSelect.includes(indexElement) ?
                                  <ul className='w-full'>
                                    {permisos.map((permiso, indexPermiso) => {
                                      if ( permiso[1] === itemElemento[1] && permiso[0] === item) {
                                        return (
                                          <Fragment key={indexPermiso}>
                                            <li key={permiso[2] + indexPermiso} className={`hover:cursor-pointer  w-full pl-4 ${theme === 'Dark' ? 'text-white hover:bg-slate-500' : 'text-black hover:bg-slate-200'}`}>
                                              <button className='flex flex-row w-full justify-start items-center gap-2' onClick={(): void => props.seleccionWindow(permiso[0] + "//" + permiso[1] + "//" + permiso[2])}>
                                                <div className=' text-sm'>
                                                   <FcCommandLine /> 
                                                </div>
                                                {permiso[2]}
                                              </button>
                                            </li>
                                          </Fragment>
                                        )
                                      } else {
                                        return null
                                      }
                                    })}
                                  </ul>
                                  :
                                  null
                                }
                              </li>
                            </Fragment>

                          )
                        } else {
                          return null
                        }
                      })}
                    </ul> :
                    null
                  }
                </li>


              </Fragment>
            ))}
          </ul> :
          <div className="transition-all ease-in-out duration-500 opacity-0 transform scale-0"></div>
        }
      </div>
    </aside>
  )
}
