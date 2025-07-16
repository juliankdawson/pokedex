import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache: Cache;

    constructor(cacheInterval: number) {
        this.cache = new Cache(cacheInterval);
    }

    closeCache() {
        this.cache.stopReapLoop();
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;

        const cached = this.cache.get<ShallowLocations>(url);
        if (cached) return cached;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Something went wrong fetching locations!");
            }

            const locations: ShallowLocations = await response.json();
            this.cache.add(url,locations);
            return locations;
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

        const cached = this.cache.get<Location>(url);
        if (cached) return cached;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Something went wrong fetching location!");
            }
            const location: Location = await response.json();
            this.cache.add(url, location);
            return location;
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }
}

export type ShallowLocations = {
    count: number;
    next: string;
    previous: string;
    results: {
        name: string,
        url: string,
    }[];
};

export type Location = {
    id: number;
    name: string;
    game_index: number;
    encounter_method_rates: {
        encounter_method: {
            name: string;
            url: string;
        };
        version_details: {
            rate: number;
            version: {
                name: string;
                url: string;
            }
        }[];
    }[];
    location: {
        name: string,
        url: string,
    }
    names: {
        name: string;
        language: {
            name: string;
            url: string;
        };
    }[];
    pokemon_encounters: {
        pokemon: {
            name: string,
            url: string,
        };
        version_details: {
            version: {
                name: string;
                url: string;
            };
            max_chance: number;
            encounter_details: {
                min_level: number;
                max_level: number,
                condition_values: {
                    name: string;
                    url: string;
                }[];
                chance: number;
                method: {
                    name: string;
                    url: string;
                };
            }[];
        };
    }[];
};