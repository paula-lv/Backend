const cookieParser = require('cookie-parser');
const Empresa = require('../models/empresa.model')
const Servicio = require('../models/servicio.model')
const Cita = require('../models/cita.model')
const Empleado = require('../models/empleado.model')
const Usuario = require('../auth/auth.dao')
const bcrypt = require('bcryptjs');

exports.crearEmpresa = async(req, res) => {
    try {
        let newEmpresa;

        newEmpresa = new Empresa({
            nombre: req.body.nombre,
            emailAdmin: req.bode.email,
            telefono: req.body.telefono,
            direccion: req.body.direccion,
            logo: "",
            color: req.body.color,
            prov: req.body.prov,
            pobl:req.body.pobl,
        });
    
        await newEmpresa.save();
        res.send(newEmpresa)

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}

exports.obtenerEmpresas = async(req, res) => {
    try {       //req.query.servicio
        let citasCoincidentes = new Array();
        let empresasCoincidentes = new Array();
        let servicio;
        let citas;
        if(req.query.todas == 'true') {
            let empresas = await Empresa.find();
            res.json(empresas)
        } else {
            let empresas = await Empresa.find( {pobl: req.query.pobl, prov: req.query.prov });
            console.log(empresas)

            for(let i  = 0; i < empresas.length; i++) {
                if(req.query.servicio == 'Todos') {
                    let fechaDesde = req.query.fechaDesde;
                    let fechaHasta = req.query.fechaHasta;
                    console.log(fechaDesde)
                    console.log(fechaHasta)
                    citas = await Cita.find({ idEmpresa: empresas[i]._id, estado: 'libre', fecha_desde: { $gte:fechaDesde}, fecha_hasta: { $lte: fechaHasta } });
                    if(citas.length != 0) {
                        for (let j = 0; j < citas.length; j++) {
                            let servicio = await Servicio.findById(citas[j].idServicio)
                            let empleado = await Empleado.findById(citas[j].idEmpleado)

                            let cita = {
                                empleado: empleado.nombre,
                                servicio: servicio.nombre,
                                fecha_desde: citas[j].fecha_desde,
                                fecha_hasta: citas[j].fecha_hasta,
                                empresa: empresas[i].id,
                                idCita: citas[j].id
                            }
                            citasCoincidentes.push(cita);
                        }
                        empresasCoincidentes.push(empresas[i]);
                    }
                    
                }
                else {
                    servicio = await Servicio.findOne({ idEmpresa: empresas[i]._id, nombre: req.query.servicio });
                    citas = await Cita.find({ idEmpresa: empresas[i]._id, estado: 'libre', fecha_desde: req.query.fecha, idServicio: servicio._id});
                    if(citas.length != 0) {
                        citasCoincidentes.push(citas);
                        empresasCoincidentes.push(empresas[i]);
                    }
                } 
            }

            res.send([empresasCoincidentes, citasCoincidentes]);
        }
        
        

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}

exports.actualizarEmpresa = async(req, res) => {
    try {

        const { nombre, telefono, direccion, logo, color, prov, probl } = req.body;
        let empresa = await Empresa.findById(req.params.id);

        if(!empresa)
            res.status(404).json({msg : 'No existe la empresa'});

        empresa.nombre = nombre;
        empresa.telefono = telefono;
        empresa.direccion = direccion;
        empresa.logo = logo;
        empresa.color = color;
        empresa.prov = prov;
        empresa.pobl = probl;

        empresa = await Empresa.findOneAndUpdate({ _id: req.params.id }, empresa, { new: true});
        res.json(empresa);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}

exports.obtenerEmpresa = async(req, res) => {
    try {
        let usuario = await Usuario.findOne( { email: req.body.email } );
        let empresa = await Empresa.findOne( { _id: usuario.idEmpresa } );

        if(!empresa)
            res.status(404).json({msg : 'No existe la empresa'});

        res.json(empresa);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}

exports.eliminarEmpresa = async(req, res) => {
    try {
        let empresa = await Empresa.findOne( { email: req.body.email } );

        if(!empresa)
            res.status(404).json({msg : 'No existe la empresa'});

        await Empresa.findOneAndRemove({ email: req.body.email });

        res.json({ msg : 'Empresa eliminada con éxito'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}