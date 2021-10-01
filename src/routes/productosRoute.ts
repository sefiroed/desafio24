import express, { Response } from 'express';
import ProductosPersistencia from '../productos';
import Productos from '../class/producto';
import { contenido } from '../modules/app';
import { productos, dbIDs, lastID } from '../modules/data';
import faker from 'faker';


/**
 * DATOS A MANIPULAR
 */


const router = express.Router();


for (let id = 1; id <= 4; id++) {
  const newDato = contenido();
  const newProducto = new Productos(
    newDato.producto,
    newDato.precio,
    newDato.url,
    id
  );
  productos.push(newProducto);
  dbIDs.push(id);
  lastID.lastID = id;
}

/*Mostrando los productos*/
const miProducto = new ProductosPersistencia();
router.get('/listar', async (req, res) => {
  const data = await miProducto.leer();
  if (data.length == 0) {
    res.json({
      msg: 'no hay productos cargados',
    });
  }
  res.json({
    data,
  });
});


/*Listando los productos por id*/
router.get('/listar/:id', async (req, res) => {

  const id = (req.params.id);
  const producto = id
    ? await miProducto.leerPorId(id)
    : await miProducto.leer();
    if (!producto) {
      res.json({
        msg: 'Error producto no encontrado',
      });
    }  
  res.json({
    data: producto,
  });
  
});

//rutas vista-test

// router.get('/vista-test', (req, res) => {
// 	const productosFaker = [];
// 	let { noProductos } = req.query;
  
// 	if(!noProductos){
// 		noProductos = "10"
// 	}

// 	for(let i = 0; i < Number(noProductos); i++){
// 		productosFaker.push({
// 				nombre: faker.commerce.productName(),
// 				precio: faker.commerce.price(),
// 				url: faker.image.imageUrl()
// 		})
// 	}

// 	const productosDinamicos = {
// 		productos: productosFaker
// 	}
// 	res.render('main', productosDinamicos);

// });


/*Para agregar productos a nuestra api*/
router.post('/guardar', async (req, res) => {

  const { nombre, precio, url } = req.body;
  const producto = await miProducto.guardar(nombre, precio, url);
    if (typeof nombre !== 'string'){
      res.json({
        Error: 'nombre tiene que ser string',
      });
    }
    if (typeof precio !== 'number'){
      res.json({
        Error: 'precio tiene que ser un numero',
      });
    }
    if (typeof url !== 'string'){
      res.json({
        Error: 'la url no es correcta',
      });
    }   

  res.json({
    msg: 'producto agregado con exito',
    data: producto,
  });
  

});

  

/*Para actualizar productos por id*/  
router.put('/actualizar/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  await miProducto.actualizar(body,id);
    if (typeof body.nombre !== 'string'){
      res.json({
        Error: 'nombre tiene que ser string',
      });
    }
    if (typeof body.precio !== 'number'){
      res.json({
        Error: 'precio tiene que ser un numero',
      });
    }
    if (typeof body.url !== 'string'){
      res.json({
        Error: 'la url no es correcta',
      });
    }  
  res.json({
    msg: 'producto actualizado con exito',
  });
});  

/*Para borrar productos por id*/   
router.delete('/borrar/:id', async (req, res) => {
  const id = req.params.id;
  await miProducto.borrar(id);
    if (id == '0'){
      res.json({
        Error: 'Producto no encotrado',
      });
    }

  res.json({
    msg: "The product was deleted",
  });
});   



export default router;















