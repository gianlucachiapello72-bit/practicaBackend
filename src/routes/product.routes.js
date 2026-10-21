import { Router } from "express";
import { getProducts , getProductsById , createProduct , updateProduct , deleteProduct } from "../controllers/product.controller.js";

const router = Router();

// Obtener todos los productos
router.get ("/products", getProducts);

// Obtener un producto especifico por su ID
router.get("/products/:id", getProductsById);


// Crear un nuevo producto
router.post("/products", createProduct);


// Actualizar un producto especifico por su ID
router.put("/products/:id", updateProduct);


// Eliminar un producto especifico por su ID
router.delete("/products/:id", deleteProduct);




export default router;