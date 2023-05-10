const express = require('express');

const server = express();
server.use(express.json());

server.get("/helth", function (req, res) {
    res.json({
        status: "Running tarefa"
    });
})

const tarefa = [
    {
        id: 1,
        name: "Retirar o lixo",
        description:"Ir ate os lixos da casa e leva-los para lixeira la fora",
        isDone: false 
    },
    {
        id: 2,
        name: "Encher as garrafas de agua",
        description:"Ir até a geladeira e encher as garrafas de agua",
        isDone: true
    },
    {
        id: 3,
        name: "Encher as formas de gelo",
        description:"ir até o congelador e encher cada forminha de gelo sem gelo com agua",
        isDone: true
    }
]

server.get("/tarefa", (req, res) => {
    const moreThen =req.query.more_than ? Number(req.query.more_than) : 0;
    res.json({
        tarefa
    })
})

server.get("/tarefa/:id", (req, res) => {
    const id = Number(req.params.id);
    tarefa.find(() => {
        return tarefa.id === id;
    })
    res.json({ tarefa})
})

server.post('/tarefa', (req, res)=> {
    
    const newTarefa= {
        id: tarefa.length + 1,
        name: req.body.name,
        description: req.body.description,
        isDone: req.body.isDone
    }
    tarefa.push(newTarefa)
    res.json({ 
        tarefa: newTarefa 
    })
})

server.put('/tarefas/id:', (req, res)=> {
    const id = Number(req.params.id);
    const tarefa = tarefa.find((tarefa)=> {
        return tarefa.id === id;
    })
    if(!tarefa){
        return res.status(404).json({message: "Tarefa not found"});
    }
    tarefa.name = req.body.name;
    tarefa.description= req.body.description;
    tarefa.isDone= req.body.isDone;
    res.json({ 
        tarefa
    })
})
server.delete("/tarefa/:id", (req,res)=>{
    const id= Number(req.params.id);
     tarefa= tarefa.filter((tarefa)=>{
        return tarefa.id != id;
     })
     res.status(204).send
    
})

// server.post('/', (req, res)=> {
//     res.send("Hello world! Post!");
// })

const port = 3000;
server.listen(port, () =>{
    console.log(`Server  'tarefas' running on port ${port}`);
});









