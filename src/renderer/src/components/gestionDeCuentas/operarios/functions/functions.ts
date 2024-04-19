/* eslint-disable prettier/prettier */
export const initFormState = {
    nombre:'',
    apellido:'',
    cargo:'',
    fechaNacimiento:'',
    genero:'',
    direccion:'',
    telefono:'',
    email:'',
    estado:''
}

export const createRequest = (formState): object => {
    return {
        collection: 'users',
        action: 'addOperario',
        query: 'postgreDB',
        data:{
            nombre:formState.nombre,
            apellido:formState.apellido,
            cargo: formState.cargo,
            fechaNacimiento:formState.fechaNacimiento,
            genero:formState.genero,
            direccion:formState.direccion,
            telefono:formState.telefono,
            email:formState.email,
            estado:formState.estado
        }
    }
}
