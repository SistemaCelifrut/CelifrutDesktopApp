import { ElectronAPI } from '@electron-toolkit/preload'
import { descarteType } from '@renderer/components/inventarioDescarte/types/descartes'
import { responseLoginType, sendLogInType, userType } from '@renderer/types/login'
import { responseIngresarPredio } from '@renderer/types/predios'
import { ipcRenderer } from 'electron'

export interface Api {
  obtenerTheme: () => Promise<'Dark' | 'Ligth'>
  logIn: (datos: sendLogInType) => Promise<responseLoginType>
  obtenerSesion: () => Promise<userType>
  proceso: (datos) => Promise<serverResponse>
  ingresoFruta: (data: any) => Promise<responseIngresarPredio[]>
  inventario: (data: any) => Promise<any>
  descartes: (channel: string, callback: DescartesCallback) => void
  contenedores: (data: any) => Promise<any>
  calidad: (data: any) => Promise<any>
  listaEmpaqueInfo: (data: any, callback: any) => any
  proveedores: (data: any) => Promise<any>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}

export interface DescartesCallback {
  (data: descarteType[]): void
}
