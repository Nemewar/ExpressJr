import { Role } from "../models/role.js"
import { Usuario } from "../models/usuario.js";


const esRoleValido = async (rol = "") => {
    const existeRol = await Role.findOne({ rol: rol })
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la bd`)
    }
}

const existeEmail = async(correo = "") => {
    const existeEmail = await Usuario.findOne({correo:correo})
    if(existeEmail){
        throw new Error(`El correo ${correo} ya existe`)
    }
}

const existeUsuarioPorId = async ( id = "") => {
    const existeID = await Usuario.findById(id); 
    if(!existeID){
        throw new Error(`El id ${id} no existe`)
    }
}




export {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId
}