/* eslint-disable prettier/prettier */
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly SERVER_KEY: string
    // más variables de entorno...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  