const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('customer', {
		customer_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING,
		},
		password: {
			type: Sequelize.STRING,
			set(val) {
				this.setDataValue('password', bcrypt.hashSync(val, 8));
			}
		},
		address_1: {
			type: Sequelize.STRING
		},
		city: {
			type: Sequelize.STRING
		},
		region: {
			type: Sequelize.STRING
		},
		postal_code: {
			type: Sequelize.STRING
		},
		country: {
			type: Sequelize.STRING
		},
		mob_phone: {
			type: Sequelize.STRING
		}

	}, {
			timestamps: false,  // I do not want timestamps here
			freezeTableName: true,
		});


	// Additional methods for this model
	Model.prototype.checkPassword = function (password) {
		return bcrypt.compareSync(password, this.password)
	}

	Model.prototype.publicData = function () {
		return {
			id: this.customer_id,
			name: this.name,
			email: this.email,
			address_1: this.address_1,
			city: this.city,
			region: this.region,
			postal_code: this.postal_code,
			country: this.country,
			mob_phone: this.mob_phone,
		}
	}

	Model.prototype.signToken = function () {
		const token = jwt.sign(this.publicData(), config.secret, {
			expiresIn: 86400 // expires in 24 hours
		});

		return token;
	}

	return Model;
}


