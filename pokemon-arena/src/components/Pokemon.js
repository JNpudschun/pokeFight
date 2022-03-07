import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams} from "react-router-dom";

function Pokemon(){
    const [pokemon , setPokemon] = useState({});
    const { id } = useParams();
    console.log(id)
    async function getData(){
        let url = "https://pokefight-by-jnp.herokuapp.com/pokemon/"+String(id);
        console.log(url);
        let response = await axios.get(url);
        console.log(response.data);
        setPokemon(response.data);
        console.log(JSON.stringify(pokemon).length);
    }
    useEffect(()=>{
        getData();
        console.log(pokemon);
    },[])
    return(
        <div>
            {JSON.stringify(pokemon).length > 2 ? 
            (<div>
                <h2>{"#"+pokemon.id+" "+ pokemon.name.english} </h2>
                <table>
                    <tbody>
                        <tr>
                            <td>Type:</td>
                            <td>{pokemon.type}</td>    
                        </tr>
                        <tr>
                            <td>HP:</td>
                            <td>{pokemon.base.HP}</td>    
                        </tr>
                        <tr>
                            <td>Attack:</td>
                            <td>{pokemon.base.Attack}</td>    
                        </tr>
                        <tr>
                            <td>Defense:</td>
                            <td>{pokemon.base.Defense}</td>    
                        </tr>
                        <tr>
                            <td>Speed:</td>
                            <td>{pokemon.base.Speed}</td>    
                        </tr>
                    </tbody>
                </table>            
            </div>) 
            : (<h2>Fetching Pokemon</h2>)}

        </div>
    );
}
export default  Pokemon;