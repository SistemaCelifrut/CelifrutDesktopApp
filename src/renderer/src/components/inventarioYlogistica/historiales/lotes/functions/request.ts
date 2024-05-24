/* eslint-disable prettier/prettier */

import { consultaType } from "./filtroProceso";

type reuqestLotes = {
    data:{
        query:{
            tipoFruta?: string
            fechaIngreso?: {
                $gte?: Date
                $lt?: Date
            }
            rendimiento?: {
                $gte?: number
                $lt?: number
            }
            enf:{
                $regex: string
                $options: string
            }
            
        }
        select: object
        populate:{
            path:string
            select: string
        }
        sort:{fechaIngreso: string | number},
        limit: number,
    }
    collection:'lotes',
    action: 'getLotes',
    query: 'proceso'
}

export const requestProveedor = {
    data:{
      query:{},
    },
    collection:'proveedors',
    action: 'obtenerProveedores',
    query: 'proceso'
  };
  
export const requestLotes = (filtro_request: consultaType, cantidad: number): reuqestLotes => {
    return {
    data:{
      query:{...filtro_request, enf: { $regex: '^E', $options: 'i' }},
      select : {},
      populate:{
        path: 'predio',
        select: 'PREDIO ICA'
      },
      sort:{fechaIngreso: -1},
      limit: cantidad,
    },
    collection:'lotes',
    action: 'getLotes',
    query: 'proceso'
  };
}

export type numeroContenedorType = {
  [key: string]: string
}

export const requestContenedores = (ids):object => {
  return {
   data: {
       query: {_id:{$in:ids} },
       select: {numeroContenedor:1},
       sort: { 'infoContenedor.fechaCreacion': -1 },
       limit: 5000,
       populate: {
         path: 'infoContenedor.clienteInfo',
         select: 'CLIENTE'
       }
     },
     collection: 'contenedores',
     action: 'getContenedores',
     query: 'proceso'
  }
 }
