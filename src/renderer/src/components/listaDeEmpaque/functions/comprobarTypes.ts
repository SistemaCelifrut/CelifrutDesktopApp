/* eslint-disable prettier/prettier */

import { rendimientoType, serverResponse } from "../types/types"

export function isServerResponse(obj): obj is serverResponse<rendimientoType[]> {
  console.log(obj)
  return obj && typeof obj === 'object' && 'status' in obj && 'data' in obj
}
