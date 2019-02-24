const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  },
  define: {
    timestamps: false
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.model')(sequelize, Sequelize);
db.product = require('../models/product.model')(sequelize, Sequelize);
db.category = require('../models/category.model')(sequelize, Sequelize);
db.attributeValue = require('../models/attribute_value.model')(sequelize, Sequelize);
db.attribute = require('../models/attribute.model')(sequelize, Sequelize);


db.product.belongsToMany(db.category, { through: 'product_category', foreignKey: 'product_id', });
db.category.belongsToMany(db.product, { through: 'product_category', foreignKey: 'category_id', });

db.product.belongsToMany(db.attributeValue, { through: 'product_attribute', foreignKey: 'product_id' });
db.attributeValue.belongsToMany(db.product, { through: 'product_attribute', foreignKey: 'attribute_value_id' });

module.exports = db;