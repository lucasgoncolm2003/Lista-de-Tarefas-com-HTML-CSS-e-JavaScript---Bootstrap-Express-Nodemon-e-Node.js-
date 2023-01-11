const express = require('express'); // Estruturação do Express
var bodyParser = require('body-parser'); // Estruturação do Body Parser
const path = require('path');
const app = express(); // Criação de Servidor com Express

app.use( bodyParser.json() ); // Suporta Bodies Codificados em JSON
app.use(bodyParser.urlencoded({ // Suporta Bodies Codificados em URL
    extended: true
}));

app.engine('html', require('ejs').renderFile);
// Seta Engine para Renderização HTML usando o ejs para Renderização
app.set('view engine', 'html');
// Seta View Engine para HTML
app.use('/public', express.static(path.join(__dirname, 'public')));
// Força o Diretório Atual a usar o Diretório Estático Public
app.set('views', path.join(__dirname, '/views'));
// Informa Pasta onde estão Views para pegar Diretório Completo
var tarefas = [];
var descricao = [];
app.post('/',(req,res)=>{
    //console.log(req.body.tarefa); necessita da Dependência Body Parser
    tarefas.push(req.body.tarefa);
    descricao.push(req.body.descricao);
    res.render('index.html',{tarefasList:tarefas, descricaoList:descricao});
    console.log("\n");
    console.log("Lista de Tarefas:");
    console.log(tarefas);
    console.log("==================");
    console.log("Lista de Descrições");
    console.log(descricao);
    console.log("==================");
    // Monitoramento das Listas Paramétricas
})
app.post('/deletar/:id',(req,res)=>{
    tarefas.push(req.body.tarefa);
    descricao.push(req.body.descricao);
    res.render('index.html',{tarefasList:tarefas, descricaoList:descricao});
    console.log("\n");
    console.log("Lista de Tarefas:");
    console.log(tarefas);
    console.log("==================");
    console.log("Lista de Descrições");
    console.log(descricao);
    console.log("==================");
})
app.get('/deletar/:id',(req,res)=>{ // Rota de Deleção
    tarefas = tarefas.filter(function(val,index){
        if(index != req.params.id){ // Recuperação do Id, e Req é Objeto de Requisição
            return val;
        }
    })
    descricao = descricao.filter(function(val2,index){
        if(index != req.params.id){ // Recuperação do Id, e Req é Objeto de Requisição
            return val2;
        }
    })
    res.render('index.html',{tarefasList:tarefas, descricaoList:descricao});
    console.log("\n");
    console.log("Lista de Tarefas:");
    console.log(tarefas);
    console.log("==================");
    console.log("Lista de Descrições");
    console.log(descricao);
    console.log("==================");
    // Monitoramento das Listas Paramétricas
})
app.get('/', (req, res)=>{
    res.render('index.html',{tarefasList:tarefas, descricaoList:descricao}); // Resposta de Requisição
}); // Ao chegar na Página Inicial, mostra algo ao Usuário
app.listen(5000, ()=>{
    console.log('Server em Execução'); // Callback
})