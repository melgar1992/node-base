const express = require('express')
const cors = require('cors');
const {
    dbConnection
} = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.route = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        //Concetar Base de datos
        this.conectarDB();
        //middlewares
        this.middlewares();
        //routes
        this.routes();
    }
    async conectarDB() {
        await dbConnection();
    }
    middlewares() {
        // directorio publico
        this.app.use(express.static('public'));
        //Letura del body
        this.app.use(express.json());
        //CORS
        this.app.use(cors());
    }
    routes() {
        this.app.use(this.usuariosPath, require('../routes/user'));
    }
    listen() {
        this.app.listen(this.route, () => {
            console.log('Servidor corriendo en el puerto', this.route);
        })
    }


}

module.exports = Server;