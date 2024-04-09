/* eslint-disable prettier/prettier */
export const initFormState = {
    usuario:'',
    contrasenna:'',
    cargo:0,
    nombre:'',
    apellido:'',
    genero:'',
    cumpleannos:'',
    direccion:'',
    telefono:'',
    email:'',
    estado:'',
    permisos:[],
    permisos_id:[],

}

export interface formStateType {
    usuario: string;
    contrasenna: string;
    cargo: number;
    nombre: string; // ¿Quizás quisiste decir 'nombre'?
    apellido: string;
    genero: string;
    cumpleannos: string; // ¿Quizás quisiste decir 'cumpleaños'?
    direccion: string;
    telefono: string;
    email: string;
    estado: string;
    permisos: number[]; // Un arreglo de números (puedes ajustar el tipo según tus necesidades)
}

