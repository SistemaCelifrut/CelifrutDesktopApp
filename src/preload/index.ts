/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
const { ipcRenderer } = require('electron')

// Custom APIs for renderer
const api = {
  obtenerTheme: async (): Promise<'Dark' | 'Light'> => {
    const response = await ipcRenderer.invoke('obtenerTheme')
    return response
  },
  user: async (datos): Promise<unknown> => {
    const response = await ipcRenderer.invoke('user', datos)
    return response
  },
  server: async (datos) => {
    const response = await ipcRenderer.invoke('server', datos)
    return response
  },
  serverEmit: (channel, callback) => {
    ipcRenderer.on(channel, (event, ...args) => {
      event.preventDefault
      return callback(...args)
    })
  },

}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
