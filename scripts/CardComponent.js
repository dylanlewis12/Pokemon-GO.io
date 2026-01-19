export default function (pokemon) {
    // Create card structure
    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = `
        <div class="card-header">
            <p class="pokemonName">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
            <p class="pokemonNumber">#${String(pokemon.id).padStart(3, '0')}</p>
        </div>
        
        <div class="card-image">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        </div>
        
        <div class="card-types">
            <span class="type-badge">${pokemon.types[0].type.name.toUpperCase()}</span>
            ${pokemon.types[1] ? `<span class="type-badge">${pokemon.types[1].type.name.toUpperCase()}</span>` : ''}
        </div>
        
        <div class="content-container">
            <p><strong>Abilities:</strong></p>
            <p class="ability">${pokemon.abilities[0]?.ability.name || 'None'}</p>
            <p class="ability">${pokemon.abilities[1]?.ability.name || 'None'}</p>
        </div>
    `;
    
    return card;
}