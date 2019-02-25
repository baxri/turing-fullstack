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
db.shopping_cart = require('../models/shopping_cart.model')(sequelize, Sequelize);

db.shipping = require('../models/shipping.model')(sequelize, Sequelize);
db.shipping_region = require('../models/shipping_region.model')(sequelize, Sequelize);

db.order = require('../models/orders.model')(sequelize, Sequelize);
db.order_detail = require('../models/order_detail.model')(sequelize, Sequelize);


db.product.belongsToMany(db.category, { through: 'product_category', foreignKey: 'product_id', });
db.category.belongsToMany(db.product, { through: 'product_category', foreignKey: 'category_id', });

db.product.belongsToMany(db.attributeValue, { as: 'attributes', through: 'product_attribute', foreignKey: 'product_id' });

db.attributeValue.belongsToMany(db.product, { as: 'products', through: 'product_attribute', foreignKey: 'attribute_value_id' });
db.attributeValue.belongsTo(db.attribute, { as: 'attribute', foreignKey: 'attribute_id' });

db.shopping_cart.belongsTo(db.product, { foreignKey: 'product_id' });


db.user.belongsTo(db.shipping_region, { foreignKey: 'shipping_region_id' });

db.shipping_region.hasMany(db.shipping, { foreignKey: 'shipping_region_id' });


module.exports = db;