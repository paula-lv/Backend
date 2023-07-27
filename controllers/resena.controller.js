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

        let empresa = await Empresa.findOne( { cif: req.query.cif } );
        let usuarios = new Array();
        const resenas = await Resena.find( {idEmpresa: empresa._id} );

        for(let i = 0; i < resenas.length; i++) {
            usuarios.push((await Usuario.findById(resenas[i].idUsuario)).name);
        }

        res.send([resenas, usuarios]);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}

exports.obtenerResenasUsuario = async(req, res) => {
    try {
        
        let usuario = await Usuario.findOne( { email: req.query.email } );
        const resenas = await Resena.find( {idUsuarip: usuario._id} );

        res.json(resenas);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}