/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { deepAdd, ratio } from '../../../../util/math.js'

export class BedWarsModeItemsCollected {
    public iron: number

    public gold: number

    public diamond: number

    public emerald: number

    public constructor(data: APIData, mode: string) {
        this.iron = data[`${mode}iron_resources_collected_bedwars`] ?? 0
        this.gold = data[`${mode}gold_resources_collected_bedwars`] ?? 0
        this.diamond = data[`${mode}diamond_resources_collected_bedwars`] ?? 0
        this.emerald = data[`${mode}emerald_resources_collected_bedwars`] ?? 0
    }
}

export class BedWarsMode {
    public winstreak: number

    public gamesPlayed: number

    public wins: number

    public losses: number

    public wlr: number

    public kills: number

    public deaths: number

    public kdr: number

    public finalKills: number

    public finalDeaths: number

    public fkdr: number

    public bedsBroken: number

    public bedsLost: number

    public bblr: number

    public itemsCollected: BedWarsModeItemsCollected

    public constructor(data: APIData, mode: string) {
        mode = mode ? `${mode}_` : mode

        this.winstreak = data[`${mode}winstreak`] ?? 0
        this.gamesPlayed = data[`${mode}games_played_bedwars`] ?? 0
        this.kills = data[`${mode}kills_bedwars`] ?? 0
        this.deaths = data[`${mode}deaths_bedwars`] ?? 0
        this.wins = data[`${mode}wins_bedwars`] ?? 0
        this.losses = data[`${mode}losses_bedwars`] ?? 0
        this.finalKills = data[`${mode}final_kills_bedwars`] ?? 0
        this.finalDeaths = data[`${mode}final_deaths_bedwars`] ?? 0
        this.bedsBroken = data[`${mode}beds_broken_bedwars`] ?? 0
        this.bedsLost = data[`${mode}beds_lost_bedwars`] ?? 0

        this.itemsCollected = new BedWarsModeItemsCollected(data, mode)

        BedWarsMode.applyRatios(this)
    }

    public static applyRatios(data: BedWarsMode) {
        data.wlr = ratio(data.wins, data.losses)
        data.kdr = ratio(data.kills, data.deaths)
        data.fkdr = ratio(data.finalKills, data.finalDeaths)
        data.bblr = ratio(data.bedsBroken, data.bedsLost)
    }
}

export class DreamsBedWarsMode extends BedWarsMode {
    public static new(data: APIData, mode: string) {
        const stats = deepAdd(
            new BedWarsMode(data, `eight_two_${mode}`),
            new BedWarsMode(data, `four_four_${mode}`)
        )

        BedWarsMode.applyRatios(stats)
        stats.winstreak = 0
        return stats
    }
}

export class ChallengesBedWars {
    public uniqueChallenges?: number

    public totalChallenges?: number

    public renegade: number

    public warmonger: number

    public selfish: number

    public minimumWage: number

    public assassin: number

    public regularShopper: number

    public invisibleShop: number

    public collector: number

    public woodworker: number

    public bridgingForDummies: number

    public toxicRain: number

    public defuser: number

    public miningFatigue: number

    public ultimateUHC: number

    public sleightOfHand: number

    public weightedItems: number

    public socialDistancing: number

    public swordless: number

    public marksman: number

    public patriot: number

    public stamina: number

    public oldMan: number

    public cappedResources: number

    public redLightGreenLight: number

    public slowReflexes: number

    public pacifist: number

    public masterAssassin: number

    public standingTall: number

    public protectThePresident: number

    public cantTouchThis: number

    public constructor(data: APIData) {
        this.uniqueChallenges = data.bw_unique_challenges_completed ?? 0
        this.totalChallenges = data.total_challenges_completed ?? 0

        this.renegade = data.bw_challenge_no_team_upgrades ?? 0 // Renegade, #1
        this.warmonger = data.bw_challenge_no_utilities ?? 0 // Warmonger, #2
        this.selfish = data.bw_challenge_selfish ?? 0 // Selfish, #3
        this.minimumWage = data.bw_challenge_slow_generator ?? 0 // Minimum Wage, #4
        this.assassin = data.bw_challenge_assassin ?? 0 // Assassin, #5
        this.regularShopper = data.bw_challenge_reset_armor ?? 0 // Regular Shopper, #6
        this.invisibleShop = data.bw_challenge_invisible_shop ?? 0 // Invisible Shop, #7
        this.collector = data.bw_challenge_collector ?? 0 // Collector, #8
        this.woodworker = data.bw_challenge_woodworker ?? 0 // Woodworker, #9
        this.bridgingForDummies = data.bw_challenge_sponge ?? 0 // Bridging for Dummies, #10
        this.toxicRain = data.bw_challenge_toxic_rain ?? 0 // Toxic Rain, #11
        this.defuser = data.bw_challenge_defuser ?? 0 // Defuser, #12
        this.miningFatigue = data.bw_challenge_mining_fatigue ?? 0 // Mining Fatigue, #13
        this.ultimateUHC = data.bw_challenge_no_healing ?? 0 // Ultimate UHC, #14
        this.sleightOfHand = data.bw_challenge_hotbar ?? 0 // Sleight of Hand, #15
        this.weightedItems = data.bw_challenge_weighted_items ?? 0 // Weighted Items, #16
        this.socialDistancing = data.bw_challenge_knockback_stick_only ?? 0 // Social Distancing, #17
        this.swordless = data.bw_challenge_no_swords ?? 0 // Swordless, #18
        this.marksman = data.bw_challenge_archer_only ?? 0 // Marksman, #19
        this.patriot = data.bw_challenge_patriot ?? 0 // Patriot, #20
        this.stamina = data.bw_challenge_stamina ?? 0 // Stamina, #21
        this.oldMan = data.bw_challenge_no_sprint ?? 0 // Old man, #22
        this.cappedResources = data.bw_challenge_capped_resources ?? 0 // Capped resources, #23
        this.redLightGreenLight = data.bw_challenge_stop_light ?? 0 // Red Light, Green Light, #24
        this.slowReflexes = data.bw_challenge_delayed_hitting ?? 0 // Slow Reflexes, #25
        this.pacifist = data.bw_challenge_no_hitting ?? 0 // Pacifist, #26
        this.masterAssassin = data.bw_challenge_master_assassin ?? 0 // Master Assassin, #27
        this.standingTall = data.bw_challenge_no_shift ?? 0 // Standing Tall, #28
        this.protectThePresident = data.bw_challenge_protect_the_president ?? 0 // Protect the President, #29
        this.cantTouchThis = data.bw_challenge_cant_touch_this ?? 0 // Can't touch this, #30
    }
}
