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
  inventario: (data) => Promise<unknown>
  descartes: (channel: string, callback: DescartesCallback) => void
  contenedores: (data) => Promise<unknown>
  calidad: (data) => Promise<unknown>
  listaEmpaqueInfo: (data, callback) => unknown
  proveedores: (data) => Promise<unknown>
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
