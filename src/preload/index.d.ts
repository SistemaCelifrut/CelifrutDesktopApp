import { ElectronAPI } from '@electron-toolkit/preload'
import { responseLoginType, sendLogInType, userType } from '@renderer/types/login';
import { responseIngresarPredio } from '@renderer/types/predios';
import { ipcRenderer } from 'electron';

export interface Api {
  obtenerTheme:() => Promise<'Dark' | 'Ligth'>
  logIn:(datos: sendLogInType) => Promise<responseLoginType>
  obtenerSesion:() => Promise<userType>
  ingresoFruta: (data:any) => Promise<responseIngresarPredio[]>
  inventario: (data:any) => Promise<any>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
