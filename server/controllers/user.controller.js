const joi = require('joi');
const db = require('../config/db.config.js');
const User = db.user;
const ShippingRegion = db.shipping_region;


exports.signup = async (req, res) => {

	try {

		const schema = {
			name: joi.string().required(),
			email: joi.string().required().email(),
			password: joi.string().required(),
			address_1: joi.string().required(),
			city: joi.string().required(),
			region: joi.string().required(),
			postal_code: joi.string().required(),
			country: joi.string().required(),
			mob_phone: joi.string().required(),
			shipping_region_id: joi.number().min(2).required(),
		}

		const { error } = joi.validate(req.body, schema);

		
		if (error) {
			throw new Error(error.details[0].message);
		}

		const users = await User.findAll({ where: { email: req.body.email } });

		if (users.length > 0) {
			throw new Error('Email already exists!');
		}

		const shipping = await ShippingRegion.findOne({
			where: { shipping_region_id: req.body.shipping_region_id }
		});

		if (!shipping) {
			throw new Error('Invalid shipping region!');
		}

		const user = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			address_1: req.body.address_1,
			city: req.body.city,
			region: req.body.region,
			postal_code: req.body.postal_code,
			country: req.body.country,
			mob_phone: req.body.mob_phone,
			shipping_region_id: req.body.shipping_region_id
		});

		res.send(user.publicData());
	} catch (err) {
		res.status(500).send({
			message: err.message
		});
	}
}


exports.signin = async (req, res) => {

	try {

		const schema = {
			email: joi.string().required().email(),
			password: joi.string().required(),
		}

		const { error } = joi.validate(req.body, schema);

		if (error) {
			throw new Error(error.details[0].message);
		}

		const user = await User.findOne({
			where: {
				email: req.body.email
			}
		});

		if (!user) {
			throw new Error('User not found!');
		}

		if (!user.checkPassword(req.body.password)) {
			throw new Error('Invalid password!');
		}

		res.status(200).send({ user: user.publicData(), accessToken: user.signToken() });
	} catch (err) {
		res.status(500).send({
			message: err.message
		});
	}
}


exports.user = async (req, res) => {

	try {
		const user = await User.findOne({ where: { customer_id: req.user_id }, })

		if (!user) {
			throw new Error('User not found!');
		}

		res.status(200).send(user.publicData())
	} catch (err) {
		res.status(500).send({
			message: err.message
		});
	}
}
