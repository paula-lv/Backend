const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'tfgpaula';
const Empresa = require('../models/empresa.model');
const { createTokens, getDatosToken } = require('../JWT.js'); 
const cookieParser = require('cookie-parser');

exports.createUser = async ( req, res )=> {
    let id = '-1';
    if(req.body.tipo == 1) {
        try {
            let newEmpresa;
    
            newEmpresa = new Empresa({
                nombre: req.body.name,
                emailAdmin: req.body.email,
                telefono: req.body.tlf,
                provincia: req.body.prov,
                poblacion: req.body.pobl,
                cif: req.body.cif,
                color: '51d5b8',
                descripcion: 'Descripción de tu empresa',
                logo: '',
                cabecera: 'Cabecera de tu empresa',

            });
            await newEmpresa.save();
            id = newEmpresa._id
    
        } catch (error) {
            console.log(error);
            res.status(500).send('Ha habido un error')
        }
    }

    const newUser = {
        name: req.body.name,
        email: req.body.email, 
        psw: bcrypt.hashSync(req.body.psw),
        tipo: req.body.tipo,
        tlf: req.body.tlf,
        prov: req.body.prov,
        pobl: req.body.pobl,
        idEmpresa: id,
    }

    User.create (newUser, (err, user)=> {
        if(err && err.code == 11000) return res.status(409).send('El email ya existe');
        if (err) return res.status(500).send('Server error');

        const dataUser = {
            name: user.name,
            email: user.email,
        }

        //response
        res.send({ dataUser });
    });
}

exports.loginUser = (req, res, next)=> {
    const userData = {
        email: req.body.email,
        psw: req.body.psw,
    }

    
    User.findOne({email: userData.email}, async (err, user)=> {
        let tipoUsuario;
        let empresa;
        let cif = -1;
        if (err) return res.status(500).send('Server error');
        if (!user) { //no existe el email
            res.status(409).send({message: 'Hubo un error'});
        } else {
            const resultPassword = bcrypt.compareSync(userData.psw, user.psw); //devuelve true si la psw coincide con bd
            if (resultPassword) {

                const accessToken = createTokens(user);

                await res.cookie("access-token", accessToken, {
                    maxAge: 24*60*60*30*1000,
                    sameSite: 'lax',
                    httpOnly: false,
                });
                if(user.tipo == 1) {
                    tipoUsuario = 83648205;
                    empresa = await Empresa.findById(user.idEmpresa);
                    cif = empresa.cif;
                }
                if(user.tipo == 0)
                    tipoUsuario = 93847561;
                await res.cookie("tipo-usuario", tipoUsuario, {
                    maxAge: 24*60*60*30*1000,
                    sameSite: 'lax',
                    httpOnly: false,
                });

                const dataUser = {
                    name: user.name,
                    email: user.email,
                    tipo: user.tipo,
                    idEmpresa: user.idEmpresa,
                    cif: cif
                }

                res.send({dataUser});
            } else {
                //contraseña incorrecta
                res.status(409).send({message: 'Hubo un error'});
            }
        }
    })
}

exports.obtenerUsuario = async(req, res) => {
    try {
        const usuario = await User.findOne({email: req.params.email});
        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).send('No se encuentra el usuario')
    }
}

exports.logOut = (req, res) => {
    req.clearCookie("access-token");
    req.clearCookie("tipo-usuario");
    res.send('Cookies eliminadas');
}
