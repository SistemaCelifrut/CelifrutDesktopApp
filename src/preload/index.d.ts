import { ElectronAPI } from '@electron-toolkit/preload'
import { descarteType } from '@renderer/components/inventarioDescarte/types/descartes'
import { serverResponse, userType } from '@renderer/types/login'
import { responseIngresarPredio } from '@renderer/types/predios'

export interface Api {
  obtenerTheme: () => Promise<'Dark' | 'Ligth'>
  user: (datos) => Promise<serverResponse>
  obtenerSesion: () => Promise<userType>
  proceso: (datos) => Promise<serverResponse>
  imprimirRotulos: (datos) => Promise<void>

  ingresoFruta: (data) => Promise<responseIngresarPredio[]>
  inventario: (data) => Promise<any>
  descartes: (channel: string, callback: DescartesCallback) => void
  contenedores: (data) => Promise<any>
  calidad: (data) => Promise<any>
  listaEmpaqueInfo: (data, callback) => any
  proveedores: (data) => Promise<any>
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
