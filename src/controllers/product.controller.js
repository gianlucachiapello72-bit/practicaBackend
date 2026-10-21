import Product from '../models/product.model.js'

export async function getProducts(req, res) {
    try {
        const productos = await Product.find() // Buscamos todos los productos en la base de datos

        return res.status(200).send({
            success: true,
            message: "Productos obtenidos correctamente",
            products: productos
        }) // Enviamos la respuesta al cliente con los productos encontrados

    }
    catch (error) {
        console.error(error); // Hacemos un console log del error para depuracion interna

        return res.status(500).send({
            success: false,
            message: "Error al obtener los productos"
        }); // Al usuario le enviamos un mensaje generico de error, sin exponer detalles internos del servidor
    }
}

export async function getProductsById(req, res) {
    try {
        // Primero debemos obtener el ID del producto que la persona quiere obtener, este ID viene en los parametros de la URL (products/:id)
        const id = req.params.id; // Obtenemos los parametros de la URL (products/:id) y los guardamos en la variable id

        // Buscamos el producto en la base de datos por su ID
        const product = await Product.findById(id); // Buscamos el producto en la base de datos por su ID. Si no lo encuentra, product será null

        if (!product) {

            return res.status(404).send({
                succes: false,
                message: "Producto no encontrado"
            })

        } // Esto sólo se ejecuta si el ID es incorrecto (no existe)

        return res.send({
            succes: true,
            product,
            message: "Producto obtenido correctamente"
        })
    }
    catch (error) {

        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error al obtener el producto"
        });

    }
}

// Funcion para crear un nuevo producto
export async function createProduct(req, res) {

    try {
        req.body.createdAt = new Date() //Agregamos la fecha de creación al producto antes de guardarlo en la base de datos    
        const nuevoProducto = new Product(req.body); // Creamos una nueva instancia del modelo Product con los datos recibidos en el cuerpo de la solicitud (req.body)

        console.log(nuevoProducto); // Hacemos un console log del nuevo producto para depuracion interna, esto nos permite ver en la consola del servidor los datos que estamos recibiendo y guardando en la base de datos.

        // Guardar el producto en la base de datos
        await nuevoProducto.save()

        // ! SIEMPRE se debe enviar una respuesta al cliente, de lo contrario la solicitud quedará pendiente y eventualmente se agotará el tiempo de espera.
        return res.status(201).send("Nuevo producto creado!!") // Enviamos una respuesta al cliente
    }
    catch (error) {
        console.error(error); // Hacemos un console log del error para depuracion interna

        return res.status(500).send("Error al crear el producto"); // Al usuario le enviamos un mensaje generico de error, sin exponer detalles internos del servidor
    }
}

export async function updateProduct(req, res) {
    try {
        // Obtenemos el ID del prodcuto desde los parametros de la URL
        const id = req.params.id;

        // Actualizar el producto
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new: true, runValidators: true}) 
        // recibe el ID del producto + datos a actualizar + objeto de opciones (opcional)

        // a. El producto exista y se actualice
        // b. El producto no exista y se devuelva un error 404
        // Dar una respuesta
        if (!updatedProduct){
            return res.status(404).send({
                succes: false,
                message: "Producto no encontrado"
            })
        }
        return res.status(200).send({
            succes: true,
            product: updatedProduct,
            message: "Producto actualizado correctamente"
        })
    }

    catch (error) {
        console.log(error)
        return res.status(500).send({
            succes: false,
            message: "Error al actualizar el producto"
        })
    }
}

export async function deleteProduct(req, res) {
    try {
        const id = req.params.id

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).send({
                succes: false,
                message: "Producto no encontrado"
            })
        }

        return res.status(200).send({
            succes: true,
            message: "Producto eliminado correctamente"
        })

    }

    catch (error) {
        console.log(error)
        return res.status(500).send({
            succes: false,
            message: "Error al eliminar el producto"
        })
    }
}