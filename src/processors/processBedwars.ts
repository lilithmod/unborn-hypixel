import { RawBedwars } from '../types/raw/RawBedwars'
import { Bedwars } from '../types/processed/Bedwars'

const EASY_LEVELS = 4;
const EASY_LEVELS_XP = 7000;
const XP_PER_PRESTIGE = 96 * 5000 + EASY_LEVELS_XP;
const LEVELS_PER_PRESTIGE = 100;
const HIGHEST_PRESTIGE = 10;

function getExpForLevel (level: number): number {
    if (level === 0) return 0;
    const respectedLevel = getLevelRespectingPrestige(level);
    if (respectedLevel > EASY_LEVELS) return 5000;
    switch (respectedLevel) {
        case 1:
            return 500;
        case 2:
            return 1000;
        case 3:
            return 2000;
        case 4:
            return 3500;
    }
    return 5000;
}

function getLevelRespectingPrestige (level: number): number {
    if (level > HIGHEST_PRESTIGE * LEVELS_PER_PRESTIGE) {
        return level - HIGHEST_PRESTIGE * LEVELS_PER_PRESTIGE;
    } else {
        return level % LEVELS_PER_PRESTIGE;
    }
}

function getLevelForExp (exp: number) {
    const prestiges = Math.floor(exp / XP_PER_PRESTIGE);
    let level = prestiges * LEVELS_PER_PRESTIGE;
    let expWithoutPrestiges = exp - (prestiges * XP_PER_PRESTIGE);

    for (let i = 1; i <= EASY_LEVELS; ++i) {
        const expForEasyLevel = getExpForLevel(i);
        if (expWithoutPrestiges < expForEasyLevel) {
            break;
        }
        level++;
        expWithoutPrestiges -= expForEasyLevel;
    }
    return level + Math.floor(expWithoutPrestiges / 5000);
}



function getBwFormattedLevel(level) {
    const prestige = getBedWarsPrestige(level)
    switch(prestige) {
        case 'Stone':

            break;
        case 'Iron':

            break;
        case 'Gold':

            break;
        case 'Diamond':

            break;
        case 'Emerald':

            break;
        case 'Sapphire':

            break;
        case 'Ruby':

            break;
        case 'Crystal':

            break;
        case 'Opal':

            break;
        case 'Amethyst':

            break;
        case 'Rainbow':

            break;
        case 'Iron Prime':

            break;
        case 'Gold Prime':

            break;
        case 'Diamond Prime':

            break;
        case 'Emerald Prime':

            break;
        case 'Sapphire Prime':

            break;
        case 'Ruby Prime':

            break;
        case 'Crystal Prime':

            break;
        case 'Opal Prime':

            break;
        case 'Amethyst Prime':

            break;
        case 'Mirror':

                break;
        case 'Light':

            break;
        case 'Dawn':

            break;
        case 'Dusk':

            break;
        case 'Air':

            break;
        case 'Wind':

            break;
        case 'Nebula':

            break;
        case 'Thunder':

            break;
        case 'Earth':

            break;
        case 'Water':

            break;
        case 'Fire':

            break;
    }
}

function getBedWarsPrestige (level: number): string {
    // eslint-disable-next-line max-len
    return ['Stone', 'Iron', 'Gold', 'Diamond', 'Emerald', 'Sapphire', 'Ruby', 'Crystal', 'Opal', 'Amethyst', 'Rainbow', 'Iron Prime', 'Gold Prime', 'Diamond Prime', 'Emerald Prime', 'Sapphire Prime',
        'Ruby Prime', 'Crystal Prime', 'Opal Prime', 'Amethyst Prime', 'Mirror',
        'Light', 'Dawn', 'Dusk', 'Air', 'Wind', 'Nebula', 'Thunder', 'Earth', 'Water', 'Fire'][Math.floor(level / 100)] || 'Rainbow';
}

// ✫
// ✪
// ⚝

export function processBedwars(json: RawBedwars): Bedwars {
    return {
        xp: json.Experience,
        coins: json.coins,
        star: getLevelForExp(json.Experience),
        starFormatted: '',
        overall: {
            games: json.games_played_bedwars ?? 0,
            winstreak: json.winstreak ?? 0,
            wins: json.wins_bedwars ?? 0,
            losses: json.losses_bedwars ?? 0,
            wlr: (json.wins_bedwars || 0) / (json.losses_bedwars || 1),
            finalKills: json.final_kills_bedwars ?? 0,
            finalDeaths: json.final_deaths_bedwars ?? 0,
            fkdr: (json.final_kills_bedwars || 0) / (json.final_deaths_bedwars || 1),
            kills: json.kills_bedwars ?? 0,
            deaths: json.deaths_bedwars ?? 0,
            kdr: (json.kills_bedwars || 0) / (json.deaths_bedwars || 1),
            bedsBroken: json.beds_broken_bedwars ?? 0,
            bedsLost: json.beds_lost_bedwars ?? 0,
            bblr: (json.beds_broken_bedwars || 0) / (json.beds_lost_bedwars || 1),
            itemsCollected: {
                iron: json.iron_resources_collected_bedwars,
                gold: json.gold_resources_collected_bedwars,
                diamond: json.diamond_resources_collected_bedwars,
                emerald: json.emerald_resources_collected_bedwars,
            }
        },
        '4v4': {
            games: json.four_four_games_played_bedwars ?? 0,
            winstreak: json.four_four_winstreak ?? 0,
            wins: json.four_four_wins_bedwars ?? 0,
            losses: json.four_four_losses_bedwars ?? 0,
            wlr: (json.four_four_wins_bedwars || 0) / (json.four_four_losses_bedwars || 1),
            finalKills: json.four_four_final_kills_bedwars ?? 0,
            finalDeaths: json.four_four_final_deaths_bedwars ?? 0,
            fkdr: (json.four_four_final_kills_bedwars || 0) / (json.four_four_final_deaths_bedwars || 1),
            kills: json.four_four_kills_bedwars ?? 0,
            deaths: json.four_four_deaths_bedwars ?? 0,
            kdr: (json.four_four_kills_bedwars || 0) / (json.four_four_deaths_bedwars || 1),
            bedsBroken: json.four_four_beds_broken_bedwars ?? 0,
            bedsLost: json.four_four_beds_lost_bedwars ?? 0,
            bblr: (json.four_four_beds_broken_bedwars || 0) / (json.four_four_beds_lost_bedwars || 1),
            itemsCollected: {
                iron: json.four_four_iron_resources_collected_bedwars,
                gold: json.four_four_gold_resources_collected_bedwars,
                diamond: json.four_four_diamond_resources_collected_bedwars,
                emerald: json.four_four_emerald_resources_collected_bedwars,
            }
        },
        armedDoubles: {
            games: json.eight_two_armed_games_played_bedwars ?? 0,
            winstreak: json.eight_two_armed_winstreak ?? 0,
            wins: json.eight_two_armed_wins_bedwars ?? 0,
            losses: json.eight_two_armed_losses_bedwars ?? 0,
            wlr: (json.eight_two_armed_wins_bedwars || 0) / (json.eight_two_armed_losses_bedwars || 1),
            finalKills: json.eight_two_armed_final_kills_bedwars ?? 0,
            finalDeaths: json.eight_two_armed_final_deaths_bedwars ?? 0,
            fkdr: (json.eight_two_armed_final_kills_bedwars || 0) / (json.eight_two_armed_final_deaths_bedwars || 1),
            kills: json.eight_two_armed_kills_bedwars ?? 0,
            deaths: json.eight_two_armed_deaths_bedwars ?? 0,
            kdr: (json.eight_two_armed_kills_bedwars || 0) / (json.eight_two_armed_deaths_bedwars || 1),
            bedsBroken: json.eight_two_armed_beds_broken_bedwars ?? 0,
            bedsLost: json.eight_two_armed_beds_lost_bedwars ?? 0,
            bblr: (json.eight_two_armed_beds_broken_bedwars || 0) / (json.eight_two_armed_beds_lost_bedwars || 1),
            itemsCollected: {
                iron: json.eight_two_armed_iron_resources_collected_bedwars,
                gold: json.eight_two_armed_gold_resources_collected_bedwars,
                diamond: json.eight_two_armed_diamond_resources_collected_bedwars,
                emerald: json.eight_two_armed_emerald_resources_collected_bedwars,
            }
        },
        armedFours: {
            games: json.four_four_armed_games_played_bedwars ?? 0,
            winstreak: json.four_four_armed_winstreak ?? 0,
            wins: json.four_four_armed_wins_bedwars ?? 0,
            losses: json.four_four_armed_losses_bedwars ?? 0,
            wlr: (json.four_four_armed_wins_bedwars || 0) / (json.four_four_armed_losses_bedwars || 1),
            finalKills: json.four_four_armed_final_kills_bedwars ?? 0,
            finalDeaths: json.four_four_armed_final_deaths_bedwars ?? 0,
            fkdr: (json.four_four_armed_final_kills_bedwars || 0) / (json.four_four_armed_final_deaths_bedwars || 1),
            kills: json.four_four_armed_kills_bedwars ?? 0,
            deaths: json.four_four_armed_deaths_bedwars ?? 0,
            kdr: (json.four_four_armed_kills_bedwars || 0) / (json.four_four_armed_deaths_bedwars || 1),
            bedsBroken: json.four_four_armed_beds_broken_bedwars ?? 0,
            bedsLost: json.four_four_armed_beds_lost_bedwars ?? 0,
            bblr: (json.four_four_armed_beds_broken_bedwars || 0) / (json.four_four_armed_beds_lost_bedwars || 1),
            itemsCollected: {
                iron: json.four_four_armed_iron_resources_collected_bedwars,
                gold: json.four_four_armed_gold_resources_collected_bedwars,
                diamond: json.four_four_armed_diamond_resources_collected_bedwars,
                emerald: json.four_four_armed_emerald_resources_collected_bedwars,
            }
        },
        castle: {
            games: json.castle_games_played_bedwars ?? 0,
            winstreak: json.castle_winstreak ?? 0,
            wins: json.castle_wins_bedwars ?? 0,
            losses: json.castle_losses_bedwars ?? 0,
            wlr: (json.castle_wins_bedwars || 0) / (json.castle_losses_bedwars || 1),
            finalKills: json.castle_final_kills_bedwars ?? 0,
            finalDeaths: json.castle_final_deaths_bedwars ?? 0,
            fkdr: (json.castle_final_kills_bedwars || 0) / (json.castle_final_deaths_bedwars || 1),
            kills: json.castle_kills_bedwars ?? 0,
            deaths: json.castle_deaths_bedwars ?? 0,
            kdr: (json.castle_kills_bedwars || 0) / (json.castle_deaths_bedwars || 1),
            bedsBroken: json.castle_beds_broken_bedwars ?? 0,
            bedsLost: json.castle_beds_lost_bedwars ?? 0,
            bblr: (json.castle_beds_broken_bedwars || 0) / (json.castle_beds_lost_bedwars || 1),
            itemsCollected: {
                iron: json.castle_iron_resources_collected_bedwars,
                gold: json.castle_gold_resources_collected_bedwars,
                diamond: json.castle_diamond_resources_collected_bedwars,
                emerald: json.castle_emerald_resources_collected_bedwars,
            }
        },
        doubles: {
            games: json.eight_two_games_played_bedwars ?? 0,
            winstreak: json.eight_two_winstreak ?? 0,
            wins: json.eight_two_wins_bedwars ?? 0,
            losses: json.eight_two_losses_bedwars ?? 0,
            wlr: (json.eight_two_wins_bedwars || 0) / (json.eight_two_losses_bedwars || 1),
            finalKills: json.eight_two_final_kills_bedwars ?? 0,
            finalDeaths: json.eight_two_final_deaths_bedwars ?? 0,
            fkdr: (json.eight_two_final_kills_bedwars || 0) / (json.eight_two_final_deaths_bedwars || 1),
            kills: json.eight_two_kills_bedwars ?? 0,
            deaths: json.eight_two_deaths_bedwars ?? 0,
            kdr: (json.eight_two_kills_bedwars || 0) / (json.eight_two_deaths_bedwars || 1),
            bedsBroken: json.eight_two_beds_broken_bedwars ?? 0,
            bedsLost: json.eight_two_beds_lost_bedwars ?? 0,
            bblr: (json.eight_two_beds_broken_bedwars || 0) / (json.eight_two_beds_lost_bedwars || 1),
            itemsCollected: {
                iron: json.eight_two_iron_resources_collected_bedwars,
                gold: json.eight_two_gold_resources_collected_bedwars,
                diamond: json.eight_two_diamond_resources_collected_bedwars,
                emerald: json.eight_two_emerald_resources_collected_bedwars,
            }
        },
        fours: {
            games: json.four_four_games_played_bedwars ?? 0,
            winstreak: json.four_four_winstreak ?? 0,
            wins: json.four_four_wins_bedwars ?? 0,
            losses: json.four_four_losses_bedwars ?? 0,
            wlr: (json.four_four_wins_bedwars || 0) / (json.four_four_losses_bedwars || 1),
            finalKills: json.four_four_final_kills_bedwars ?? 0,
            finalDeaths: json.four_four_final_deaths_bedwars ?? 0,
            fkdr: (json.four_four_final_kills_bedwars || 0) / (json.four_four_final_deaths_bedwars || 1),
            kills: json.four_four_kills_bedwars ?? 0,
            deaths: json.four_four_deaths_bedwars ?? 0,
            kdr: (json.four_four_kills_bedwars || 0) / (json.four_four_deaths_bedwars || 1),
            bedsBroken: json.four_four_beds_broken_bedwars ?? 0,
            bedsLost: json.four_four_beds_lost_bedwars ?? 0,
            bblr: (json.four_four_beds_broken_bedwars || 0) / (json.four_four_beds_lost_bedwars || 1),
            itemsCollected: {
                iron: json.four_four_iron_resources_collected_bedwars,
                gold: json.four_four_gold_resources_collected_bedwars,
                diamond: json.four_four_diamond_resources_collected_bedwars,
                emerald: json.four_four_emerald_resources_collected_bedwars,
            }
        },
        luckyDoubles: {
            games: json.eight_two_lucky_games_played_bedwars ?? 0,
            winstreak: json.eight_two_lucky_winstreak ?? 0,
            wins: json.eight_two_lucky_wins_bedwars ?? 0,
            losses: json.eight_two_lucky_losses_bedwars ?? 0,
            wlr: (json.eight_two_lucky_wins_bedwars || 0) / (json.eight_two_lucky_losses_bedwars || 1),
            finalKills: json.eight_two_lucky_final_kills_bedwars ?? 0,
            finalDeaths: json.eight_two_lucky_final_deaths_bedwars ?? 0,
            fkdr: (json.eight_two_lucky_final_kills_bedwars || 0) / (json.eight_two_lucky_final_deaths_bedwars || 1),
            kills: json.eight_two_lucky_kills_bedwars ?? 0,
            deaths: json.eight_two_lucky_deaths_bedwars ?? 0,
            kdr: (json.eight_two_lucky_kills_bedwars || 0) / (json.eight_two_lucky_deaths_bedwars || 1),
            bedsBroken: json.eight_two_lucky_beds_broken_bedwars ?? 0,
            bedsLost: json.eight_two_lucky_beds_lost_bedwars ?? 0,
            bblr: (json.eight_two_lucky_beds_broken_bedwars || 0) / (json.eight_two_lucky_beds_lost_bedwars || 1),
            itemsCollected: {
                iron: json.eight_two_lucky_iron_resources_collected_bedwars,
                gold: json.eight_two_lucky_gold_resources_collected_bedwars,
                diamond: json.eight_two_lucky_diamond_resources_collected_bedwars,
                emerald: json.eight_two_lucky_emerald_resources_collected_bedwars,
            }
        },
        luckyFours: {
            games: json.four_four_lucky_games_played_bedwars ?? 0,
            winstreak: json.four_four_lucky_winstreak ?? 0,
            wins: json.four_four_lucky_wins_bedwars ?? 0,
            losses: json.four_four_lucky_losses_bedwars ?? 0,
            wlr: (json.four_four_lucky_wins_bedwars || 0) / (json.four_four_lucky_losses_bedwars || 1),
            finalKills: json.four_four_lucky_final_kills_bedwars ?? 0,
            finalDeaths: json.four_four_lucky_final_deaths_bedwars ?? 0,
            fkdr: (json.four_four_lucky_final_kills_bedwars || 0) / (json.four_four_lucky_final_deaths_bedwars || 1),
            kills: json.four_four_lucky_kills_bedwars ?? 0,
            deaths: json.four_four_lucky_deaths_bedwars ?? 0,
            kdr: (json.four_four_lucky_kills_bedwars || 0) / (json.four_four_lucky_deaths_bedwars || 1),
            bedsBroken: json.four_four_lucky_beds_broken_bedwars ?? 0,
            bedsLost: json.four_four_lucky_beds_lost_bedwars ?? 0,
            bblr: (json.four_four_lucky_beds_broken_bedwars || 0) / (json.four_four_lucky_beds_lost_bedwars || 1),
            itemsCollected: {
                iron: json.four_four_lucky_iron_resources_collected_bedwars,
                gold: json.four_four_lucky_gold_resources_collected_bedwars,
                diamond: json.four_four_lucky_diamond_resources_collected_bedwars,
                emerald: json.four_four_lucky_emerald_resources_collected_bedwars,
            }
        },
        rushDoubles: {
            games: json.eight_two_rush_games_played_bedwars ?? 0,
            winstreak: json.eight_two_rush_winstreak ?? 0,
            wins: json.eight_two_rush_wins_bedwars ?? 0,
            losses: json.eight_two_rush_losses_bedwars ?? 0,
            wlr: (json.eight_two_rush_wins_bedwars || 0) / (json.eight_two_rush_losses_bedwars || 1),
            finalKills: json.eight_two_rush_final_kills_bedwars ?? 0,
            finalDeaths: json.eight_two_rush_final_deaths_bedwars ?? 0,
            fkdr: (json.eight_two_rush_final_kills_bedwars || 0) / (json.eight_two_rush_final_deaths_bedwars || 1),
            kills: json.eight_two_rush_kills_bedwars ?? 0,
            deaths: json.eight_two_rush_deaths_bedwars ?? 0,
            kdr: (json.eight_two_rush_kills_bedwars || 0) / (json.eight_two_rush_deaths_bedwars || 1),
            bedsBroken: json.eight_two_rush_beds_broken_bedwars ?? 0,
            bedsLost: json.eight_two_rush_beds_lost_bedwars ?? 0,
            bblr: (json.eight_two_rush_beds_broken_bedwars || 0) / (json.eight_two_rush_beds_lost_bedwars || 1),
            itemsCollected: {
                iron: json.eight_two_rush_iron_resources_collected_bedwars,
                gold: json.eight_two_rush_gold_resources_collected_bedwars,
                diamond: json.eight_two_rush_diamond_resources_collected_bedwars,
                emerald: json.eight_two_rush_emerald_resources_collected_bedwars,
            }
        },
        rushFours: {
            games: json.four_four_rush_games_played_bedwars ?? 0,
            winstreak: json.four_four_rush_winstreak ?? 0,
            wins: json.four_four_rush_wins_bedwars ?? 0,
            losses: json.four_four_rush_losses_bedwars ?? 0,
            wlr: (json.four_four_rush_wins_bedwars || 0) / (json.four_four_rush_losses_bedwars || 1),
            finalKills: json.four_four_rush_final_kills_bedwars ?? 0,
            finalDeaths: json.four_four_rush_final_deaths_bedwars ?? 0,
            fkdr: (json.four_four_rush_final_kills_bedwars || 0) / (json.four_four_rush_final_deaths_bedwars || 1),
            kills: json.four_four_rush_kills_bedwars ?? 0,
            deaths: json.four_four_rush_deaths_bedwars ?? 0,
            kdr: (json.four_four_rush_kills_bedwars || 0) / (json.four_four_rush_deaths_bedwars || 1),
            bedsBroken: json.four_four_rush_beds_broken_bedwars ?? 0,
            bedsLost: json.four_four_rush_beds_lost_bedwars ?? 0,
            bblr: (json.four_four_rush_beds_broken_bedwars || 0) / (json.four_four_rush_beds_lost_bedwars || 1),
            itemsCollected: {
                iron: json.four_four_rush_iron_resources_collected_bedwars,
                gold: json.four_four_rush_gold_resources_collected_bedwars,
                diamond: json.four_four_rush_diamond_resources_collected_bedwars,
                emerald: json.four_four_rush_emerald_resources_collected_bedwars,
            }
        },
        rushSolo: {
            games: json.eight_one_rush_games_played_bedwars ?? 0,
            winstreak: json.eight_one_rush_winstreak ?? 0,
            wins: json.eight_one_rush_wins_bedwars ?? 0,
            losses: json.eight_one_rush_losses_bedwars ?? 0,
            wlr: (json.eight_one_rush_wins_bedwars || 0) / (json.eight_one_rush_losses_bedwars || 1),
            finalKills: json.eight_one_rush_final_kills_bedwars ?? 0,
            finalDeaths: json.eight_one_rush_final_deaths_bedwars ?? 0,
            fkdr: (json.eight_one_rush_final_kills_bedwars || 0) / (json.eight_one_rush_final_deaths_bedwars || 1),
            kills: json.eight_one_rush_kills_bedwars ?? 0,
            deaths: json.eight_one_rush_deaths_bedwars ?? 0,
            kdr: (json.eight_one_rush_kills_bedwars || 0) / (json.eight_one_rush_deaths_bedwars || 1),
            bedsBroken: json.eight_one_rush_beds_broken_bedwars ?? 0,
            bedsLost: json.eight_one_rush_beds_lost_bedwars ?? 0,
            bblr: (json.eight_one_rush_beds_broken_bedwars || 0) / (json.eight_one_rush_beds_lost_bedwars || 1),
            itemsCollected: {
                iron: json.eight_one_rush_iron_resources_collected_bedwars,
                gold: json.eight_one_rush_gold_resources_collected_bedwars,
                diamond: json.eight_one_rush_diamond_resources_collected_bedwars,
                emerald: json.eight_one_rush_emerald_resources_collected_bedwars,
            }
        },
        solo: {
            games: json.eight_one_games_played_bedwars ?? 0,
            winstreak: json.eight_one_winstreak ?? 0,
            wins: json.eight_one_wins_bedwars ?? 0,
            losses: json.eight_one_losses_bedwars ?? 0,
            wlr: (json.eight_one_wins_bedwars || 0) / (json.eight_one_losses_bedwars || 1),
            finalKills: json.eight_one_final_kills_bedwars ?? 0,
            finalDeaths: json.eight_one_final_deaths_bedwars ?? 0,
            fkdr: (json.eight_one_final_kills_bedwars || 0) / (json.eight_one_final_deaths_bedwars || 1),
            kills: json.eight_one_kills_bedwars ?? 0,
            deaths: json.eight_one_deaths_bedwars ?? 0,
            kdr: (json.eight_one_kills_bedwars || 0) / (json.eight_one_deaths_bedwars || 1),
            bedsBroken: json.eight_one_beds_broken_bedwars ?? 0,
            bedsLost: json.eight_one_beds_lost_bedwars ?? 0,
            bblr: (json.eight_one_beds_broken_bedwars || 0) / (json.eight_one_beds_lost_bedwars || 1),
            itemsCollected: {
                iron: json.eight_one_iron_resources_collected_bedwars,
                gold: json.eight_one_gold_resources_collected_bedwars,
                diamond: json.eight_one_diamond_resources_collected_bedwars,
                emerald: json.eight_one_emerald_resources_collected_bedwars,
            }
        },
        threes: {
            games: json.four_three_games_played_bedwars ?? 0,
            winstreak: json.four_three_winstreak ?? 0,
            wins: json.four_three_wins_bedwars ?? 0,
            losses: json.four_three_losses_bedwars ?? 0,
            wlr: (json.four_three_wins_bedwars || 0) / (json.four_three_losses_bedwars || 1),
            finalKills: json.four_three_final_kills_bedwars ?? 0,
            finalDeaths: json.four_three_final_deaths_bedwars ?? 0,
            fkdr: (json.four_three_final_kills_bedwars || 0) / (json.four_three_final_deaths_bedwars || 1),
            kills: json.four_three_kills_bedwars ?? 0,
            deaths: json.four_three_deaths_bedwars ?? 0,
            kdr: (json.four_three_kills_bedwars || 0) / (json.four_three_deaths_bedwars || 1),
            bedsBroken: json.four_three_beds_broken_bedwars ?? 0,
            bedsLost: json.four_three_beds_lost_bedwars ?? 0,
            bblr: (json.four_three_beds_broken_bedwars || 0) / (json.four_three_beds_lost_bedwars || 1),
            itemsCollected: {
                iron: json.four_three_iron_resources_collected_bedwars,
                gold: json.four_three_gold_resources_collected_bedwars,
                diamond: json.four_three_diamond_resources_collected_bedwars,
                emerald: json.four_three_emerald_resources_collected_bedwars,
            }
        },
        ultimateDoubles: {
            games: json.eight_two_ultimate_games_played_bedwars ?? 0,
            winstreak: json.eight_two_ultimate_winstreak ?? 0,
            wins: json.eight_two_ultimate_wins_bedwars ?? 0,
            losses: json.eight_two_ultimate_losses_bedwars ?? 0,
            wlr: (json.eight_two_ultimate_wins_bedwars || 0) / (json.eight_two_ultimate_losses_bedwars || 1),
            finalKills: json.eight_two_ultimate_final_kills_bedwars ?? 0,
            finalDeaths: json.eight_two_ultimate_final_deaths_bedwars ?? 0,
            fkdr: (json.eight_two_ultimate_final_kills_bedwars || 0) / (json.eight_two_ultimate_final_deaths_bedwars || 1),
            kills: json.eight_two_ultimate_kills_bedwars ?? 0,
            deaths: json.eight_two_ultimate_deaths_bedwars ?? 0,
            kdr: (json.eight_two_ultimate_kills_bedwars || 0) / (json.eight_two_ultimate_deaths_bedwars || 1),
            bedsBroken: json.eight_two_ultimate_beds_broken_bedwars ?? 0,
            bedsLost: json.eight_two_ultimate_beds_lost_bedwars ?? 0,
            bblr: (json.eight_two_ultimate_beds_broken_bedwars || 0) / (json.eight_two_ultimate_beds_lost_bedwars || 1),
            itemsCollected: {
                iron: json.eight_two_ultimate_iron_resources_collected_bedwars,
                gold: json.eight_two_ultimate_gold_resources_collected_bedwars,
                diamond: json.eight_two_ultimate_diamond_resources_collected_bedwars,
                emerald: json.eight_two_ultimate_emerald_resources_collected_bedwars,
            }
        },
        ultimateFours: {
            games: json.four_four_ultimate_games_played_bedwars ?? 0,
            winstreak: json.four_four_ultimate_winstreak ?? 0,
            wins: json.four_four_ultimate_wins_bedwars ?? 0,
            losses: json.four_four_ultimate_losses_bedwars ?? 0,
            wlr: (json.four_four_ultimate_wins_bedwars || 0) / (json.four_four_ultimate_losses_bedwars || 1),
            finalKills: json.four_four_ultimate_final_kills_bedwars ?? 0,
            finalDeaths: json.four_four_ultimate_final_deaths_bedwars ?? 0,
            fkdr: (json.four_four_ultimate_final_kills_bedwars || 0) / (json.four_four_ultimate_final_deaths_bedwars || 1),
            kills: json.four_four_ultimate_kills_bedwars ?? 0,
            deaths: json.four_four_ultimate_deaths_bedwars ?? 0,
            kdr: (json.four_four_ultimate_kills_bedwars || 0) / (json.four_four_ultimate_deaths_bedwars || 1),
            bedsBroken: json.four_four_ultimate_beds_broken_bedwars ?? 0,
            bedsLost: json.four_four_ultimate_beds_lost_bedwars ?? 0,
            bblr: (json.four_four_ultimate_beds_broken_bedwars || 0) / (json.four_four_ultimate_beds_lost_bedwars || 1),
            itemsCollected: {
                iron: json.four_four_ultimate_iron_resources_collected_bedwars,
                gold: json.four_four_ultimate_gold_resources_collected_bedwars,
                diamond: json.four_four_ultimate_diamond_resources_collected_bedwars,
                emerald: json.four_four_ultimate_emerald_resources_collected_bedwars,
            }
        },
        ultimateSolo: {
            games: json.eight_one_ultimate_games_played_bedwars ?? 0,
            winstreak: json.eight_one_ultimate_winstreak ?? 0,
            wins: (json as any).eight_one_ultimate_wins ?? 0,
            losses: json.eight_one_ultimate_losses_bedwars ?? 0,
            wlr: ((json as any).eight_one_ultimate_wins_bedwars / json.eight_one_ultimate_losses_bedwars) ?? 0,
            finalKills: json.eight_one_ultimate_final_kills_bedwars ?? 0,
            finalDeaths: json.eight_one_ultimate_final_deaths_bedwars ?? 0,
            fkdr: (json.eight_one_ultimate_final_kills_bedwars || 0) / (json.eight_one_ultimate_final_deaths_bedwars || 1),
            kills: json.eight_one_ultimate_kills_bedwars ?? 0,
            deaths: json.eight_one_ultimate_deaths_bedwars ?? 0,
            kdr: (json.eight_one_ultimate_kills_bedwars || 0) / (json.eight_one_ultimate_deaths_bedwars || 1),
            bedsBroken: json.eight_one_ultimate_beds_broken_bedwars ?? 0,
            bedsLost: json.eight_one_ultimate_beds_lost_bedwars ?? 0,
            bblr: (json.eight_one_ultimate_beds_broken_bedwars || 0) / (json.eight_one_ultimate_beds_lost_bedwars || 1),
            itemsCollected: {
                iron: json.eight_one_ultimate_iron_resources_collected_bedwars,
                gold: json.eight_one_ultimate_gold_resources_collected_bedwars,
                diamond: (json as any).eight_one_ultimate_diamond_resources_collected_bedwars,
                emerald: (json as any).eight_one_ultimate_emerald_resources_collected_bedwars,
            }
        },
        voidlessDoubles: {
            games: json.eight_two_voidless_games_played_bedwars ?? 0,
            winstreak: json.eight_two_voidless_winstreak ?? 0,
            wins: json.eight_two_voidless_wins_bedwars ?? 0,
            losses: json.eight_two_voidless_losses_bedwars ?? 0,
            wlr: (json.eight_two_voidless_wins_bedwars || 0) / (json.eight_two_voidless_losses_bedwars || 1),
            finalKills: json.eight_two_voidless_final_kills_bedwars ?? 0,
            finalDeaths: json.eight_two_voidless_final_deaths_bedwars ?? 0,
            fkdr: (json.eight_two_voidless_final_kills_bedwars || 0) / (json.eight_two_voidless_final_deaths_bedwars || 1),
            kills: json.eight_two_voidless_kills_bedwars ?? 0,
            deaths: json.eight_two_voidless_deaths_bedwars ?? 0,
            kdr: (json.eight_two_voidless_kills_bedwars || 0) / (json.eight_two_voidless_deaths_bedwars || 1),
            bedsBroken: json.eight_two_voidless_beds_broken_bedwars ?? 0,
            bedsLost: json.eight_two_voidless_beds_lost_bedwars ?? 0,
            bblr: (json.eight_two_voidless_beds_broken_bedwars || 0) / (json.eight_two_voidless_beds_lost_bedwars || 1),
            itemsCollected: {
                iron: json.eight_two_voidless_iron_resources_collected_bedwars,
                gold: json.eight_two_voidless_gold_resources_collected_bedwars,
                diamond: json.eight_two_voidless_diamond_resources_collected_bedwars,
                emerald: json.eight_two_voidless_emerald_resources_collected_bedwars,
            }
        },
        voidlessFours: {
            games: json.four_four_voidless_games_played_bedwars ?? 0,
            winstreak: json.four_four_voidless_winstreak ?? 0,
            wins: json.four_four_voidless_wins_bedwars ?? 0,
            losses: json.four_four_voidless_losses_bedwars ?? 0,
            wlr: (json.four_four_voidless_wins_bedwars || 0) / (json.four_four_voidless_losses_bedwars || 1),
            finalKills: json.four_four_voidless_final_kills_bedwars ?? 0,
            finalDeaths: json.four_four_voidless_final_deaths_bedwars ?? 0,
            fkdr: (json.four_four_voidless_final_kills_bedwars || 0) / (json.four_four_voidless_final_deaths_bedwars || 1),
            kills: json.four_four_voidless_kills_bedwars ?? 0,
            deaths: json.four_four_voidless_deaths_bedwars ?? 0,
            kdr: (json.four_four_voidless_kills_bedwars || 0) / (json.four_four_voidless_deaths_bedwars || 1),
            bedsBroken: json.four_four_voidless_beds_broken_bedwars ?? 0,
            bedsLost: json.four_four_voidless_beds_lost_bedwars ?? 0,
            bblr: (json.four_four_voidless_beds_broken_bedwars || 0) / (json.four_four_voidless_beds_lost_bedwars || 1),
            itemsCollected: {
                iron: json.four_four_voidless_iron_resources_collected_bedwars,
                gold: json.four_four_voidless_gold_resources_collected_bedwars,
                diamond: json.four_four_voidless_diamond_resources_collected_bedwars,
                emerald: json.four_four_voidless_emerald_resources_collected_bedwars,
            }
        }
    }
}