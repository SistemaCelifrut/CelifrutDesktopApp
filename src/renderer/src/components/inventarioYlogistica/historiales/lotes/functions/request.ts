/* eslint-disable prettier/prettier */

import { filtrotype } from "./filtroProceso";

export const requestProveedor = {
  action: 'getProveedores',

};

export const requestLotes = (filtro: filtrotype): object => {
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
