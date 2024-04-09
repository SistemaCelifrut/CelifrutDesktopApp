/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
export type userType = {
    usuario_id: string
    usuario: string
    contrasenna: string
    cargo: string
    cargo_id: number
    email?: string
    nombres_permisos: string[]
    permisos_id: number[]
    nombre?: string
    apellido?: string
    genero?: string
    cumpleannos?: string
    add_date:string
    update_date?:string
    estado:string
    direccion?:string
    telefono?:string
}

export type cargosUsuariosType = {
    cargo_id:number
    nombre:string
}

export type permisosUsusariosType = {
    permiso_id: number
    nombre: string
}