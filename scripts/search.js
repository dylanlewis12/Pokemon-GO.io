import CardComponent from "./CardComponent"
//search

let pokemonID = "";

let allPokemon = []; // Cache all pokemon data

const getAllPokemon = async () => {
    try {
        let response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10000');
        let result = response.data; 

    } catch(error) {
        console.error("Error fetching pokemon list:", error);
    }
};