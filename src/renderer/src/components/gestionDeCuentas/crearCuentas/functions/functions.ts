/* eslint-disable prettier/prettier */
export const initFormState = {
    usuario:'',
    contrasenna:'',
    cargo:'',
    nombre:'',
    apellido:'',
    genero:'',
    cumpleannos:'',
    direccion:'',
    telefono:'',
    email:'',
    estado:'',



}

export interface formStateType {
    usuario: string;
    contrasenna: string;
    cargo: string;
    nombre: string; // ¿Quizás quisiste decir 'nombre'?
    apellido: string;
    genero: string;
    cumpleannos: string; // ¿Quizás quisiste decir 'cumpleaños'?
    direccion: string;
    telefono: string;
    email: string;
    estado: string;
}

