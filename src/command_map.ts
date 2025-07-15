import { State } from "./state.js";

export async function commandMapNext(state: State) {
    const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);

    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;

    for (const loc of locations.results) {
        console.log(loc.name);
    }
}

export async function commandMapPrev(state: State) {
    if (!state.prevLocationsURL) {
        throw new Error("You're on the first page!");
    }

    const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);

    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;

    for (const loc of locations.results) {
        console.log(loc.name);
    }
}