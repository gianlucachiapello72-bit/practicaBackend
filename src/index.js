// Importamos express framework
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);


const MONGODB_URI = process.env.MONGODB_URI;



// 
const PORT = process.env.PORT || 3000; // https://localhost:3000



mongoose.connect(MONGODB_URI).then(() => {
    console.log("Conectado a MongoDB!!!!!")
    // Iniciar el servidor y ponerlo a escuchar en el puerto especificado
    app.listen(PORT, () => {
        console.log(`Server funcionando en puerto ${PORT}`)
    })
}).catch((error) => {
    console.log(error)
})

