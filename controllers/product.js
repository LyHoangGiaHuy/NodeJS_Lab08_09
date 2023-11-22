const Product = require('../models/ProductSchema');
module.exports = {
    getProducts: async function(req, res) {
        const products = await Product.find();

        res.json({ status: true, products: products});
    },
    addProduct: function(req, res) { 
        let { name, price, img, desc } = req.body;
        img = img == undefined ? '' : img;
        desc = desc == undefined ? '' : desc;

        const newProduct = new Product({name: name, price: price, img: img, desc: desc});
        newProduct.save();
        res.json({ status: true, message: 'Added product successfully', product: newProduct });
    },
    getProduct: async function(req, res) {
        const id = parseInt(req.params.id);
        const product = await Product.findOne({ code: id });
        if (product == null) {
            return res.json({ status: false, message: 'Product not found'});
        }
        res.json({ status: true, product: product });
    },
    updateProduct: async function(req, res) {
        const id = parseInt(req.params.id);
        const { name, price, img, desc } = req.body;
        const query = { code: id };
        const update = { name: name, price: price, img: img, desc: desc }
        const product = await Product.findOneAndUpdate(query, update);
        res.json({ status: true, product: product });
    },
    deleteProduct: async function(req, res) {
        const id = parseInt(req.params.id);
        await Product.deleteOne({ code: id });
        res.json({ status: true, message: `Deleted product with code ${id}`});
    }
}