import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PokemonDetails(){
    const [pokemonDetails , setPokemonDetails] = useState({});
    const { id } = useParams();
    const { info } = useParams();

    async function getData(){
        let url = "https://pokefight-by-jnp.herokuapp.com/pokemon/"+String(id)+"/"+String(info);
        console.log(url)
        let response = await axios.get(url);
        console.log(response.data);
        setPokemonDetails(response.data);
    }
    useEffect(()=>{
        getData();
    },[])
    return(
        <div>
            {pokemonDetails ? 
            (<div>
                <h2>{info} </h2>
                <p>{JSON.stringify(pokemonDetails)}</p>
            </div>) 
            : (<h2>Fetching Pokemon</h2>)}

        </div>
    );
}
export default  PokemonDetails;