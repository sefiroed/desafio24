import express from 'express';
import path from 'path';
import routerProductos from './routes/productosRoute';
import handlebars from 'express-handlebars';
import * as http from 'http';
import { initWSServer } from './logicasocket/websocket';
import { productos } from './modules/data';
import {connect} from '../src/db/connectionmongodb';
import vistaRouter from '../src/routes/productosvistafake'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import "reflect-metadata";


/** INICIALIZACION API con EXPRESS y conectamos la base de datos **/
connect();
const app = express();
const puerto = 8080;


//Creando he inisializando nuestro objeto myServer en socketIo
const myServer = http.createServer(app);
initWSServer(myServer);
myServer.listen(puerto, () => console.log(`SERVER UP ON PORT ${puerto}`));


// /*Con los siguientes metodos podemos pasar el body via postman*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// /*Invocamos a nuestra archivo index.html con una llamada al localhost:8080*/
export const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
    },
  })
);

/*Invocamos los path para utilizarlos en el motor de plantillas */
const layoutFolderPath = path.resolve(__dirname, '../views/layouts');
const defaultLayerPth = path.resolve(__dirname, '../views/layouts/main.hbs');
const partialFolderPath = path.resolve(__dirname, '../views/partial');

/* Trabajamos con el motor de plantillas handlebars */
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    layoutsDir: layoutFolderPath,
    partialsDir: partialFolderPath,
    defaultLayout: defaultLayerPth,
    extname: 'hbs',
  })
);


// app.get('/', (req, res) => {
//   const data = { mostrarFormato: true, mostrarLista: true, productos };
//   res.render('main', data);
// });

//Render de la pagina vista
// app.get('/productos/vista', (req, res) => {
//   const data = { mostrarTabla: true, productos };
//   res.render('main', data);
// });


/*Invocamos a nuestra carpeta ruta para realizar las llamadas*/
app.use('/api/productos', routerProductos);
app.use('/', vistaRouter);


