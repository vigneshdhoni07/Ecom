const env=process.env.NODE_ENV || "development"
const config=require("../config/db.config")[env]

const  Sequelize  = require("sequelize")

const sequelize=new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host:config.HOST,
        dialect:config.dialect,
        operatorAliases:false,
        pool:{
            max:config.pool.max,
            min:config.pool.min,
            acquire:config.pool.acquire,
            idle:config.pool.idle
        }
    });
const db={};
db.sequelize=sequelize;
db.Sequelize=Sequelize;
db.Category=require("./category.model")(Sequelize,sequelize)
db.Product=require("./products.model")(Sequelize,sequelize)
db.User=require("./user.model")(Sequelize,sequelize)
db.Role=require("./role.model")(Sequelize,sequelize)
db.Cart=require("./cart.model")(Sequelize,sequelize)



db.Category.hasMany(db.Product);
db.Product.belongsTo(db.Category);
db.Role.belongsToMany(db.User,{
    through:"UserRoles",
    foreignKey:"roleid",
    otherKey:"userid"
})
db.User.belongsToMany(db.Role,{
    through:"UserRoles",
    foreignKey:"userid",
    otherKey:"roleid",
    
})
db.User.hasOne(db.Cart)
db.Cart.belongsTo(db.User)

db.Product.belongsToMany(db.Cart,{
    through:"cart_products",
    foreignKey:"product_id",
    
    otherKey:"cart_id"
})

db.Cart.belongsToMany(db.Product,{
    through:"cart_products",
    foreignKey:"cart_id",
    
    otherKey:"product_id"
})



db.ROLES=["user","admin"];

module.exports=db;