import './App.css';
import { Route, Routes } from "react-router-dom";
import PokeList from "./components/PokeList";
import Pokemon from "./components/Pokemon";
import PokemonDetails from "./components/PokemonDetails";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to the Pokemon Arena</p>
      </header>
      <Routes>
          <Route path="/pokemon/:id/:info" element={<PokemonDetails/>} />
          <Route path="/pokemon/:id" element={<Pokemon/>} />
          <Route path="/" element={<PokeList/>} />
      </Routes>
 
    </div>
  );
}

export default App;
