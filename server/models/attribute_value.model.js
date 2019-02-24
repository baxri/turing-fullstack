module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('attribute_value', {
		attribute_value_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		attribute_id: {
			type: Sequelize.INTEGER
		},
		value: {
			type: Sequelize.STRING
		},
	}, {
			timestamps: false,
			freezeTableName: true,
		});

	return Model;
}


