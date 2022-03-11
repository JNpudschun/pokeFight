const express = require('express')
const mongoose = require("mongoose");
const Pokemon = require("./models/pokemon");
const app = express()
const PORT = process.env.PORT || 3000;

const pokeDex = require('./resources/pokedex.json')
const cors = require('cors');
app.use(cors());
const mongoDB = "mongodb://test:test1@practicetest-shard-00-00.fnqdh.mongodb.net:27017,practicetest-shard-00-01.fnqdh.mongodb.net:27017,practicetest-shard-00-02.fnqdh.mongodb.net:27017/Leaderboard?ssl=true&replicaSet=atlas-13n72f-shard-0&authSource=admin&retryWrites=true&w=majority"
 
mongoose.connect(mongoDB);
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
app.get("/leaderboard", (req, res) => {
    Pokemon.find({}, (err, data) => res.send(data));
  });
app.get("/leaderboard/:name", (req, res) => {
    Pokemon.find({name: req.params.name}, (err, data) => res.send(data));
  });

app.post("/leaderboard/:name/:result",(req, res) => {
    Pokemon.exists({name:req.params.name},(error, result)=>{
        if (error){
            console.log(error)
        } else {
            if(JSON.stringify(result).length > 4){
                if(req.params.result === "win"){
                    Pokemon.updateOne({name: req.params.name},{$inc:{wins:1}}).then(function (updatePokemon) {
                        res.send(updatePokemon);
                    });
                } 
                if(req.params.result === "loss"){
                    Pokemon.updateOne({name: req.params.name},{$inc:{losses:1}}).then(function (updatePokemon) {
                        res.send(updatePokemon);
                    });
                }
            } else {
                if(req.params.result === "win"){
                Pokemon.create({
                    name: req.params.name,
                    wins: 1,
                    losses: 0,
                }).then(function (newPokemon) {
                    res.send(newPokemon);
                });
                }
                if(req.params.result === "loss"){
                    Pokemon.create({
                        name: req.params.name,
                        wins: 0,
                        losses: 1,
                    }).then(function (newPokemon) {
                        res.send(newPokemon);
                    });
                    }
            }

        } 
    })
  });

app.put("/leaderboard/:name/:result",(req,res)=>{
    
    if(req.params.result === "win"){
        Pokemon.updateOne({name: req.params.name},{name:req.params.name,$inc:{wins:1},losses:losses},{upsert:true}).then(function (updatePokemon) {
            res.send(updatePokemon);
        });
    } else {
        Pokemon.updateOne({name: req.params.name},{$inc:{losses:1}},{upsert:true}).then(function (updatePokemon) {
            res.send(updatePokemon);
        });
    }
});
app.delete("/leaderboard/:name", (req, res) => {
    Pokemon.deleteOne({ name: req.params.name }).then(function () {
      res.end();
    });
  });

app.listen(PORT, () => {
    console.warn(`App listening on http://localhost:${PORT}`);
  });