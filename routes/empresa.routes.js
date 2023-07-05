const { validateToken } = require('../JWT');
const Empresa = require('../controllers/empresa.controller');

//ruta base empresa
const ruta = '/api/empresa';

module.exports = (router)=> {
    router.post(ruta+'/', validateToken, Empresa.crearEmpresa);
    router.get(ruta+'/', validateToken, Empresa.obtenerEmpresas);
    router.get(ruta+'/:id', validateToken, Empresa.actualizarEmpresa);
    router.post(ruta+'/obtener', validateToken, Empresa.obtenerEmpresa);
    router.delete(ruta+'/:id', validateToken, Empresa.eliminarEmpresa);
}