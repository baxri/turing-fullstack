const joi = require('joi');
const db = require('../config/db.config.js');

const Product = db.product;
const User = db.user;
const ShippingRegion = db.shipping_region;
const Shipping = db.shipping;
const ShoppingCart = db.shopping_cart;
const Attribute = db.attribute;
const Op = db.Sequelize.Op;

exports.pay = async (req, res) => {

    try {

        const schema = {
            cart_id: joi.string().required(),
            shipping_id: joi.number().required(),
        }

        const { error } = joi.validate(req.body, schema);

        if (error) {
            throw new Error(error.details[0].message);
        }

        const shipping = await Shipping.findOne({
            where: { shipping_id: req.body.shipping_id }
        });

        const items = await ShoppingCart.findAll({
            include: {
                model: Product
            },
            where: { cart_id: req.body.cart_id }
        });

        let total = 0;

        if (items.length > 0) {
            items.map(item => {
                total += (item.product.price * 1);
            });
        }

        res.status(200).send({
            shipping: shipping,
            subtotal: total,
            cart: items,
        });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}


