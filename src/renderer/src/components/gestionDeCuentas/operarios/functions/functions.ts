/* eslint-disable prettier/prettier */
export const initFormState = {
    nombre:'',
    apellido:'',
    fechaNacimiento:'',
    genero:'',
    direccion:'',
    telefono:'',
    email:''
}

export const createRequest = (formState): object => {
    return {
        collection: 'users',
        action: 'addOperario',
        query: 'postgreDB',
        data:{
            nombre:formState.nombre,
            apellido:formState.apellido,
            fechaNacimiento:formState.fechaNacimiento,
            genero:formState.genero,
            direccion:formState.direccion,
            telefono:formState.telefono,
            email:formState.email
        }
    }
}
