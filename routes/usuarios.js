
import { Router } from "express";
import { check } from "express-validator";



import { usuariosDelete, usuariosGet, usuariosPost, usuariosPut } from "../controllers/usuarios.js";
import { esRoleValido, existeEmail, existeUsuarioPorId } from "../helpers/dbValidators.js";
import { validarCampos } from "../middlewares/validarCampos.js";




const router = Router();



router.get("/", usuariosGet)

router.post("/", [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),//no tiene que estar vacio
    check("password", "El password es obligatorio").not().isEmpty(),
    check("password", "El password debe ser más de 6 letras").isLength({ min: 6 }),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(existeEmail),
    check("rol").custom(esRoleValido),
    validarCampos
], usuariosPost)


router.put("/:id", [
    check("id", "No es un Id Válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("correo", "El correo no es valido").isEmail(),
    check("password", "El password debe ser más de 6 letras").isLength({ min: 6 }),
    check("rol").custom(esRoleValido),
    validarCampos
], usuariosPut)



router.delete("/:id",[
    check("id", "No es un Id Válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos
],
 usuariosDelete)




export {
    router
}



