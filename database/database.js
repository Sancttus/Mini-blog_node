

const Sequelize = require('sequelize');

const connection =  new Sequelize('guia_perguntas', 'root', '159753',{
    host:'localhost',
    dialect:'mysql'
});



module.exports = connection;