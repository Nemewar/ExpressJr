import express from "express";
import cors from "cors";
import "dotenv/config";

import {router} from "../routes/usuarios.js";
import { dbConnection } from "../database/configdb.js";

class Server {

    app;
    port;

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = "/api/usuarios";

        this.conectarDb();

        this.middlewares();

        this.routes();
    }

    async conectarDb(){
        await dbConnection();
    }

    middlewares(){

        
        this.app.use(cors())

        
        this.app.use( express.json())

        
        this.app.use(express.static("public"));
    }

    routes() {

        this.app.use(this.usersPath, router )

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        })
    }
}


export {
    Server
}