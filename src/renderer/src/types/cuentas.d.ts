/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
export type userType = {
    usuario_id: string
    usuario: string
    contrasenna: string
    cargo: string
    email?: string
    permisos: string[]
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