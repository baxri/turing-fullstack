const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('shipping_region', {
		shipping_region_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		shipping_region: {
			type: Sequelize.STRING
		},
	}, {
			timestamps: false,  // I do not want timestamps here
			freezeTableName: true,
		});

	return Model;
}


