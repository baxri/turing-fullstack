module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('attribute', {
		attribute_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING
		},
	}, {
			timestamps: false,
			freezeTableName: true,
		});

	return Model;
}


