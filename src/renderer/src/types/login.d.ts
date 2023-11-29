export type sendLogInType = {
    user:string
    password:string
}

export type responseLoginType = {
    status:number
    data:userType
}

interface userType {
    user:string
    permisos:string[]
}