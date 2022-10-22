module.exports=(Sequelize,sequelize)=>{
    const Product=sequelize.define("products",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false
        },
        description:{
            type:Sequelize.STRING,

        },
        cost:{
            type:Sequelize.INTEGER,
            allowNull:false
        }
      
    },{
        tableName:"products"
    });
    return Product
}