export type limpiezaDataType = {
  fecha: string
  responsable?: string,
  _id:string
  __v: 0
  //AREA SOCIAL
  area_social_microondas?: string
  area_social_vestieres?: string
  area_social_mesones?: string
  //AREA RECEPCION
  area_recepcion_tanque?: string
  area_recepcion_muelles?: string
  area_recepcion_estibadores?: string
  //AREA LAVAD0
  area_lavado_rodillos?: string
  area_lavado_paredes?: string
  area_lavado_piso?: string
  area_lavado_rodillos_tunel?: string
  area_lavado_equipo?: string
  area_lavado_desbalinadora?: string
  //AREA PROCESO
  area_proceso_rodillos_tunel_2?: string
  area_proceso_modulo_encerado?: string
  area_proceso_rodillos_cera?: string
  area_proceso_rodillos_clasificadora?: string
  area_proceso_bandejas_clasificadora?: string
  area_proceso_pisos?: string
  area_proceso_paredes?: string
  area_proceso_estibadores?: string
  area_proceso_herramientas?: string
  area_proceso_basculas?: string
  //AREA CUARTO INSUMOS
  area_insumos_estanteria?: string
  area_insumos_piso?: string
  area_insumos_paredes?: string
  area_insumos_elementos?: string
  //AREA LABORATIRIO
  area_laboratorio_meson?: string
  area_laboratorio_utensilios?: string
  area_laboratorio_cajon_utensilios?: string
  area_laboratorio_piso?: string
  area_laboratorio_paredes?: string
  //AREA ALMACENAMIENTO CARTON
  area_almacenamiento_pisos?: string
  area_almacenamiento_paredes?: string
  area_almacenamiento_estibadores?: string
  area_almacenamiento_malla?: string
  //AREA sERVICIOS SANITARIOS
  area_sanitarios_sanitarios?: string
  area_sanitarios_lavamanos?: string
  area_sanitarios_recipiente?: string
  area_sanitarios_piso?: string
  area_sanitarios_paredes?: string
  //AREAS COMUNES
  area_comunes_alrededores?: string
  area_comunes_cuarto_residuos?: string
  /////////////////////////////////////////
  //OBS SOCIAL
  area_social_mesones_observaciones?: string
  area_social_microondas_observaciones?: string
  area_social_vestieres_observaciones?: string
  //OBS RECEPCION
  area_recepcion_tanque_observaciones?: string
  area_recepcion_muelles_observaciones?: string
  area_recepcion_estibadores_observaciones?: string
  //OBS LAVADO
  area_lavado_rodillos_observaciones?: string
  area_lavado_paredes_observaciones?: string
  area_lavado_piso_observaciones?: string
  area_lavado_rodillos_tunel_observaciones?: string
  area_lavado_equipo_observaciones?: string
  area_lavado_desbalinadora_observaciones?: string
  //OBS AREA PROCESO
  area_proceso_rodillos_tunel_2_observaciones?: string
  area_proceso_modulo_encerado_observaciones?: string
  area_proceso_rodillos_cera_observaciones?: string
  area_proceso_rodillos_clasificadora_observaciones?: string
  area_proceso_bandejas_clasificadora_observaciones?: string
  area_proceso_pisos_observaciones?: string
  area_proceso_paredes_observaciones?: string
  area_proceso_estibadores_observaciones?: string

  //OBS AREA PROCESO
  area_proceso_herramientas_observaciones?: string
  area_proceso_basculas_observaciones?: string
  //OBS AREA INSUMOS
  area_insumos_estanteria_observaciones?: string
  area_insumos_piso_observaciones?: string
  area_insumos_paredes_observaciones?: string
  area_insumos_elementos_observaciones?: string
  //OBS AREA LABORATORIOS
  area_laboratorio_meson_observaciones?: string
  area_laboratorio_utensilios_observaciones?: string
  area_laboratorio_cajon_utensilios_observaciones?: string
  area_laboratorio_piso_observaciones?: string
  area_laboratorio_paredes_observaciones?: string
  //OBS AREA ALMACENAMIENTO CARTON
  area_almacenamiento_pisos_observaciones?: string
  area_almacenamiento_paredes_observaciones?: string
  area_almacenamiento_estibadores_observaciones?: string
  area_almacenamiento_malla_observaciones?: string
  //OBS AREA SANITARIOS
  area_sanitarios_sanitarios_observaciones?: string
  area_sanitarios_lavamanos_observaciones?: string
  area_sanitarios_recipiente_observaciones?: string
  area_sanitarios_piso_observaciones?: string
  area_sanitarios_paredes_observaciones?: string
  //AREAS COMUNES
  area_comunes_alrededores_observaciones?: string
  area_comunes_cuarto_residuos_observaciones?: string
}

export type serverResponseLimpieza = {
    status: number
    data: limpiezaDataType[]
}