/* eslint-disable prettier/prettier */

import { filtroCalidadType, filtrotype } from "./filtroProceso";

export const requestProveedor = {
  action: 'getProveedores',
};

export const requestLotes = (filtro: filtrotype | filtroCalidadType): object => {
  return {
    ...filtro,
    action: 'view_lotes',
  };
}


export type numeroContenedorType = {
  [key: string]: string
}

export const requestContenedores = (ids): object => {
  return {
    data: ids ,
    action: 'getContenedores',
  }
}
