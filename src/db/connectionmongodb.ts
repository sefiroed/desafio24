import mongoose from 'mongoose';
import { query } from 'express';


const URL = 'mongodb://localhost:27017/ecommerce';


export async function connect() {

  try {
    await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("DB CONNECTED!!");

  } catch (e) {
    console.log("Error: ", e);
    
  }

};

// const func = async (query:any) => {
//   let result = [];

//   result = await collection.find();

//   if (query.nombre) result = await result.where('nombre', '=', query.nombre);

//   if (query.minPrice)
//     result = await result.where('price', '>=', query.minPrice);

//   if (query.maxPrice)
//     result = await result.where('price', '<=', query.maxPrice);

//   return result;
// };