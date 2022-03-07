const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;

const pokeDex = require('./resources/pokedex.json')
const cors = require('cors')
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Server is running and listening to requests.")
})
app.get('/pokemon',(req,res)=>{
    console.log("Request recieved")
    res.send(pokeDex)
    console.log("Response send")
})
app.get('/pokemon/:id',(req,res)=>{
    console.log("Request recieved")
    let id = req.params.id;
    let pokemon = pokeDex[id-1]
    res.send(pokemon)
    console.log("Response send")
})
app.get('/pokemon/:id/:info',(req,res)=>{
    console.log("Request recieved")
    let id = req.params.id;
    let pokemon = pokeDex[id-1]
    let info = req.params.info;
    if(info === "type"){
        res.send(pokemon.type)
        console.log("Response send")
    }
    if(info === "name"){
        res.send(pokemon.name)
        console.log("Response send")
    }
    if(info === "base"){
        res.send(pokemon.base)
        console.log("Response send")
    }
    
})

app.listen(PORT, () => {
    console.warn(`App listening on http://localhost:${PORT}`);
  });