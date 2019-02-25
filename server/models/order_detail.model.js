module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('order_detail', {
		item_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		order_id: {
			type: Sequelize.INTEGER
		},
		product_id: {
			type: Sequelize.INTEGER
		},
		options: {
			type: Sequelize.STRING
		},
		product_name: {
			type: Sequelize.STRING
		},
		quantity: {
			type: Sequelize.INTEGER
		},
		unit_cost: {
			type: Sequelize.DECIMAL
		},
	}, {
			timestamps: false,
			freezeTableName: true,
		});

	return Model;
}


