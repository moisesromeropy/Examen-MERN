const {request} = require("express");
const Proyecto = require('./../modelos/projectModel');

module.exports.todosLosProyectos = (req, res) =>{
    Proyecto.find()
    .then((proyectos)=>{
        return res.status(200).json(proyectos);
    })
    .catch((error) =>{
        return res.status(404).json({message: "Algo salió mal", error});
    })
}

module.exports.unProyecto = (req,res) =>{
    const id = req.params.id;
    Proyecto.findOne({_id: id})
    .then((proyecto)=>{
        return res.status(200).json(proyecto);
    })
    .catch((error) =>{
        return res.status(404).json({message: "Algo salió mal", error});
    })
}

module.exports.agregarProyecto = (req, res) =>{
    const { nombreProyecto, fechaVencimiento, estado} = req.body;

    // Validar el campo 'nombre'
    if (!nombreProyecto || nombreProyecto.length < 3) {
        return res.status(400).json({ error: "El nombre del proyecto es obligatorio y debe tener al menos 3 caracteres." });
    }

    // Validar el campo 'fechaVencimiento'
    if (!fechaVencimiento) {
        return res.status(400).json({ error: "Se requiere especificar la fecha de vencimiento del proyecto." });
    }
    Proyecto.create(req.body)
    .then((proyecto)=>{
        return res.status(201).json(proyecto)
    })
    .catch((error)=>{
        return res.status(500).json({message:"Algo salió mal", error});
    })
}

module.exports.borrarProyecto = (req, res) =>{
    const id = req.params.id;
    Proyecto.deleteOne({_id: id})
    .then((proyectoRemovido) => {
        console.log(proyectoRemovido);
        return res.status(204).end();
    })
    .catch((error) => {
        return res.status(500).json({mensaje: 'Algo salió mal', error})
    });
}

module.exports.actualizarProyecto = (req, res) => {
    const id = req.params.id;
    // Extraer el campo 'status' del cuerpo de la solicitud
    const { estado } = req.body;
    
    // Validar que se haya proporcionado el campo 'status'
    if (!estado) {
        return res.status(400).json({ error: "El campo 'status' es requerido para actualizar el proyecto." });
    }

    // Actualizar solo el campo 'status'
    Proyecto.findOneAndUpdate({ _id: id }, { estado: estado }, { new: true })
        .then(proyectoActualizado => {
            if (!proyectoActualizado) {
                return res.status(404).json({ error: "Proyecto no encontrado." });
            }
            res.status(200).json(proyectoActualizado);
        })
        .catch(err => res.status(500).json(err));
};