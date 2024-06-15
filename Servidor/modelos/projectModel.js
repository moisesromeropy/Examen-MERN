const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ColeccionProyectos = mongoose.Schema({
    nombreProyecto: {
        type: String,
        required: [true, "El nombre del proyecto es requerido"],
        minlength:[3, "Mínimo de 3 caracteres"],
        unique: true
    },
    fechaVencimiento: {
        type: Date,
        required: [true, "La fecha de vencimiento es requerida"]
    },
    estado: {
        type: String,
        enum:["Iniciar proyecto", "En proceso", "Completado"],
        default: "Iniciar proyecto"
    }
});

ColeccionProyectos.plugin(uniqueValidator, { message: 'Ya existe otro proyecto con el nombre {VALUE}' });

const Proyecto = mongoose.model("Proyecto", ColeccionProyectos);

module.exports = Proyecto;