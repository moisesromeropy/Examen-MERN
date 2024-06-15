import Proyectos from '../Proyectos/Proyectos';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import FormularioProyecto from '../FormularioProyecto/FormularioProyecto';

function App() {
  const URL_BASE = "http://localhost:8000/api";
  const [proyectos, setProyectos] = useState([]);
  const [error, setError] = useState("");

  useEffect(()=>{
    const cargarProyectos = () =>{
      axios.get(`${URL_BASE}/proyectos`)
      .then(function (response) {
        console.log(response.data);
        setProyectos(response.data);
      })
      .catch(function (error) {
        console.log(error);
        console.log("hola");
        setError(error);
      });
    }
    cargarProyectos();
  }, [])

  const agregarAProyectos = (nuevoProyecto) =>{
    setProyectos([...proyectos, nuevoProyecto]);
  }

  const editarProyectos = (proyectoAEditar) =>{
    const indice = proyectos.findIndex((proyecto) => proyecto._id === proyectoAEditar._id);
    console.log(indice);
    console.log(proyectos[indice]);
    const proyectosActualizados = [...proyectos];
    // Actualizamos el proyecto en la posición del índice
    proyectosActualizados[indice] = proyectoAEditar;
    console.log(proyectosActualizados);
    setProyectos(proyectosActualizados);


  }
  const borrarProyectos = (indice) => {
    const i = proyectos.findIndex((proyecto) => proyecto._id === indice);
    const listaActualizada = [...proyectos];
    listaActualizada.splice(i, 1);
    setProyectos(listaActualizada);

  };
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<Proyectos proyectos={proyectos} URL_BASE={URL_BASE} editarProyectos={editarProyectos} borrarProyecto={borrarProyectos}/>} />
        <Route path="/nuevo" element={<FormularioProyecto URL_BASE={URL_BASE}  funcionAEjecutar={agregarAProyectos} />}/>
        {/* <Route path="/:id" element={<DetalleProducto productos={productos} />} />
        <Route path="/:id/editar" element={<FormularioProductos URL_BASE={URL_BASE} funcionAEjecutar={editarProductosBD} />}/> */}
      </Routes>
    </div>
  );
}

export default App;
