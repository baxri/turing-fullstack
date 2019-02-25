const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('product', {
		product_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING
		},
		description: {
			type: Sequelize.STRING
		},
		price: {
			type: Sequelize.DECIMAL
		},
		discounted_price: {
			type: Sequelize.DECIMAL
		},
		image: {
			type: Sequelize.STRING
		},
		image_2: {
			type: Sequelize.STRING
		},
		thumbnail: {
			type: Sequelize.STRING
		},
		display: {
			type: Sequelize.INTEGER
		},

	}, {
			timestamps: false,  // I do not want timestamps here
			freezeTableName: true,
		});


	Model.prototype.getPrice = function (quantity) {

		let price = (this.price * 1) * quantity;

		if (this.discounted_price > 0) {
			price = (this.discounted_price * 1) * quantity;
		} else {

		}

		return price;
	}

	return Model;
}


