const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(
    'Blog', 
    'root', 
    '4026.Test@Lucas#Manuel', 
    {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+02:00'
});

async function authenticate() {
    try{
        await sequelize.authenticate()
    }catch(erro) {
        console.log('Autentcacao proibido '+erro)
    }
}
authenticate()

module.exports = sequelize;