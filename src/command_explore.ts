import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("You have to provide a location!");
    }
    
    const name = args[0];
    const location = await state.pokeAPI.fetchLocation(name);

    console.log(`Exploring ${name}...`);
    console.log("Found Pokemon:");
    for (const encounter of location.pokemon_encounters) {
            console.log("-", encounter.pokemon.name);
    }
}