import { ContenedoresObj } from "../types/types"

export  const initialContenedor: ContenedoresObj = {
    pallets: [],
    infoContenedor: {
      cerrado: false,
      desverdizado: false,
      fechaCreacion: '',
      nombreCliente: '',
      observaciones: '',
      tipoEmpaque: 'Caja',
      tipoFruta: '',
      pesoCaja: {
        'B-30': 0,
        'B-37': 0,
        'B-40': 0,
        'G-4_5': 0,
        'G-30': 0,
        'G-37': 0,
        'G-40': 0,
        Rojo: 0,
      },
    },
    __v: 0,
    _id: 0,
  }