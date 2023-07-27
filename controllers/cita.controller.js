const Cita = require('../models/cita.model')
const Servicio = require('../models/servicio.model')
const Empresa = require('../models/empresa.model')
const Empleado = require('../models/empleado.model')
const Usuario = require('../auth/auth.dao')

exports.crearCita = async(req, res) => {
    try {
        let newCita;

        newCita = new Cita({
            idEmpresa: req.body.idEmpresa,
            idServicio: req.body.idServicio,
            idEmpleado: req.body.idEmpleado,
            idUsuario: req.body.idUsuario,
            fecha_desde: req.body.fecha_desde,
            fecha_hasta: req.body.fecha_hasta,
            estado: req.body.estado,
            valoracion: req.body.valoracion || '',
            mensaje: req.body.mensaje || '',

        });
    
        await newCita.save();
        res.send(newCita)

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error creando la cita')
    }
}

exports.obtenerCitas = async(req, res) => {   // espera query proximas, valoradas
    try {
        let citas;
        let usuario = await Usuario.findOne( { email: req.query.email } );
        //let empresas = new Array();
        //let usuarios = new Array();
        //let servicios = new Array();
        //let empleados = new Array();
        
        let respuesta = new Array();

        if(usuario.tipo == 0) {   //Si se piden las citas de un usuario normal
            if(req.query.proximas == 'true')  //Si se quieren las de los próximos 7 días
                citas = await Cita.find({ idUsuario: usuario._id, fecha_desde: { $gt: new Date() }, fecha_hasta: { $lt : new Date().getTime() + (86400000 * 7) } }).sort( { fecha_desde: 1 } );

            else if(req.query.valoradas == 'true')
                citas = await Cita.find({ idUsuario: usuario._id, fecha_hasta: { $lt : new Date() }, estado: "valorada" }).sort( { fecha_desde: 1 } );

            else if(req.query.proximas == 'false' && req.query.valoradas == 'false')//Si se quieren todas
                citas = await Cita.find({ idUsuario: usuario._id }).sort( { fecha_desde: 1 } );

            for(let i = 0; i < citas.length; i++) {
                //empresas.push((await Empresa.findById(citas[i].idEmpresa)).nombre);
                //servicios.push((await Servicio.findById(citas[i].idServicio)).nombre);
                //empleados.push((await Empleado.findById(citas[i].idEmpleado)).nombre);
                let empresa = await Empresa.findById(citas[i].idEmpresa);
                let cita = {
                    empresa: empresa.nombre,
                    direccion: empresa.direccion,
                    poblacion: empresa.pobl,
                    provincia: empresa.prov,
                    telefono: empresa.telefono,
                    cliente: usuario.name,
                    empleado: (await Empleado.findById(citas[i].idEmpleado)).nombre,
                    servicio: (await Servicio.findById(citas[i].idServicio)).nombre,
                    fecha_desde: citas[i].fecha_desde,
                    fecha_hasta: citas[i].fecha_hasta,
                    estado: citas[i].estado,
                    valoracion: citas[i].valoracion,
                    mensaje: citas[i].mensaje
                }

                respuesta.push(cita);
            }
            //res.send([citas, empresas, servicios, empleados]);
        }

        else if(usuario.tipo == 1) {   //Si se piden las citas de una empresa

            if(req.query.valoradas)
                citas = await Cita.find({ idEmpresa: usuario.idEmpresa, fecha_hasta: { $lt : new Date() }, estado: "valorada" }).sort( { fecha_desde: 1 } );
            else
                citas = await Cita.find({ idEmpresa: usuario.idEmpresa }).sort( { fecha_desde: 1 } );

            let empresa = await Empresa.findById(usuario.idEmpresa).sort( { fecha_desde: 1 } );

            for(let i = 0; i < citas.length; i++) {
                //usuarios.push((await Usuario.findById(citas[i].idUsuario)).name);
                //servicio.push((await Servicio.findById(citas[i].idServicio)).nombre);
                //empleados.push((await Empleado.findById(citas[i].idEmpleado)).nombre);
                let cita = {
                    empresa: empresa.nombre,
                    direccion: empresa.direccion,
                    poblacion: empresa.pobl,
                    provincia: empresa.prov,
                    telefono: empresa.telefono,
                    cliente: (await Usuario.findById(citas[i].idUsuario)).name,
                    empleado: (await Empleado.findById(citas[i].idEmpleado)).nombre,
                    servicio: (await Servicio.findById(citas[i].idServicio)).nombre,
                    fecha_desde: citas[i].fecha_desde,
                    fecha_hasta: citas[i].fecha_hasta,
                    estado: citas[i].estado,
                    valoracion: citas[i].valoracion,
                    mensaje: citas[i].mensaje
                }

                respuesta.push(cita);
            }
            //res.send([citas, usuarios, servicios, empleados]);
        }

        res.json(respuesta);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error obteniendo las citas')
    }
}

exports.obtenerCitasSinValorar = async(req, res) => {   //Los estados son: pendiente, sinValorar, valorada

    let usuario = await Usuario.findOne( { email: req.query.email } );

    let citas = await Cita.find({ idUsuario: usuario._id, estado: "sinValorar" }).sort( { fecha_desde: 1 } );

    res.json(citas);


}

exports.reservarCita = async(req, res) => {
    try {

        let usuario = await Usuario.findOne({email: req.body.usuario});
        usuario = usuario.id;
        let cita = await Cita.findById(req.body.cita.idCita);

        if(!cita)
            res.status(404).json({msg : 'No existe la cita'});
        if(!usuario)
            res.status(404).json({msg : 'No existe el usuario'});

        cita = await Cita.findOneAndUpdate({ _id: req.body.cita.idCita }, {estado: 'pendiente', idUsuario: usuario}, { new: true});
        res.json(cita);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error actualizando cita')
    }
}

exports.actualizarCita = async(req, res) => {
    try {

        const { idServicio, idEmpleado, fecha, estado, valoracion, mensaje } = req.body;
        let cita = await Cita.findById(req.params.id);

        if(!cita)
            res.status(404).json({msg : 'No existe la cita'});

            idServicio = idServicio;
            idEmpleado = idEmpleado;
            fecha_desde = fecha_desde;
            fecha_hasta = fecha_hasta;
            estado = estado;
            valoracion = valoracion;
            mensaje = mensaje;

        cita = await Cita.findOneAndUpdate({ _id: req.params.id }, cita, { new: true});
        res.json(cita);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error actualizando cita')
    }
}

exports.obtenerCita = async(req, res) => {
    try {
        let cita = await Cita.findById(req.params.id);

        if(!cita)
            res.status(404).json({msg : 'No existe la cita'});

        res.json(cita);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error obteniendo cita')
    }
}

exports.eliminarCita = async(req, res) => {
    try {
        let cita = await Cita.findById(req.params.id);

        if(!cita)
            res.status(404).json({msg : 'No existe la cita'});

        await Cita.findOneAndRemove({ _id: req.params.id });

        res.json({ msg : 'Cita eliminada con éxito'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error eliminando la cita')
    }
}

exports.obtenerResenas = async(req, res) => {
    try {
        let resenas;
        let usuario = await Usuario.findOne( { email: req.query.email } );
        //let empresas = new Array();
        //let usuarios = new Array();
        //let servicios = new Array();
        //let empleados = new Array();
        
        let respuesta = new Array();

        if(usuario.tipo == 0) {   //Si se piden las reseñas de un usuario normal
            resenas = await Cita.find({ idUsuario: usuario._id, estado: "valorada" }).sort( { fecha_desde: 1 } );

            for(let i = 0; i < resenas.length; i++) {
                //empresas.push((await Empresa.findById(citas[i].idEmpresa)).nombre);
                //servicios.push((await Servicio.findById(citas[i].idServicio)).nombre);
                //empleados.push((await Empleado.findById(citas[i].idEmpleado)).nombre);
                let resena = {
                    empresa: (await Empresa.findById(citas[i].idEmpresa)).nombre,
                    cliente: usuario.name,
                    empleado: (await Empleado.findById(citas[i].idEmpleado)).nombre,
                    servicio: (await Servicio.findById(citas[i].idServicio)).nombre,
                    fecha_desde: citas[i].fecha_desde,
                    fecha_hasta: citas[i].fecha_hasta,
                    estado: citas[i].estado,
                    valoracion: citas[i].valoracion,
                    mensaje: citas[i].mensaje
                }

                respuesta.push(resena);
            }
            //res.send([citas, empresas, servicios, empleados]);
        }

        else if(usuario.tipo == 1) {   //Si se piden las reseñas de una empresa

            citas = await Cita.find({ idEmpresa: usuario.idEmpresa, estado: "valorada" }).sort( { fecha_desde: 1 } );
            let empresa = await Empresa.findById(usuario.idEmpresa);

            for(let i = 0; i < citas.length; i++) {
                //usuarios.push((await Usuario.findById(citas[i].idUsuario)).name);
                //servicio.push((await Servicio.findById(citas[i].idServicio)).nombre);
                //empleados.push((await Empleado.findById(citas[i].idEmpleado)).nombre);
                let cita = {
                    empresa: empresa.nombre,
                    cliente: (await Usuario.findById(citas[i].idUsuario)).name,
                    empleado: (await Empleado.findById(citas[i].idEmpleado)).nombre,
                    servicio: (await Servicio.findById(citas[i].idServicio)).nombre,
                    fecha_desde: citas[i].fecha_desde,
                    fecha_hasta: citas[i].fecha_hasta,
                    estado: citas[i].estado,
                    valoracion: citas[i].valoracion,
                    mensaje: citas[i].mensaje
                }

                respuesta.push(cita);
            }
            //res.send([citas, usuarios, servicios, empleados]);
        }

        res.json(respuesta);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error obteniendo las citas')
    }

}

exports.obtenerResenasPendientes= async(req, res) => {
    try {
        let citas;
        let usuario = await Usuario.findOne( { email: req.query.email } );
        //let empresas = new Array();
        //let usuarios = new Array();
        //let servicios = new Array();
        //let empleados = new Array();
        
        let respuesta = new Array();

        if(usuario.tipo == 0) {   //Si se piden las reseñas de un usuario normal
            resenas = await Cita.find({ idUsuario: usuario._id, estado: "valorada" }).sort( { fecha_desde: 1 } );

            for(let i = 0; i < resenas.length; i++) {
                //empresas.push((await Empresa.findById(citas[i].idEmpresa)).nombre);
                //servicios.push((await Servicio.findById(citas[i].idServicio)).nombre);
                //empleados.push((await Empleado.findById(citas[i].idEmpleado)).nombre);
                let resena = {
                    empresa: (await Empresa.findById(citas[i].idEmpresa)).nombre,
                    cliente: usuario.name,
                    empleado: (await Empleado.findById(citas[i].idEmpleado)).nombre,
                    servicio: (await Servicio.findById(citas[i].idServicio)).nombre,
                    fecha_desde: citas[i].fecha_desde,
                    fecha_hasta: citas[i].fecha_hasta,
                    estado: citas[i].estado,
                    valoracion: citas[i].valoracion,
                    mensaje: citas[i].mensaje
                }

                respuesta.push(resena);
            }
            //res.send([citas, empresas, servicios, empleados]);
        }

        else if(usuario.tipo == 1) {   //Si se piden las reseñas de una empresa

            citas = await Cita.find({ idEmpresa: usuario.idEmpresa, estado: "valorada" }).sort( { fecha_desde: 1 } );
            let empresa = await Empresa.findById(usuario.idEmpresa);

            for(let i = 0; i < citas.length; i++) {
                //usuarios.push((await Usuario.findById(citas[i].idUsuario)).name);
                //servicio.push((await Servicio.findById(citas[i].idServicio)).nombre);
                //empleados.push((await Empleado.findById(citas[i].idEmpleado)).nombre);
                let cita = {
                    empresa: empresa.nombre,
                    cliente: (await Usuario.findById(citas[i].idUsuario)).name,
                    empleado: (await Empleado.findById(citas[i].idEmpleado)).nombre,
                    servicio: (await Servicio.findById(citas[i].idServicio)).nombre,
                    fecha_desde: citas[i].fecha_desde,
                    fecha_hasta: citas[i].fecha_hasta,
                    estado: citas[i].estado,
                    valoracion: citas[i].valoracion,
                    mensaje: citas[i].mensaje
                }

                respuesta.push(cita);
            }
            //res.send([citas, usuarios, servicios, empleados]);
        }

        res.json(respuesta);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error obteniendo las citas')
    }

}
