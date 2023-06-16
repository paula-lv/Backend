const Empresa = require('../controllers/empresa.controller');

//ruta base empresa
const ruta = '/api/empresa';

module.exports = (router)=> {
    router.post(ruta+'/', Empresa.crearEmpresa);
    router.get(ruta+'/', Empresa.obtenerEmpresas);
    router.put(ruta+'/:id', Empresa.actualizarEmpresa);
    router.get(ruta+'/:id', Empresa.obtenerEmpresa);
    router.delete(ruta+'/:id', Empresa.eliminarEmpresa);
}