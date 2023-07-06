

// isso é um model usamos para definir uma tabela do bando de dados
const Sequelize = require('sequelize');
const connection = require('./database');


//criando o model
const Pergunta = connection.define('pergunta',{
    titulo:{type:Sequelize.STRING, allowNull: false},
    // type:String = tipo de texto curto
    descricao:{type:Sequelize.TEXT, allowNull: false}
       // type:TEXT = tipo de texto longo
});

Pergunta.sync({force: false}).then(()=>{
    console.log('tabela criada');
});
//força a criação da tabela pergunta, se não houver uma tabela Pergunta ele irá criar uma no bd
//force:false ele não vai força uma criação

module.exports = Pergunta;