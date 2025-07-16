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

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

        const cached = this.cache.get<Pokemon>(url);
        if (cached) return cached;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Something went wrong fetching pokemon!");
            }

            const pokemon: Pokemon = await response.json();
            this.cache.add(url, pokemon);
            return pokemon;
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

export type Pokemon = {
    id: number,
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: {
        is_hidden: boolean;
        slot: number;
        ability: {
            name: string;
            url: string;
        };
    }[];
    forms: {
        name: string;
        url: string;
    }[];
    game_indicies: {
        game_index: number;
        version: {
            name: string;
            url: string;
        };
    }[];
    held_items: {
        item: {
            name: string;
            url: string;
        };
        version_details: {
            rarity: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
    location_area_encounters: string;
    moves: {
        move: {
            name: string;
            url: string;
        }
        version_group_details: {
            level_learned_at: number;
            version_group: {
                name: string;
                url: string;
            };
            move_learn_method: {
                name: string;
                url: string;
            };
            order: number;
        }[];
    }[];
    species: {
        name: string;
        url: string;
    };
    sprites: {
        back_default: string;
        back_female: string | null;
        back_shiny: string;
        back_shiny_female: string | null;
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
        other: {
            dream_world: {
                front_default: string;
                front_female: string | null;
            };
            home: {
                front_default: string;
                front_female: string | null;
                front_shiny: string;
                front_shiny_female: string | null;
            };
            official_artwork: {
                front_default: string;
                front_shiny: string;
            };
            showdown: {
                back_default: string;
                back_female: string | null;
                back_shiny: string;
                back_shiny_female: string | null;
                front_default: string;
                front_female: string | null;
                front_shiny: string;
                front_shiny_female: string | null;
            };
        };
    };
    versions: {
        [generation: string]: {
            [game: string]: {
                back_default: string;
                back_female?: any;
                back_shiny: string;
                back_shiny_female?: any;
                front_default: string;
                front_female?: any;
                front_shiny: string;
                front_shiny_female?: any;
            };
        };
    };
    cries: {
        latest: string;
        legacy: string;
    };
    stats: {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        };
    }[];
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }[];
    past_types: {
        generation: {
            name: string;
            url: string;
        };
        types: {
            slot: number;
            type: {
                name: string;
                url: string;
            };
        };
    }[];
    past_abilities: {
        generation: {
            name: string;
            url: string;
        };
        abilities: {
            ability: string | null;
            is_hidden: boolean;
            slot: number;
        }[];
    }[];
};