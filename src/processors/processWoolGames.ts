import { RawWoolGames } from '../types/raw/RawWoolGames.js'
import { WoolGames } from '../types/processed/WoolGames.js'
import { getFormattedStar } from './processBedwars.js'
import { cutOff } from '../utils/utils.js'

function getStarForExp(exp) {

    if (exp < 1000) {
        return 1
    } else if (exp >= 1000 && exp < 3000) {
        return 2
    } else if (exp >= 3000 && exp < 6000) {
        return 3
    } else if (exp >= 6000 && exp < 10000) {
        return 4
    } else if (exp >= 10000 && exp < 15000) {
        return 5
    } else {
        let alreadyStars = 6

        return Math.floor((exp - 15000) / 5000) + alreadyStars
    }
}

export function processWoolGames(json: RawWoolGames): WoolGames {
    const losses = (json.wool_wars?.stats?.games_played ?? 0) - (json.wool_wars?.stats?.wins ?? 0)

    const processed = {
        coins: json.coins ?? 0,
        progression: {
            layers: json.progression?.layers ?? 0,
            experience: json.progression?.experience ?? 0,
            star: getStarForExp(json.progression?.experience ?? 0)
        },
        starFormatted: getFormattedStar(getStarForExp(json.progression?.experience ?? 0)),
        packages: json.packages ?? [],
        cosmetics: {
            barrier: json.barrier ?? '',
            killMessages: json.killmessages ?? '',
            hat: json.hat ?? '',
            deathCry: json.deathcry ?? '',
            projectileTrail: json.projectiletrail ?? '',
        },
        woolWars: {
            selectedClass: json.wool_wars?.selected_class ?? 'None',
            stats: {
                overall: {
                    assists: json.wool_wars?.stats?.assists ?? 0,
                    blocksBroken: json.wool_wars?.stats?.blocks_broken ?? 0,
                    deaths: json.wool_wars?.stats?.deaths ?? 0,
                    gamesPlayed: json.wool_wars?.stats?.games_played ?? 0,
                    kdr: cutOff((json.wool_wars?.stats?.kills || 0) / (json.wool_wars?.stats?.deaths || 1)),
                    kills: json.wool_wars?.stats?.kills ?? 0,
                    losses: losses,
                    powerups: json.wool_wars?.stats?.powerups_gotten ?? 0,
                    wins: json.wool_wars?.stats?.wins ?? 0,
                    wlr: cutOff((json.wool_wars?.stats?.wins || 0) / (losses || 1)),
                    woolPlaced: json.wool_wars?.stats?.wool_placed ?? 0,
                },
                classes: {}
            },
            layouts: json.wool_wars?.layouts,
        }
    }

    for (const clazz of Object.keys(json.wool_wars?.stats?.classes)) {
        let clazzLosses = (json.wool_wars?.stats?.classes[clazz]?.games_played ?? 0) - (json.wool_wars?.stats?.classes[clazz]?.games_played ?? 0)

        processed.woolWars.stats.classes[clazz] = {
            assists: json.wool_wars?.stats?.classes[clazz]?.assists ?? 0,
            blocksBroken: json.wool_wars?.stats?.classes[clazz]?.blocks_broken ?? 0,
            deaths: json.wool_wars?.stats?.classes[clazz]?.deaths ?? 0,
            gamesPlayed: json.wool_wars?.stats?.classes[clazz]?.games_played ?? 0,
            kdr: cutOff((json.wool_wars?.stats?.classes[clazz]?.kills || 0) / (json.wool_wars?.stats?.classes[clazz]?.deaths || 1)),
            kills: json.wool_wars?.stats?.classes[clazz]?.kills ?? 0,
            losses: clazzLosses,
            powerups: json.wool_wars?.stats?.classes[clazz]?.powerups_gotten ?? 0,
            wins: json.wool_wars?.stats?.classes[clazz]?.wins ?? 0,
            wlr: cutOff((json.wool_wars?.stats?.classes[clazz]?.wins || 0) / (clazzLosses || 1)),
            woolPlaced: json.wool_wars?.stats?.classes[clazz]?.wool_placed ?? 0,
        }
    }

    return processed
}