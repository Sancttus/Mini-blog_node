

// isso é um model usamos para definir uma tabela do bando de dados
const Sequelize = require('sequelize');
const connection = require('./database');


//criando o model
const Resposta = connection.define('resposta',{
    corpo:{type:Sequelize.TEXT, allowNull: false},
    // type:TEXT = tipo de texto longo
   
    perguntaId:{type:Sequelize.INTEGER, allowNull: false}
     // type:INTEGER = tipo de numero inteiro
});

Resposta.sync({force: false}).then(()=>{
    console.log('tabela criada');
});
//força a criação da tabela pergunta, se não houver uma tabela Pergunta ele irá criar uma no bd
//force:false ele não vai força uma criação

module.exports = Resposta;