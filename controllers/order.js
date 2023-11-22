const Order = require('../models/OrderSchema');
const Product = require('../models/ProductSchema');

function getPrice(products, quantities) {
    let price = 0;
    for (let i = 0; i < products.length; i++) {
        price += products[i].price * quantities[i];
    }

    return price;
}

function parseProduct(products, quantities) {
    let p = []
    for (let i = 0; i < products.length; i++) {
        p.push({
            code: products[i].code,
            name: products[i].name,
            price: products[i].price,
            img: products[i].img,
            desc: products[i].desc,
            quantity: quantities[i]
        })
    }
    return p;
}
module.exports = {
    getOrders: async function(req, res) {
        const orders = await Order.find();

        res.json({ status: true, orders: orders});
    },
    addOrder: async function(req, res) {
        let { productCodes, quantities} = req.body.productCodes;
        if (productCodes == undefined || quantities == undefined) {
            return res.status(400).json({ status: false, message: 'Please provide the product codes and quantity of each product ({ productCodes: 1,2,3,..., quantity: 2,3,4 })'});
        }
        productCodes = productCodes.split(',').map((code) => parseInt(code));
        quantities = quantities.split(',').map((num) => parseInt(num));
        let products = await Product.find({ code: { $in: productCodes }});
        products = parseProduct(products, quantities);
        let total_price;
        if (products.length === 0) {
            total_price = 0;
        } else {
            total_price = getPrice(products, quantities);
        }
        let order = new Order({ total_price: total_price, products: products });
        order = await order.save()

        res.json({ status: true, order: order });
    },
    getOrder: async function(req, res) {
        const id = parseInt(req.params.id);
        const order = await Order.findOne({ id: id });
        if (order == null) {
            return res.json({ status: false, message: 'Order not found'});
        }
        res.json({ status: true, order: order });
    },
    updateOrder: async function(req, res) {
        const id = parseInt(req.params.id);
        const { code, quantity } = req.body;
        if (code == undefined || quantity == undefined) {
            return res.json({ status: false, message: 'Please provide specific product code and quantity'});
        }
        const order = await Order.findOneAndUpdate(
            { id: id, 'products.code': code },
            { $set: { 'products.$.quantity': quantity } },
            { new: true }
        );

        res.json({ status: true, order: order});
    },
    deleteOrder: async function(req, res) {
        const id = parseInt(req.params.id);
        await Order.deleteOne({ id: id });
        res.json({ status: true, message: `Deleted order with id ${id}`});
    }
}