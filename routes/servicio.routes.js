const { validateToken } = require('../JWT');
const Servicio = require('../controllers/servicio.controller');

//ruta base empleado
const ruta = '/api/servicio';

module.exports = (router)=> {
    router.post(ruta+'/', validateToken, Servicio.crearServicio);
    router.get(ruta+'/', validateToken, Servicio.obtenerServicios);
}