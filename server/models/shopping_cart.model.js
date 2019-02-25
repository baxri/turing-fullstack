module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('shopping_cart', {
		item_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		cart_id: {
			type: Sequelize.STRING
		},
		product_id: {
			type: Sequelize.INTEGER
		},
		options: {
			type: Sequelize.TEXT
		},
		quantity: {
			type: Sequelize.INTEGER
		},
		buy_now: {
			type: Sequelize.INTEGER
		},
		added_on: {
			type: Sequelize.DATE
		},
	}, {
			timestamps: false,
			freezeTableName: true,
		});

	return Model;
}


