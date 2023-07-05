const Resena = require('../models/resena.model')
const Empresa = require('../models/empresa.model')
const Usuario = require('../auth/auth.dao')

exports.crearResena = async(req, res) => {
    try {
        let newResena;

        let empresa = await Empresa.findOne( { nombre: req.body.nombre } );
        let usuario = await Usuario.findOne( { email: req.body.email } );

        newResena = new Resena({
            idEmpresa: empresa._id,
            idUsuario: usuario._id,
            estrellas: req.body.estrellas,
            mensaje: req.body.mensaje
        });
    
        await newResena.save();
        res.send(newResena)

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}

exports.obtenerResenas = async(req, res) => {
    try {
        let Empresa = await Empresa.findOne( { nombre: req.query.nombre } );

        const resenas = await Resena.find( {idEmpresa: empresa._id} );
        res.json(resenas);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}