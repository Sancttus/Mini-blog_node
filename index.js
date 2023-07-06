
const express = require('express');
const app = express();
//importando o bodyparser para pega informações enviada do formulario
const bodyParser = require('body-parser');
//importando a conexção com o banco
const connection = require('./database/database');
const Pergunta = require('./database/pergunta');
const Resposta = require('./database/resposta')




//methodo por logar no mysql
connection.authenticate().then(()=>{
    console.log('conexão feita com o bd')
}).catch((error)=>{
    console.log('algo deu errado com o bd' + error)
})


app.set('view engine', 'ejs');
app.use(express.static('public'));


app.use(bodyParser.urlencoded({extended: false}))
//esse comando decodifica com que as informações enviada via formulario e transforma em estrutura javascript

app.use(bodyParser.json())
//permite que a gente leia dados de formulario no farmato json

app.get('/',(req,res)=>{
    
   Pergunta.findAll({raw: true,order:[ [ 'id', 'DESC']
    //findAll esse comando equivale a SELECT * from guia_pergunta.perguntas 
    //raw: true indica que só queremos os dados que foram passado no banco de dados, se n passamos ele trará muitos mais informação qe os dados
    //order:[['', '']] orderna a exibição de dados vindo do banco de dados, passamos 2 paramtros, um parametro de comparação, e com quer a ordenação DESC/ASC
   ]})    
    .then((perguntas)=>{//o then recebe a lista de perguntas
      
        res.render('index',{
            perguntas:perguntas
            //passando a lista de perguntas para uma variavel para acessamos no front end
            //lembre-se que existem duas maneiras de passa variavel para o front essa é uma delas
        });

    })
})

app.get('/perguntar', (req, res)=>{
    res.render('perguntar') 
})


//rotas do tipo post geralmente para receber dados do usuário
app.post('/salvarpergunta', (req, res)=>{
    //o bodyParser é responsavel por disponibilizar o body que usamos em raq.body
    let titulo = req.body.titulo;
    let descricao = req.body.descricao
    Pergunta.create({titulo:titulo, descricao:descricao}) //preenchendo os campos da tabela com os dados do formulario
    .then(()=>{
        res.redirect('/')
    })
    //comando create equivale ao comando INSERT INTO perguntas value
})


app.get('/pergunta/:id',(req, res)=>{
        let id = req.params.id
       Pergunta.findOne({
            //findOne procura um dado no banco de dados, mas para isso precisamos de elemento de comparação
            where: {id:id}
        }).then((pergunta)=>{
            if (pergunta != undefined) { //pergunta foi encontrada

                Resposta.findAll({
                    //exibindo todas as respostas de uma pergunta
                    where:{perguntaId:pergunta.id},
                    order:[['id', 'DESC']]
                } ).then((respostas)=>{
                    res.render('pergunta',{
                        pergunta:pergunta,
                        respostas:respostas
                        //para usamos a variavel no front
                 })

                })



            }else{//não encontrada
                res.redirect('/')
            }
        })    
})


app.post('/responder',(req, res)=>{
    let corpo = req.body.corpo;
    let perguntaId =  req.body.pergunta
    //esses 2 campos corresponde ao compos do arquivo resposta.js que por sua vez corresponde a tabela no banco de dados
    Resposta.create({
        corpo:corpo,
        perguntaId:perguntaId
    }).then(()=>{
        res.redirect('/pergunta/'+perguntaId)
    }).catch((err)=>{
        console.log('algo deu errado' + err)
    })
})



app.listen(3000, (err)=>{
    if(err){
        console.log('algo deu errado' + err)
    }else{
        console.log('servidor rodando')
    }
})