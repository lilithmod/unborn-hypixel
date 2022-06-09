import { RawWoolGames } from '../types/raw/RawWoolGames.js'
import { WoolGames } from '../types/processed/WoolGames.js'

export function processWoolGames(json: RawWoolGames): WoolGames {
    const processed = {
        coins: json.coins ?? 0,
        progression: {
            layers: json.progression.layers ?? 0,
            experience: json.progression.experience ?? 0
        },
        packages: json.packages ?? [],
        cosmetics: {
            barrier: json.barrier ?? '',
            killMessages: json.killmessages ?? '',
            hat: json.hat ?? '',
            deathCry: json.deathcry ?? '',
            projectileTrail: json.projectiletrail ?? '',
        },
        woolWars: {
            selectedClass: json.wool_wars.selected_class ?? '',
            stats: {
                overall: {
                    assists: json.wool_wars.stats.assists ?? 0,
                    blocksBroken: json.wool_wars.stats.blocks_broken ?? 0,
                    deaths: json.wool_wars.stats.deaths ?? 0,
                    gamesPlayed: json.wool_wars.stats.games_played ?? 0,
                    kills: json.wool_wars.stats.kills ?? 0,
                    powerups: json.wool_wars.stats.powerups_gotten ?? 0,
                    wins: json.wool_wars.stats.wins ?? 0,
                    woolPlaced: json.wool_wars.stats.wool_placed ?? 0,
                },
                classes: {}
            },
            layouts: json.wool_wars.layouts,
        }
    }

    for (const clazz of Object.keys(json.wool_wars.stats.classes)) {
        processed.woolWars.stats.classes[clazz] = {
            assists: json.wool_wars.stats.classes[clazz].assists ?? 0,
            blocksBroken: json.wool_wars.stats.classes[clazz].blocks_broken ?? 0,
            deaths: json.wool_wars.stats.classes[clazz].deaths ?? 0,
            gamesPlayed: json.wool_wars.stats.classes[clazz].games_played ?? 0,
            kills: json.wool_wars.stats.classes[clazz].kills ?? 0,
            powerups: json.wool_wars.stats.classes[clazz].powerups_gotten ?? 0,
            wins: json.wool_wars.stats.classes[clazz].wins ?? 0,
            woolPlaced: json.wool_wars.stats.classes[clazz].wool_placed ?? 0,
        }
    }

    return processed
}