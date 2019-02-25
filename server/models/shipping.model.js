module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('shipping', {
		shipping_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		shipping_type: {
			type: Sequelize.STRING
		},
		shipping_cost: {
			type: Sequelize.DECIMAL
		},
		shipping_region_id: {
			type: Sequelize.DECIMAL
		},
	}, {
			timestamps: false,
			freezeTableName: true,
		});

	return Model;
}


