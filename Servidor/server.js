const express = require('express');
const app = express();
const cors = require("cors");
const rutaProyecto = require('./rutas/projectRoutes');
require('./configuracion/configuracionBD');

app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

rutaProyecto(app);


app.listen(8000, () => {
    console.log("Listening at Port 8000")
});