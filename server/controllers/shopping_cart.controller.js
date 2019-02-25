const joi = require('joi');
const db = require('../config/db.config.js');

const Product = db.product;
const User = db.user;
const ShippingRegion = db.shipping_region;
const Shipping = db.shipping;
const ShoppingCart = db.shopping_cart;
const Attribute = db.attribute;
const Op = db.Sequelize.Op;


exports.summary = async (req, res) => {

    try {

        const schema = {
            cart_id: joi.string().required(),
        }

        const { error } = joi.validate(req.query, schema);

        if (error) {
            throw new Error(error.details[0].message);
        }

        const items = await ShoppingCart.findAll({
            include: {
                model: Product
            },
            where: { cart_id: req.query.cart_id }
        });

        let total = 0;

        if (items.length > 0) {
            items.map(item => {
                total += item.product.getPrice(item.quantity);
            });
        }

        res.status(200).send({
            subtotal: total,
            cart: items,
        });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}

exports.checkout = async (req, res) => {

    try {

        const schema = {
            cart_id: joi.string().required(),
        }

        const { error } = joi.validate(req.query, schema);

        if (error) {
            throw new Error(error.details[0].message);
        }

        const user = await User.findOne({
            where: { customer_id: req.user_id },

            include: [{
                model: ShippingRegion,
                include: [{
                    model: Shipping
                }]
            }]
        })

        if (!user) {
            throw new Error('User not found!');
        }

        const items = await ShoppingCart.findAll({
            include: {
                model: Product
            },
            where: { cart_id: req.query.cart_id }
        });

        let total = 0;

        if (items.length > 0) {
            items.map(item => {
                total += item.product.getPrice(item.quantity);
            });
        }

        res.status(200).send({
            shipping_region: user.shipping_region,
            subtotal: total,
            cart: items,
        });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}

exports.addToCart = async (req, res) => {

    try {

        const schema = {
            cart_id: joi.string().required(),
            product_id: joi.number().required(),
            quantity: joi.number().required(),
            options: joi.required(),
        }

        const { error } = joi.validate(req.body, schema);

        if (error) {
            throw new Error(error.details[0].message);
        }

        const product = await Product.findOne({ where: { product_id: req.body.product_id } });

        if (!product) {
            throw new Error('Product not found!');
        }

        var keys = [];
        var values = [];

        for (let i = 0; i < req.body.options.length; i++) {

            let options = await product.getAttributes({
                where: { attribute_value_id: req.body.options[i] },
                include: [{
                    as: 'attribute',
                    model: Attribute,
                }]
            });

            if (options.length > 0) {
                keys.push(options[0].attribute.name);
                values.push(options[0].value);
            } else {
                throw new Error('Bad attribute!');
            }
        }

        let attributes = `${keys.join('/')}: ${values.join('/')}`;

        const cart = await ShoppingCart.create({
            cart_id: req.body.cart_id,
            product_id: req.body.product_id,
            options: attributes,
            quantity: req.body.quantity,
            added_on: (new Date()),
        });

        res.status(200).send(cart);
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}

exports.updateCart = async (req, res) => {

    try {

        const schema = {
            quantity: joi.number().required(),
        }

        const { error } = joi.validate(req.body, schema);

        if (error) {
            throw new Error(error.details[0].message);
        }

        const cart = await ShoppingCart.findOne({ where: { item_id: req.params.id } });

        if (!cart) {
            throw new Error('Product not found!');
        }

        cart.update({
            quantity: req.body.quantity
        });

        res.status(200).send(cart);
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}

exports.deleteItem = async (req, res) => {

    try {

        const cart = await ShoppingCart.findOne({ where: { item_id: req.params.id } });

        if (!cart) {
            throw new Error('Product not found!');
        }

        cart.destroy();

        res.status(200).send(cart);
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}

