import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';

const Proyectos = ({proyectos, borrarProyecto, editarProyectos, URL_BASE}) =>{
    const navegacion = useNavigate();
    const [error, setError] = useState("");
    const cambiarEstado = (proyecto, estadoNuevo) => {
        const id = proyecto._id
        proyecto.estado = estadoNuevo
        const url = `${URL_BASE}/proyectos/editar/${id}`;
        axios.put(url, 
            {estado: proyecto.estado},
            {
                headers:{
                    'Content-Type':'application/json'
                }
            }
        )
          .then((response) => {
            console.log(response);
            console.log(response.data);
            editarProyectos(response.data);
          })
          .catch((error) => {
            console.log(error);
            setError(error);
          });
    }
    const removerProyecto = (id) => {
        const url = `${URL_BASE}/proyectos/borrar/${id}`;
        axios.delete(url)
        .then((response) => {
            console.log(response);
            borrarProyecto(id);
            setError("");
          })
          .catch((error) => {        
            setError(error);
          });
    }

    const irANuevoProyecto= ()=>{
        navegacion(`/nuevo`);
    }
    const estaVencido = (fechaVencimiento) => {
        // Obtener la fecha de ayer
        const ayer = new Date();
        ayer.setDate(ayer.getDate() - 1); // Restar un día a la fecha actual
    
        const fechaVencimientoDate = new Date(fechaVencimiento);
    
        // Comparar las fechas
        return fechaVencimientoDate < ayer;
      };
    const backlogOrdenado = proyectos.filter(proyecto => proyecto.estado === 'Iniciar proyecto')
    .sort((a, b) => new Date(a.fechaVencimiento) - new Date(b.fechaVencimiento));

    const enCursoOrdenado = proyectos.filter(proyecto => proyecto.estado === 'En proceso')
    .sort((a, b) => new Date(a.fechaVencimiento) - new Date(b.fechaVencimiento));

     const completadoOrdenado = proyectos.filter(proyecto => proyecto.estado === 'Completado')
    .sort((a, b) => new Date(a.fechaVencimiento) - new Date(b.fechaVencimiento));
    return (
        <>
        <Grid container spacing={3}>
            {/* Columna Backlog */}
            <Grid item xs={4} style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                    Backlog
                </Typography>
                {backlogOrdenado.map(proyecto => (
                    <Card key={proyecto._id} style={{ marginBottom: '10px' }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {proyecto.nombreProyecto}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Fecha de Vencimiento: {proyecto.fechaVencimiento}
                                <span style={{color: 'red' }}> {estaVencido(proyecto.fechaVencimiento)?"Proyecto Vencido": ""}</span>
                            </Typography>
                            <Button onClick={(e)=>cambiarEstado(proyecto, "En proceso") }variant="contained" color="primary">
                                Iniciar Proyecto
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Grid>

            {/* Columna En Curso */}
            <Grid item xs={4} style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                    En Curso
                </Typography>
                {enCursoOrdenado.map(proyecto => (
                    <Card key={proyecto._id} style={{ marginBottom: '10px' }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {proyecto.nombreProyecto}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Fecha de Vencimiento: {proyecto.fechaVencimiento}
                                <span style={{color: 'red' }}> {estaVencido(proyecto.fechaVencimiento)?"Proyecto Vencido": ""}</span>
                            </Typography>
                            <Button onClick={(e)=>cambiarEstado(proyecto, "Completado") } variant="contained" color="primary">
                                Mover a completado
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Grid>

            {/* Columna Completado */}
            <Grid item xs={4} style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                    Completado
                </Typography>
                {completadoOrdenado.map(proyecto => (
                    <Card key={proyecto._id} style={{ marginBottom: '10px' }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {proyecto.nombreProyecto}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Fecha de Vencimiento: {proyecto.fechaVencimiento}
                                <span style={{color: 'red' }}> {estaVencido(proyecto.fechaVencimiento)?"Proyecto Vencido": ""}</span>
                            </Typography>
                            <Button onClick={(e)=>removerProyecto(proyecto._id)} variant="contained" color="primary">
                                Eliminar Proyecto
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Grid>
        </Grid>
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {/* Otra Columna Aquí */}
        <Grid item xs={12}>
        <Button onClick={(e)=> irANuevoProyecto()} variant="contained" color="primary">
                               Agregar Proyecto
                </Button>
            </Grid>
        </Grid>
        </>
    );
}

export default Proyectos;