const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const fetchPokemon = () => {

    const generateHTML = pokemons =>{
        
        return pokemons = pokemons.reduce((acumulator, pokemon) =>{
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)

            acumulator +=  `
            <li class="card ${types[0]}">
            <img class="card-img" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"/>
            <h2 class="card-title">${pokemon.id}.${pokemon.name}</h2>
            <p class="card-subtitle">${types.join(' | ')}</p>
            </li>
            `
            console.log(pokemons)
            return acumulator
        }, '')
    }

    const insertPokemonIntoPage = pokemons =>{
        const ul = document.querySelector('[data-js="pokedex"]')
        ul.innerHTML = pokemons
    }

const generatePokemonPromisses = () => Array(150).fill().map((_, index) =>
       fetch(getPokemonUrl(index + 1)).then(Response => Response.json()))
    const pokemonPromisses = generatePokemonPromisses()

    Promise.all(pokemonPromisses)
    .then(generateHTML)
    .then(insertPokemonIntoPage)
   
}

fetchPokemon()