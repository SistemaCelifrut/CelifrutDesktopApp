export type AreaSchema = {
    area_control_puertas?: boolean,
    area_control_ventanas_observaciones?: string,
    area_control_accion_rejillas_observaciones?: string,
    area_control_accion_areasLimpias_observaciones?: string,
    area_control_areasLimpias_observaciones?: string,
    area_control_espacios_observaciones?: string,
    area_control_accion_ventanas_observaciones?: string,
    area_control_puertas_observaciones?: string,
    area_control_estado_observaciones?: string,
    area_control_mallas?: boolean,
    area_control_accion_contenedores_observaciones?: string,
    responsable?: string,
    fecha: string,
  
    // Propiedades del área de cebo
    area_cebo_accion_consumo_observaciones?: string,
    area_cebo_consumo_observaciones?: string,
    area_cebo_consumo?: boolean,
  
    // Propiedades del área de hallazgos
    area_hallazgos_accion_huellas_observaciones?: string,
    area_hallazgos_accion_manchas_observaciones?: string,
    area_hallazgos_insectos?: boolean,
    area_hallazgos_insectos_observaciones?: string,
    area_hallazgos_accion_olores_observaciones?: string,
    area_hallazgos_accion_cucarachas_observaciones?: string,
    area_hallazgos_olores_observaciones?: string,
    area_hallazgos_hormigas?: boolean,
    area_hallazgos_accion_madrigueras_observaciones?: string,
    area_hallazgos_accion_excremento_observaciones?: string,
    area_hallazgos_otras?: boolean,
    area_hallazgos_cucarachas?: boolean,
    area_hallazgos_accion_otras_observaciones?: string,
    area_hallazgos_huellas_observaciones?: string,
    area_hallazgos_sonidos?: boolean,
    area_hallazgos_manchas?: boolean,
    area_hallazgos_madrigueras_observaciones?: string,
    area_hallazgos_hormigas_observaciones?: string,
    area_hallazgos_madrigueras?: boolean,
    area_hallazgos_accion_sonidos_observaciones?: string,
    area_hallazgos_manchas_observaciones?: string,
    area_hallazgos_pelos?: boolean,
    area_hallazgos_roedores?: boolean,
    area_hallazgos_excremento_observaciones?: string,
    area_hallazgos_accion_hormigas_observaciones?: string,
    area_hallazgos_olores?: boolean,
    area_hallazgos_excremento?: boolean,
    area_hallazgos_accion_insectos_observaciones?: string,
    area_hallazgos_pelos_observaciones?: string,
    area_hallazgos_accion_pelos_observaciones?: string,
    area_hallazgos_huellas_observaciones?: string,
    area_hallazgos_accion_roedores_observaciones?: string,
    area_hallazgos_roedores_observaciones?: string,
    area_hallazgos_cucarachas_observaciones?: string,
    area_hallazgos_sonidos_observaciones?: string,

  };
  
  export type serverResponseHigienePersonalType = {
    status: number
    data:AreaSchema[]
}