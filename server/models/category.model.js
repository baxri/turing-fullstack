
module.exports = (sequelize, Sequelize) => {
	const Model = sequelize.define('category', {
		category_id: {
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
	}, {
			timestamps: false,  // I do not want timestamps here
			freezeTableName: true,
		});

	return Model;
}


