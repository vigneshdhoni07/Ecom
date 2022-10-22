module.exports = {
development:
{
    HOST : "localhost",
    USER : "root",
    PASSWORD : "9994106907Ravi",
    DB : "DBECOM",
    dialect : "mysql",
    pool :{
    max :5,
    min :0,
    acquire: 30000, //max time in ms that a pool will try to getconnection before throwing error
    idle :10000 // maximum time in ms that a connection can be idlebefore being released
        }
    },
    production:
    {

    HOST : "sql6.freemysqlhosting.net",
    USER : "sql6528123",
    PASSWORD : "mF3Ukqxw1q",
    DB : "sql6528123",
    dialect : "mysql",
    pool :{
    max :5,
    min :0,
    acquire: 30000, //max time in ms that a pool will try to getconnection before throwing error
    idle :10000 // maximum time in ms that a connection can be idlebefore being released
    }
}
}