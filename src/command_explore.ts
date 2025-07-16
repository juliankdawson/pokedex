import { State } from "./state.js";

export async function commandExplore(state: State, name: string) {
    try {
        const location = await state.pokeAPI.fetchLocation(name);
        if (!location) {
            throw new Error("Invalid location!")
        }

        console.log(`Exploring ${name}...`);
        console.log("Found Pokemon:");
        for (const encounter of location.pokemon_encounters) {
            console.log("-", encounter.pokemon.name);
        }

    } catch (err) {
        console.log((err as Error).message);
    }
}