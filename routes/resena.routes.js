const { validateToken } = require('../JWT');
const Resena = require('../controllers/resena.controller');

//ruta base empleado
const ruta = '/api/resena';

module.exports = (router)=> {
    router.post(ruta+'/', validateToken, Resena.crearResena);
    router.get(ruta+'/', validateToken, Resena.obtenerResenas);
    router.get(ruta+'/resenas', validateToken, Resena.obtenerResenas);
}