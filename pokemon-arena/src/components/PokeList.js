import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"

function PokeList(){
    const [pokeDex , setPokeDex] = useState([]);

    async function getData(){
        let url = "https://pokefight-by-jnp.herokuapp.com/pokemon";
        let response = await axios.get(url);
        console.log(response.data);
        setPokeDex(response.data);
       
    }
    useEffect(()=>{
        getData();
    },[])
    return(
        <div>
            {pokeDex ? 
            (<ul>
             {pokeDex.map(pokemon=>(
                <li key={pokemon.id}>
                    <Link to={"/pokemon/"+pokemon.id} >
                        <label>{pokemon.id}</label>
                        <label>{pokemon.name.english}</label>
                        <label>{pokemon.type}</label>
                        <label>{pokemon.base.HP}</label>
                        <label>{pokemon.base.Attack}</label>
                        <label>{pokemon.base.Defense}</label>
                        <label>{pokemon.base.Speed}</label>
                    </Link>
                </li>
             ))}   
            </ul>) 
            : (<h2>Fetching Pokemon</h2>)}

        </div>
    );
}
export default PokeList;