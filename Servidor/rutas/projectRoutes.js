const controladorProyecto = require("./../controladores/projectController");

module.exports = (app) =>{
    app.get('/api/proyectos', controladorProyecto.todosLosProyectos);
    app.get('/api/proyectos/:id', controladorProyecto.unProyecto);
    app.post('/api/proyectos/agregar', controladorProyecto.agregarProyecto);
    app.put('/api/proyectos/editar/:id', controladorProyecto.actualizarProyecto);
    app.delete('/api/proyectos/borrar/:id', controladorProyecto.borrarProyecto);
}