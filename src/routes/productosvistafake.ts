import { Router, Request, Response } from 'express';
import ProductosPersistencia from '../productos';
import faker from 'faker';
import { publicPath } from '../../src/index';
import path from 'path';


declare module 'express-session' {
	interface SessionData {
	  nombre?: string;
	  contador: number;
	}
  }

const router = Router();
const miProducto = new ProductosPersistencia();
let usuarios = [
	{ nombre: 'admin', password: '3472180' },
];


router.get('/', (req: Request, res: Response) => {
	if (req.session.nombre) {
	  res.redirect('/datos');
	} else {
	  res.redirect('/login');
	}
});

/* --------- LOGIN ---------- */
router.get('/login', (req, res) => {
	res.sendFile(publicPath + '/login.html');
});

router.post('/login', (req, res) => {
	let { nombre, password } = req.body;
	let credencialesOk = usuarios.filter(
	  (usuario) => usuario.nombre == nombre && usuario.password == password
	).length;
	if (credencialesOk) {
	  req.session.nombre = nombre;
	  req.session.contador = 0;
	  res.redirect('/');
	} else {
	  res.render('login-error', {});
	}
});

router.get('/register', (req, res) => {
	const registerPath = path.resolve(__dirname, '/public/index.html');
	res.sendFile(publicPath + registerPath);
});


router.post('/register', (req, res) => {
	let { nombre } = req.body;
	let encontrado = usuarios.filter(
	  (usuario) => usuario.nombre == nombre
	).length;
	if (!encontrado) {
	  usuarios.push(req.body);
	  req.session.nombre = nombre;
	  req.session.contador = 0;
	  res.redirect('/');
	} else {
	  res.render('register-error', {});
	}
});


router.get('/datos', (req: Request, res: Response) => {
	if (req.session.nombre) {
	  req.session.contador =+ 1;
	  res.render('datos', {
		datos: usuarios.find((usuario) => usuario.nombre == req.session.nombre),
		contador: req.session.contador,
	  });
	} else {
	  res.redirect('/login');
	}
});

router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
	  res.redirect('/');
	});
});


router.get('/vista', (req, res) => {
	miProducto.leer().then((data) => {
		const datosDinamicos = { 
			productos: data
		}
		console.log(datosDinamicos);
		res.render('main', datosDinamicos);
	})
}); 

router.get('/vista-test', (req, res) => {
	const productosFaker = []
	let { noProductos } = req.query

	if(!noProductos){
		noProductos = "10"
	}

	for(let i =0; i<Number(noProductos); i++){
		productosFaker.push({
				nombre: faker.commerce.productName(),
				precio: faker.commerce.price(),
				url: faker.image.imageUrl()
		})
	}

	const productosDinamicos = {
		productos: productosFaker
	}
	res.render('main', productosDinamicos);

});   

export default router;