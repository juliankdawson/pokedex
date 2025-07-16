# Pokédex CLI

A command-line Pokédex app built with TypeScript that uses the [PokeAPI](https://pokeapi.co/) to let you explore Pokémon locations and encounters. 

This project was created as part of the Boot.dev TypeScript course.

## Features

- List Pokémon location areas using the `map` command
- Paginate through location areas
- Explore specific locations using `explore <location-name>`
- Attempt to catch encountered Pokémon (with success chances)
- Add caught Pokémon to your personal Pokédex
- View your caught Pokémon using the `pokedex` command
- Look up detailed info on specific Pokémon using `inspect <pokemon-name>`
- Caches API responses in memory for improved performance
- Periodically removes expired cache entries

## Getting Started

Clone the repository:

```bash
git clone https://github.com/juliankdawson/pokedex.git
cd pokedex
```

## Using the CLI

Start the program:

```bash
npm run dev
```


All of the CLI's commands are listed when running the `help` command.

When you're done simply run `exit` to close the program!
