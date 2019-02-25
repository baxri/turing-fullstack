const joi = require('joi');
const db = require('../config/db.config.js');

const Product = db.product;
const User = db.user;
const ShippingRegion = db.shipping_region;
const Shipping = db.shipping;
const ShoppingCart = db.shopping_cart;
const Attribute = db.attribute;
const Op = db.Sequelize.Op;

const Order = db.order;
const OrderDetail = db.order_detail;

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

        const user = await User.findOne({ where: { customer_id: req.user_id }, })

        if (!user) {
            throw new Error('User not found!');
        }

        const shipping = await Shipping.findOne({
            where: { shipping_id: req.body.shipping_id }
        });

        if (!shipping) {
            throw new Error('No shipping found!');
        }

        const items = await ShoppingCart.findAll({
            include: {
                model: Product
            },
            where: { cart_id: req.body.cart_id }
        });

        let total = 0;

        if (!items.length) {
            throw new Error('There is no items in cart!');
        }

        items.map(item => {
            if (item.product.discounted_price > 0) {
                total += (item.product.discounted_price * 1) * item.quantity;
            } else {
                total += (item.product.price * 1) * item.quantity;
            }
        });

        const order = await Order.create({
            total_amount: total,
            created_on: (new Date()),
            customer_id: user.customer_id,
            shipping_id: shipping.shipping_id
        });

        items.map(item => {

            let unit_cost = item.product.getPrice(item.quantity);

            order.createItem({
                product_id: item.product.product_id,
                options: item.options,
                product_name: item.product.name,
                quantity: item.quantity,
                unit_cost: unit_cost,
            });

            item.destroy();
        });


        res.status(200).send({
            order: order,
            // subtotal: total,
            // cart: items,
        });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}


