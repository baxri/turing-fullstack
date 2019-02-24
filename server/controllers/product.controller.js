const joi = require('joi');
const db = require('../config/db.config.js');

const Product = db.product;
const Category = db.category;
const attributeValue = db.attributeValue;
const Attribute = db.attribute;
const Op = db.Sequelize.Op;

exports.products = async (req, res) => {

    try {

        const page = req.query.page ? req.query.page : 1;
        const category_id = req.query.category_id ? req.query.category_id : null;
        const search = req.query.search ? req.query.search : null;

        let limit = 10;
        let offset = 0;
        let productWhere = {};
        let categoryWhere = {};

        if (category_id) {
            categoryWhere = { ...categoryWhere, category_id };
        }

        if (search) {
            productWhere = {
                ...productWhere,
                [Op.or]: [
                    { name: { [Op.like]: '%' + search + '%' } },
                    { description: { [Op.like]: '%' + search + '%' } },
                ]
            };
        }

        let data = await Product.findAndCountAll({
            where: { ...productWhere },
            include: [{
                model: Category,
                where: { ...categoryWhere }
            }],
        });


        let pages = Math.ceil(data.count / limit);
        offset = limit * (page - 1);

        const products = await Product.findAll({
            where: { ...productWhere },
            include: [{
                model: Category,
                where: { ...categoryWhere }
            }],
            limit: limit,
            offset: offset,
            $sort: { id: 1 }
        });

        res.status(200).json({ 'result': products, 'count': data.count, 'pages': pages });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}

exports.product = async (req, res) => {

    try {

        const product = await Product.findOne({
            include: [
                {
                    model: attributeValue,
                    attributes: ['value', 'attribute_id'],
                },
            ],
            where: { product_id: req.params.id },
        });

        const attributes = await Attribute.findAll();

        res.status(200).send({
            product: product,
            attributes: attributes,
        });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}