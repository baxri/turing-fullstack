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

	return Model;
}


