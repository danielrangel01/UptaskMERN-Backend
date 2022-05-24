import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import UsuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import tareaRoutes from "./routes/tareaRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());

dotenv.config();

conectarDB();

/*
//configuracion cors
 const whithelist = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whithelist.includes(origin)) {
      //pude consultar la api
      callback(null, true);
    } else {
      //no esta permitido consultar la api
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOptions));
 */

// Routing
app.use("/api/usuarios", UsuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tareas", tareaRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log([`servidor corriendo en el puerto ${PORT}`]);
});
