document.addEventListener('DOMContentLoaded', () => {
  const pokemonContainer = document.querySelector('#pokemon-container')
  const pokemonSearch = document.querySelector('#pokemon-search-form')
  URL = "http://localhost:3000/pokemon"

  //Rendering All Pokemon// 
  pokemonContainer.innerHTML = renderAllPokemon(POKEMON) 

  function renderAllPokemon(pokemonArray) {
    return pokemonArray.map(renderSinglePokemon).join('')
  }
  
  function renderSinglePokemon(pokemon) {
    return (`
    <div class="pokemon-card">
      <div class="pokemon-frame">
        <h1 class="center-text">${pokemon.name}</h1>
        <div class="pokemon-image">
          <img data-id="${pokemon.id}" data-action="flip" class="toggle-sprite" src="${pokemon.sprites.front}">
        </div>
      </div>
    </div>`)
  }

  // Event Listeners 
  pokemonContainer.addEventListener('click', (event) => {
    if (event.target.dataset.action === 'flip') {
    
      const targetPoke = POKEMON.find(pokeObj => pokeObj.id == event.target.dataset.id)
    
      if (event.target.src === targetPoke.sprites.front) {
        event.target.src = targetPoke.sprites.back
      } else {
        event.target.src = targetPoke.sprites.front
      }
    }
  })

  pokemonSearch.addEventListener('input', (event) => {
    const filteredPokes = POKEMON.filter(pokeObj => pokeObj.name.includes(event.target.value.toLowerCase()))
    const filteredPokeHTML = renderAllPokemon(filteredPokes)
   
    pokemonContainer.innerHTML = filteredPokeHTML ? filteredPokeHTML : `<p><center>There are no Pokémon here</center></p>`
  })
})
