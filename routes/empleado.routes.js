const { validateToken } = require('../JWT');
const Empleado = require('../controllers/empleado.controller');

//ruta base empleado
const ruta = '/api/empleado';

module.exports = (router)=> {
    router.post(ruta+'/', validateToken, Empleado.crearEmpleado);
    router.get(ruta+'/', validateToken, Empleado.obtenerEmpleados);
}