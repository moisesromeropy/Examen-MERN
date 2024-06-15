import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const FormularioProyecto = ({URL_BASE, funcionAEjecutar}) => {
    const [proyectosaux, setProyectosaux] = useState({
        nombreProyecto: "",
        fechaVencimiento: null, // Inicialmente sin fecha de vencimiento
        estatus: "Iniciar Proyecto"
    });
    const [error, setError] = useState("");
    const[errorFrontEnd, setErrorFrontEnd] = useState("");
    const {id} = useParams();
    const navegacion = useNavigate();
    const definirProyectos = (valorNuevo, campo) =>{
        setProyectosaux({...proyectosaux, [campo]: valorNuevo});
    }
    const definirDateEnProyecto = (date) => {
        setProyectosaux({ ...proyectosaux, fechaVencimiento: date });
    };
    const procesarFuncion = (event) =>{
        event.preventDefault();
        const url = `${URL_BASE}/proyectos/agregar`;
        if (!proyectosaux.fechaVencimiento) {
            setErrorFrontEnd("La Fecha de Vencimiento es obligatoria");
            return;
          }
          if (!proyectosaux.nombreProyecto) {
            setErrorFrontEnd("El nombre de proyecto es obligatorio");
            return;
          }
          if (proyectosaux.nombreProyecto.length < 3) {
            setErrorFrontEnd("El nombre de proyecto debe ser mayor o igual a 3");
            return;
          }
        axios.post(url, 
            proyectosaux,
            {
                headers:{
                    'Content-Type':'application/json'
                }
            }
        )
          .then((response) => {
            console.log(response);
            funcionAEjecutar(response.data);
            setProyectosaux({ nombreProyecto: "",
                fechaVencimiento: null, 
                estatus: "Iniciar Proyecto"});
            setError("");
            setErrorFrontEnd("");
            navegacion("/"); 
          })
          .catch(function (error) {
            console.log(error.response.data.error.errors.nombreProyecto.message);
            setError(error.response.data.error.errors.nombreProyecto.message)
        

          });
       
        //  
    }
    return(
        <>
         <form onSubmit={procesarFuncion}>
         {error?error:""}
         {errorFrontEnd? errorFrontEnd : ""}  
            <TextField
                fullWidth
                label="Nombre del Proyecto"
                name="nombreProyecto"
                value={proyectosaux.nombreProyecto}
                onChange={(e)=>definirProyectos(e.target.value, "nombreProyecto")}
                required
                variant="outlined"
                margin="normal"
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Fecha de Vencimiento"
                    name="fechaVencimiento"
                    
                    value={proyectosaux.fechaVencimiento}
                    onChange={definirDateEnProyecto}
                    textField={<TextField fullWidth variant="outlined" margin="normal" />}
                />
            </LocalizationProvider>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
            >
                Guardar Proyecto
            </Button>
        </form>
         
        </>
    )
}

export default FormularioProyecto;