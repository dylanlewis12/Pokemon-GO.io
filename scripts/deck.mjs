const deleteBtn = document.getElementById("delete-btn");


deleteBtn.addEventListener("click", (event) => {
    try {
        if (confirm("Are you sure you want to clear your entire Pokemon Deck?") == true) {
            const currentDeck = localStorage.getItem("pokemonDeck");
            let dataArray = currentDeck ? JSON.parse(currentDeck) : [];

            if(!Array.isArray(dataArray)) { //check if pokedeck has been created
                console.error(`Data stored under key "pokemonDeck" is not an array. Creating new array.`);
                dataArray = [];
                localStorage.setItem("pokemonDeck", dataArray);
                return;
            }
            localStorage.removeItem("pokemonDeck");
            alert("Poke Deck has been cleared successfully!");
            localStorage.setItem("pokemonDeck", []);
            location.reload(); //refresh page with updated deck
        }    
    } catch(error) {
       console.error("Error displaying pokemon deck:", error.message); 
    }

});

// Create pokemon card function
function createPokemonCard(pokemon) {
    const typeColors = {
        'normal': '#A8A878', 'fire': '#F08030', 'water': '#6890F0',
        'electric': '#F8D030', 'grass': '#78C850', 'ice': '#98D8D8',
        'fighting': '#C03028', 'poison': '#A040A0', 'ground': '#E0C068',
        'flying': '#A890F0', 'psychic': '#F85888', 'bug': '#A8B820',
        'rock': '#B8A038', 'ghost': '#705898', 'dragon': '#7038F8',
        'dark': '#705848', 'steel': '#B8B8D0', 'fairy': '#EE99AC'
    };

    const primaryType = pokemon.types[0].type.name;
    const typeColor = typeColors[primaryType] || '#A8A878';

    const card = document.createElement('div');
    card.className = 'card';
    card.style.background = `linear-gradient(135deg, ${typeColor}EE 0%, ${typeColor}DD 100%)`;
    card.style.borderColor = typeColor;

    const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const pokemonNum = String(pokemon.id).padStart(3, '0');

    const typesBadges = pokemon.types.map(type => {
        const color = typeColors[type.type.name];
        return `<span class="type-badge" style="background-color: ${color};">${type.type.name.toUpperCase()}</span>`;
    }).join('');

    const abilities = pokemon.abilities
        .map(a => `<p class="ability">⭐ ${a.ability.name}</p>`)
        .join('');

    card.innerHTML = `
        <div class="card-header">
            <p id="pokemonName">${pokemonName}</p>
            <p id="pokemonNumber" style="color: ${typeColor};">#${pokemonNum}</p>
        </div>
        
        <div class="card-image">
            <img src="${pokemon.sprites.front_default}" alt="${pokemonName}">
        </div>
        
        <div class="card-types">
            ${typesBadges}
        </div>
        
        <div class="content-container">
            <p><strong>Abilities:</strong></p>
            ${abilities}
        </div>
    `;

    return card;
}

function displayPokemonDeck() {
    try {
        const currentDeck = localStorage.getItem("pokemonDeck");
        let dataArray = currentDeck ? JSON.parse(currentDeck) : [];

        console.log(currentDeck);

        const cardContainer = document.querySelector('.card-container');
        cardContainer.innerHTML = '';  // Clear existing cards and reset display

        dataArray.forEach(pokemon => {
            const card = createPokemonCard(pokemon);
            cardContainer.appendChild(card);
        });


    } catch(error) {
        console.error("Error displaying pokemon deck:", error.message);
    }

}

displayPokemonDeck();