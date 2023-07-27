const { validateToken } = require('../JWT');
const Cita = require('../controllers/cita.controller');

//ruta base empleado
const ruta = '/api/cita';

module.exports = (router)=> {
    router.post(ruta+'/', validateToken, Cita.crearCita);
    router.post(ruta+'/reserva', validateToken, Cita.reservarCita);
    router.get(ruta+'/', validateToken, Cita.obtenerCitas);
    router.get(ruta+'/resena', validateToken, Cita.obtenerResenas);
}