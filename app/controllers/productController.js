const productModel = require('../models/productModel');
const commentModel = require('../models/commentModel')

// Add an product 
async function addProduct(req, res){
    try {
        // Récupérer les valeurs des éléments à inserer 
        const {id, name, stock, category, marque, price} = req.body;
        // Crer une nouvelle instance de l'product 
        const product = new productModel({
            id,
            name,
            stock,
            category,
            marque,
            price
        })
        // Sauvegarder tous ça en base
        await product.save();
        res.status(201).json({message: "ok"});
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// Get all products
async function getAllProducts (req, res) {
    try {
        const products = await productModel.find();
        const productsWithComments = await Promise.all(
            products.map(async (product) => {
                const comments = await commentModel.find({product_ID: product._id}, {_id:0, content:1});
                return {...product.toObject(), comments}
            })
        )
        res.json(productsWithComments)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// Update product 
async function updateProduct (req, res) {
    try {
        const {name, stock, category, marque, price} = req.body;
        const product = await productModel.findById({_id : req.params.id});
        product.name = name;
        product.stock = stock;
        product.category = category;
        product.marque = marque;
        product.price = price;
        await product.save();
        res.json({message: "product updated"});
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// Delete an product 
async function deleteProduct (req, res){
    try {
        const product = await productModel.findById({_id : req.params.id});
        await product.deleteOne();
        res.json({message: 'product removed'});
      
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// get product by category
async function getProductByCategory (req, res){
    try {
        const products = await productModel.find({category : req.params.category});
        const productsWithComments = await Promise.all(
            products.map(async (product) => {
                const comments = await commentModel.find({product_ID: product._id}, {_id:0, content:1});
                return {...product.toObject(), comments}
            })
        )
        res.json(productsWithComments) 
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// search product 
async function searchProduct(req, res){
    try {
    //   récupération du terme recherché 
    const searchTerm = req.query.query;
    const products = await productModel.find({
        $or: [
            {name: {$regex: new RegExp(searchTerm, "i")}},
            {marque: {$regex: new RegExp(searchTerm, "i")}},
            {category: {$regex: new RegExp(searchTerm, "i")}},
        ]
    })

    res.json(products);
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}


module.exports = {
    addProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProductByCategory,
    searchProduct
}