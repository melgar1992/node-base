const {
    Router
} = require('express');
const { check } = require('express-validator');
const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
} = require('../controllers/user');
const { esRolValido, emailExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet);
router.put('/:id', usuariosPut);
router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser de mas de 6 letras').isLength({min: 6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    //check('rol','El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost);
router.delete('/', usuariosDelete);

module.exports = router;