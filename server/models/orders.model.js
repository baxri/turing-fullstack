module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('orders', {
		order_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		total_amount: {
			type: Sequelize.DECIMAL
		},
		created_on: {
			type: Sequelize.DATE
		},
		status: {
			type: Sequelize.INTEGER
		},
		comments: {
			type: Sequelize.STRING
		},
		customer_id: {
			type: Sequelize.INTEGER
		},
		shipping_id: {
			type: Sequelize.INTEGER
		},
	}, {
			timestamps: false,
			freezeTableName: true,
		});

	return Model;
}


