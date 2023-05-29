const Empresas = require('../controllers/empresa.controller');
module.exports = (router)=> {
    router.post('/empresa', Empresas.crearEmpresa);
}