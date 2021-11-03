import { RawMurderMystery } from '../types/raw/RawMurderMystery'
import { MurderMystery } from '../types/processed/MurderMystery'

export function processMurderMystery(json: RawMurderMystery): MurderMystery {
    return {
        activeCosmetics: {
            animatedHat: json.active_animated_hat ?? '',
            deathCry: json.active_deathcry ?? '',
            gesture: json.active_gesture ?? '',
            killNote: json.active_kill_note ?? '',
            knifeSkin: json.active_knife_skin ?? '',
            lastWords: json.active_last_words ?? '',
            projectileTrail: json.active_projectile_trail ?? '',
            victoryDance: json.active_victory_dance ?? ''
        },
        alphaChance: json.alpha_chance ?? 0,
        books: json.murdermystery_books ?? [],
        bowKills: json.bow_kills ?? 0,
        chestHistory: json.mm_chest_history ?? [],
        chestHistoryNew: json.chest_history_new ?? [],
        chests: json.mm_chests ?? 0,
        coins: json.coins ?? 0,
        coinsPickedUp: json.coins_pickedup ?? 0,
        deaths: json.deaths ?? 0,
        detectiveChance: json.detective_chance ?? 0,
        detectiveWins: json.detective_wins ?? 0,
        gamesPlayed: json.games ?? 0,
        grantedChests: json.granted_chests ?? 0,
        kills: json.kills ?? 0,
        killsAsInfected: json.kills_as_infected ?? 0,
        killsAsMurderer: json.kills_as_murderer ?? 0,
        killsAsSurvivor: json.kills_as_survivor ?? 0,
        knifeKills: json.knife_kills ?? 0,
        murdererChance: json.murderer_chance ?? 0,
        murdererWins: json.murderer_wins ?? 0,
        openedChests: json.MurderMystery_openedChests ?? 0,
        packages: json.packages ?? [],
        quickestDetectiveWinTime: json.quickest_detective_win_time_seconds ?? 0,
        quickestMurdererWinTime: json.quickest_murderer_win_time_seconds ?? 0,
        quickestShowdownWinTime: json.quickest_showdown_win_time_seconds ?? 0,
        shopSort: json.shop_sort ?? '',
        showQueueBook: json.showqueuebook ?? false,
        showdownPotg: json.showdown_potg ?? 0,
        suicides: json.suicides ?? 0,
        survivorWins: json.survivor_wins ?? 0,
        thrownKnifeKills: json.thrown_knife_kills ?? 0,
        timesLastAlive: json.last_one_alive ?? 0,
        timesWasHero: json.was_hero ?? 0,
        totalTimeSurvived: json.total_time_survived_seconds ?? 0,
        trapKills: json.trap_kills ?? 0,
        wins: json.wins ?? 0
    }
}