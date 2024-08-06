/* eslint-disable prettier/prettier */
export type cargoType = {
    Cargo: string;
    _id:string;
    createdAt: string;
    "Inventario y Logística": {
      Ingresos: {
        "Ingreso de fruta": {
          titulo: string;
          permisos: {
            "Obtener EF1": string;
            "Obtener Proveedores": string;
            "Guardar Lote": string;
          };
        };
      };
      Inventarios: {
        "Fruta sin procesar": {
          titulo: string;
          permisos: {
            "Obtener inventario": string;
            "Directo nacional": string;
            "Enviar a desverdizar": string;
          };
        };
        "Fruta desverdizando": {
          titulo: string;
          permisos: {
            "Ingresar parametros": string;
            "Finalizar desverdizado": string;
          };
        };
        "Orden de vaceo": {
          titulo: string;
          permisos: {
            "Ver Inventario": string;
            "Ver orden de vaceo": string;
            "Vacear lote": string;
            "Modificar orden de vaceo": string;
          };
        };
        "Reproceso descarte": {
          titulo: string;
          permisos: {
            "Ver inventario": string;
            "Reprocesar Predio": string;
            "Reprocesar varios predios": string;
            "Despachar fruta": string;
          };
        };
      };
      Historiales: {
        "Fruta procesada": {
          titulo: string;
          permisos: {
            "Ver lotes procesados": string;
            "Modificar lotes procesados": string;
          };
        };
        "Directo Nacional": {
          titulo: string;
          permisos: {
            "Ver lotes enviados como directo nacional": string;
            "Modificar historial directo nacional": string;
          };
        };
        Lotes: {
          titulo: string;
          permisos: {
            "Ver Lotes": string;
          };
        };
        "Ingreso fruta": {
          titulo: string;
          permisos: {
            "Ver historial": string;
            "Modificar ingreso fruta": string;
          };
        };
      };
    };
    Calidad: {
      Ingresos: {
        "Calidad interna": {
          titulo: string;
          permisos: {
            "Ver predios calidad interna": string;
            "Ingresar Calidad interna": string;
          };
        };
        "Clasificacion descarte": {
          titulo: string;
          permisos: {
            "Ver predios clasificación descarte": string;
            "Ingresar clasificación descarte": string;
          };
        };
      };
      Historiales: {
        "Calidad interna": {
          titulo: string;
          permisos: {
            "Ver historial calidad interna": string;
            "Modificar calidad interna": string;
          };
        };
        "Clasificación descarte": {
          titulo: string;
          permisos: {
            "Ver historial clasificacion descarte": string;
            "Modificar clasificación descarte": string;
          };
        };
      };
      Informes: {
        "Informe proveedor": {
          titulo: string;
          permisos: {
            "Ver lotes": string;
            "Obtener fotos calidad": string;
            "Se obtienen las observaciones de calidad": string;
          };
        };
      };
    };
    Sistema: {
      Proceso: {
        "Habilitar predios proceso": {
          titulo: string;
          permisos: {
            "Ver lotes vaciado": string;
            "Habilitar predio en descartes": string;
          };
        };
      };
    };
    Indicadores: {
      Operaciones: {
        "Eficiencia de la fruta": {
          titulo: string;
          permisos: {
            "Ver indicador Eficiencia de la fruta": string;
          };
        };
      };
    };
    Proceso: {
      Aplicaciones: {
        "Fotos calidad": {
          titulo: string;
          permisos: {
            "Ingresar foto calidad": string;
          };
        };
        "Descarte Lavado": {
          titulo: string;
          permisos: {
            "Ver predio procesando": string;
            "Ingresar descarte lavado": string;
          };
        };
        "Descarte Encerado": {
          titulo: string;
          permisos: {
            "Ver predio procesando": string;
            "Ingresar descarte encerado": string;
          };
        };
        "Lista de empaque": {
          titulo: string;
          permisos: {
            "Ver predio procesando": string;
            "Ver contenedores": string;
            "Configurar pallet": string;
            "Agregar cajas": string;
            "Eliminar cajas": string;
            "Restar cajas": string;
            "mover cajas": string;
            "Agregar cajas sin pallet": string;
            "Ver cajas sin pallet": string;
            "Eliminar cajas sin pallet": string;
            "Liberar pallet": string;
            "Cerrar contenedor": string;
            "Modificar cajas": string;
          };
        };
      };
      Historiales: {
        "Descarte lavado": {
          titulo: string;
          permisos: {
            "Ver historial": string;
          };
        };
        "Descarte Encerado": {
          titulo: string;
          permisos: {
            "Ver historial": string;
          };
        };
        "Fotos calidad": {
          titulo: string;
          permisos: {
            "Ver historial": string;
          };
        };
      };
    };
    Comercial: {
      Proveedore: {
        Proveedores: {
          titulo: string;
          permisos: {
            "Ver proveedores": string;
            "Modificar proveedor": string;
            "Agregar proveedor": string;
          };
        };
      };
      "Precios proveedor": {
        Limon: {
          titulo: string;
          permisos: {
            "Ingresar precio": string;
          };
        };
        Naranja: {
          titulo: string;
          permisos: {
            "Ingresar precio": string;
          };
        };
      };
      Ingresos: {
        "Crear contenedor": {
          titulo: string;
          permisos: {
            "Vere clientes": string;
            "Crear contenedor": string;
          };
        };
      };
      Clientes: {
        Clientes: {
          titulo: string;
          permisos: {
            "Ver clientes": string;
          };
        };
      };
    };
  };