// En el modelo de producto vamos a definir la estructura de los documentos de productos en la base de datos.

import mongoose from "mongoose";


// Producto nuevo
const productSchema = new mongoose.Schema({
    name: {type: String, required: true, minLength: 3, maxLength: 100, trim: true},
    price: {type: Number, required: true, min: 0},
    description: {type: String, required: true, minLength: 4, maxLength: 500, trim: true},
    stock: {type: Number, min: 0, default: 0},
    image: {type: String, required: true, trim: true},
    createdAt: {type: Date, default: Date.now}
}, {timestamps: true}) // timestamps: true nos permite agregar automáticamente los campos createdAt y updatedAt a cada documento de producto, lo que facilita el seguimiento de cuándo se creó y actualizó cada producto.

// Este modelo nos permite vincularnos con la colección de productos en la base de datos.
const Product = mongoose.model("Product", productSchema);
// Dentro de nuestra db al definir el modelo de producto, Mongoose creará automáticamente una colección llamada "products" (en plural) en la base de datos.

export default Product;