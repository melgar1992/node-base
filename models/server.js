const express = require('express')
const cors = require('cors');
const {
    dbConnection
} = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {

    constructor() {
        this.app = express();
        this.route = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            uploads: '/api/uploads'
        };

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

        //File uploads
     
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.usuarios, require('../routes/user'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));


    }
    listen() {
        this.app.listen(this.route, () => {
            console.log('Servidor corriendo en el puerto', this.route);
        })
    }


}

module.exports = Server;