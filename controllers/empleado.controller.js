const Empleado = require('../models/empleado.model')
const bcrypt = require('bcryptjs');

exports.crearEmpleado = async(req, res) => {
    try {
        let newEmpleado;

        newEmpleado = new Empleado({
            idEmpresa: req.body.idEmpresa,
            nombre: req.body.nombre,
            color: req.body.color
        });
    
        await newEmpleado.save();
        res.send(newEmpleado)

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}

exports.obtenerEmpleados = async(req, res) => {
    try {

        const empleados = await Empleado.find();
        res.json(empleados);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}

exports.actualizarEmpleado = async(req, res) => {
    try {

        const { nombre, color } = req.body;
        let empleado = await Empleado.findById(req.params.id);

        if(!empleado)
            res.status(404).json({msg : 'No existe el empleado'});

        empleado.nombre = nombre;
        empleado.color = color;

        empleado = await Empleado.findOneAndUpdate({ _id: req.params.id }, empleado, { new: true});
        res.json(empleado);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}

exports.obtenerEmpleado = async(req, res) => {
    try {
        let empleado = await Empleado.findById(req.params.id);

        if(!empleado)
            res.status(404).json({msg : 'No existe el empleado'});

        res.json(empleado);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}

exports.eliminarEmpleado = async(req, res) => {
    try {
        let empleado = await Empleado.findById(req.params.id);

        if(!empleado)
            res.status(404).json({msg : 'No existe el empleado'});

        await Empleado.findOneAndRemove({ _id: req.params.id });

        res.json({ msg : 'Empleado eliminado con éxito'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}