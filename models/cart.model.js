module.exports=(Sequelize,sequelize)=>
{
    var Cart=sequelize.define("Cart",{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        cost:{
            type:Sequelize.INTEGER
        }
    })
    return Cart
}