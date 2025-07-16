import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { commandMapNext, commandMapPrev } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Displays the next 20 locations",
            callback: commandMapNext,
        },
        mapb: {
            name: "mapb",
            description: "Displays the previous 20 locations",
            callback: commandMapPrev,
        },
        explore: {
            name: "explore",
            description: "Shows all Pokemon in the area",
            callback: commandExplore,
        },
        catch: {
            name: "catch",
            description: "Throws a pokeball at selected pokemon",
            callback: commandCatch,
        },
        inspect: {
            name: "inspect",
            description: "Displays the caught pokemon's stats",
            callback: commandInspect,
        },
        pokedex: {
            name: "pokedex",
            description: "Shows all your caught pokemon",
            callback: commandPokedex,
        },
    };
}