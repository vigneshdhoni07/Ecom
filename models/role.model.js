module.exports=(Sequelize,sequelize)=>{
    const role=sequelize.define("role",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrment:true
          },
        name:{
            type:Sequelize.STRING,
            allowNull:false
        }
    })
    return role
}