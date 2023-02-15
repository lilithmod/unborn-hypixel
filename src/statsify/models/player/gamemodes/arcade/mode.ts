/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { EasterSimulator, GrinchSimulator, HalloweenSimulator, ScubaSimulator, } from './seasonal-mode'
import { add, deepAdd, deepSub, ratio, sub } from '../../../../util/math.js'

export class BlockingDead {
    public wins: number

    public kills: number

    public headshots: number

    public constructor(data: APIData) {
        this.wins = data.wins_dayone
        this.kills = data.kills_dayone
        this.headshots = data.headshots_dayone
    }
}

export class BountyHunters {
    public wins: number

    public kills: number

    public bowKills: number

    public swordKills: number

    public deaths: number

    public kdr: number

    public bountyKills: number

    public constructor(data: APIData) {
        this.wins = data.wins_oneinthequiver
        this.kills = data.kills_oneinthequiver
        this.bowKills = data.bow_kills_oneinthequiver
        this.swordKills = data.sword_kills_oneinthequiver
        this.deaths = data.deaths_oneinthequiver
        this.kdr = ratio(this.kills, this.deaths)
        this.bountyKills = data.bounty_kills_oneinthequiver
    }
}

export class CaptureTheWool {
    public kills: number

    public captures: number

    public constructor(ap: APIData) {
        this.kills = ap.arcade_ctw_slayer
        this.captures = ap.arcade_ctw_oh_sheep
    }
}

export class CreeperAttack {
    public maxWave: number

    public constructor(data: APIData) {
        this.maxWave = data.max_wave
    }
}

export class DragonWars {
    public wins: number

    public kills: number

    public mounts: number

    public constructor(data: APIData, ap: APIData) {
        this.wins = data.wins_dragonwars2
        this.kills = data.kills_dragonwars2
        this.mounts = ap.arcade_dw_dragonborn
    }
}

export class EnderSpleef {
    public wins: number

    public trail: string

    public blocksBroken: number

    public tripleShot: number

    public bigShot: number

    public powerupActivations: number

    public constructor(data: APIData) {
        this.wins = data.wins_ender
        this.trail = data.enderspleef_trail || 'none'
        this.blocksBroken = data.blocks_destroyed_ender

        this.powerupActivations = data.powerup_activations_ender
        this.bigShot = data.bigshot_powerup_activations_ender
        this.tripleShot = data.tripleshot_powerup_activations_ender
    }
}

export class FarmHunt {
    public wins: number

    public animalWins: number

    public hunterWins: number

    public kills: number

    public animalKills: number

    public hunterKills: number

    public tauntsUsed: number

    public poopCollected: number

    public constructor(data: APIData) {
        this.wins = data.wins_farm_hunt
        this.animalWins = data.animal_wins_farm_hunt
        this.hunterWins = data.hunter_wins_farm_hunt
        this.kills = data.kills_farm_hunt
        this.animalKills = data.animal_kills_farm_hunt
        this.hunterKills = data.hunter_kills_farm_hunt
        this.poopCollected = add(data.poop_collected, data.poop_collected_farm_hunt)
        this.tauntsUsed = data.taunts_used_farm_hunt
    }
}

export class Football {
    public wins: number

    public goals: number

    public kicks: number

    public powerKicks: number

    public constructor(data: APIData) {
        this.wins = data.wins_soccer
        this.goals = data.goals_soccer
        this.kicks = data.kicks_soccer
        this.powerKicks = data.powerkicks_soccer
    }
}

export class GalaxyWars {
    public wins: number

    public kills: number

    public deaths: number

    public kdr: number

    public empireKills: number

    public rebelKills: number

    public constructor(data: APIData) {
        this.wins = data.sw_game_wins
        this.kills = data.sw_kills
        this.deaths = data.sw_deaths
        this.kdr = ratio(this.kills, this.deaths)
        this.empireKills = data.sw_empire_kills
        this.rebelKills = data.sw_rebel_kills
    }
}

export class HideAndSeekMode {
    public wins: number

    public seekerWins: number

    public hiderWins: number

    public constructor(data: APIData, mode: string) {
        this.seekerWins = data[`${mode}_seeker_wins_hide_and_seek`]
        this.hiderWins = data[`${mode}_hider_wins_hide_and_seek`]

        this.wins = add(this.seekerWins, this.hiderWins)
    }
}

export class HideAndSeek {
    public overall: HideAndSeekMode

    public propHunt: HideAndSeekMode

    public partyPooper: HideAndSeekMode

    public kills: number

    public objectivesCompleted: number

    public constructor(data: APIData, ap: APIData) {
        this.propHunt = new HideAndSeekMode(data, 'prop_hunt')
        this.partyPooper = new HideAndSeekMode(data, 'party_pooper')
        this.overall = deepAdd(this.propHunt, this.partyPooper)

        this.kills = ap.arcade_hide_and_seek_hider_kills
        this.objectivesCompleted = ap.arcade_hide_and_seek_master_hider
    }
}

export class HoleInTheWall {
    public wins: number

    public wallsFaced: number

    public highestScoreQualifications: number

    public highestScoreFinals: number

    public constructor(data: APIData) {
        this.wins = data.wins_hole_in_the_wall
        this.wallsFaced = data.rounds_hole_in_the_wall
        this.highestScoreQualifications = data.hitw_record_q
        this.highestScoreFinals = data.hitw_record_f
    }
}

export class HypixelSays {
    public points: number

    public roundsWon: number

    public wins: number

    public maxScore: number

    public constructor(data: APIData) {
        this.points = add(data.rounds_simon_says, data.rounds_santa_says)
        this.roundsWon = add(data.round_wins_simon_says, data.round_wins_santa_says)
        this.wins = add(data.wins_simon_says, data.wins_santa_says)
        this.maxScore = Math.max(
            data.top_score_simon_says ?? 0,
            data.top_score_santa_says ?? 0
        )
    }
}

export class MiniWalls {
    public kit: string

    public wins: number

    public kills: number

    public deaths: number

    public kdr: number

    public finalKills: number

    public witherDamage: number

    public witherKills: number

    public constructor(data: APIData) {
        this.kit = data.miniwalls_activeKit || 'soldier'
        this.wins = data.wins_mini_walls
        this.kills = data.kills_mini_walls
        this.deaths = data.deaths_mini_walls
        this.kdr = ratio(this.kills, this.deaths)
        this.finalKills = data.final_kills_mini_walls
        this.witherDamage = data.wither_damage_mini_walls
        this.witherKills = data.wither_kills_mini_walls
    }
}

export class PartyGames {
    public wins: number

    public starsEarned: number

    public roundsWon: number

    public animalSlaughterWins: number

    public anvilSpleefWins: number

    public bombardmentWins: number

    public chickenRingsWins: number

    public diveWins: number

    public highGroundWins: number

    public hoeHoeHoeWins: number

    public jigsawRushWins: number

    public jungleJumpWins: number

    public labEscapeWins: number

    public lawnMoowerWins: number

    public minecartRacingWins: number

    public rpg16Wins: number

    public spiderMazeWins: number

    public theFloorIsLavaWins: number

    public avalancheWins: number

    public volcanoWins: number

    public pigFishingWins: number

    public trampolinioWins: number

    public pigJoustingWins: number

    public workshopWins: number

    public shootingRangeWins: number

    public frozenFloorWins: number

    public cannonPaintingWins: number

    public fireLeapersWins: number

    public superSheepWins: number

    public constructor(data: APIData) {
        this.wins = add(data.wins_party, data.wins_party_2, data.wins_party_3)
        this.starsEarned = data.total_stars_party
        this.roundsWon = data.round_wins_party

        this.animalSlaughterWins = data?.animal_slaughter_round_wins_party

        this.anvilSpleefWins = data?.anvil_spleef_round_wins_party

        this.bombardmentWins = data?.bombardment_round_wins_party

        this.chickenRingsWins = data?.chicken_rings_round_wins_party

        this.diveWins = data?.dive_round_wins_party

        this.highGroundWins = data?.high_ground_round_wins_party

        this.hoeHoeHoeWins = data?.hoe_hoe_hoe_round_wins_party

        this.jungleJumpWins = data?.jungle_jump_round_wins_party

        this.labEscapeWins = data?.lab_escape_round_wins_party

        this.lawnMoowerWins = data?.lawn_moower_round_wins_party

        this.minecartRacingWins = data?.minecart_racing_round_wins_party

        this.rpg16Wins = data?.rpg_16_round_wins_party

        this.spiderMazeWins = data?.spider_maze_round_wins_party

        this.theFloorIsLavaWins = data?.the_floor_is_lava_round_wins_party

        this.avalancheWins = data?.avalanche_round_wins_party

        this.volcanoWins = data?.volcano_round_wins_party

        this.pigFishingWins = data?.pig_fishing_round_wins_party

        this.pigJoustingWins = data?.pig_jousting_round_wins_party

        this.trampolinioWins = data?.trampolinio_round_wins_party

        this.workshopWins = data?.workshop_round_wins_party

        this.shootingRangeWins = data?.shooting_range_round_wins_party

        this.frozenFloorWins = data?.frozen_floor_round_wins_party

        this.cannonPaintingWins = data?.cannon_painting_round_wins_party

        this.fireLeapersWins = data?.fire_leapers_round_wins_party

        this.superSheepWins = data?.super_sheep_round_wins_party
    }
}

export class PixelPainters {
    public wins: number

    public constructor(data: APIData) {
        this.wins = data.wins_draw_their_thing
    }
}

export class PixelPartyMode {
    public wins: number

    public gamesPlayed: number

    public losses: number

    public wlr: number

    public constructor(data: APIData, mode?: string) {
        mode = mode ? `_${mode}` : ''

        this.wins = data.pixel_party?.[`wins${mode}`]
        this.gamesPlayed = data.pixel_party?.[`games_played${mode}`]
        this.losses = sub(this.gamesPlayed, this.wins)
        PixelPartyMode.applyRatios(this)
    }

    public static applyRatios(mode: PixelPartyMode) {
        mode.wlr = ratio(mode.wins, mode.losses)
    }
}

export class PixelParty {
    public overall: PixelPartyMode

    public normal: PixelPartyMode

    public hyper: PixelPartyMode

    public roundsCompleted: number

    public powerupsCollected: number

    public constructor(data: APIData) {
        this.overall = new PixelPartyMode(data)
        this.hyper = new PixelPartyMode(data, 'hyper')

        this.normal = deepSub(this.overall, this.hyper)
        PixelPartyMode.applyRatios(this.normal)

        this.roundsCompleted = data.pixel_party?.rounds_completed
        this.powerupsCollected = data.pixel_party?.power_ups_collected
    }
}

export class Seasonal {
    public totalWins: number

    public easterSimulator: EasterSimulator

    public grinchSimulator: GrinchSimulator

    public halloweenSimulator: HalloweenSimulator

    public scubaSimulator: ScubaSimulator

    public constructor(data: APIData) {
        this.easterSimulator = new EasterSimulator(data)
        this.grinchSimulator = new GrinchSimulator(data)
        this.halloweenSimulator = new HalloweenSimulator(data)
        this.scubaSimulator = new ScubaSimulator(data)

        this.totalWins = add(
            this.easterSimulator.wins,
            this.grinchSimulator.wins,
            this.halloweenSimulator.wins,
            this.scubaSimulator.wins
        )
    }
}

export class ThrowOut {
    public wins: number

    public kills: number

    public deaths: number

    public kdr: number

    public constructor(data: APIData) {
        this.wins = data.wins_throw_out
        this.kills = data.kills_throw_out
        this.deaths = data.deaths_throw_out
        this.kdr = ratio(this.kills, this.deaths)
    }
}

export class ZombiesMap {
    public wins: number

    public fastestWin: number

    public kills: number

    public deaths: number

    public bestRound: number

    public constructor(data: APIData, map?: string) {
        map = map ? `_${map}` : ''

        this.wins = data[`wins_zombies${map}`]
        this.fastestWin =
            (data[`fastest_time_30_zombies${map ? `${map}_normal` : ''}`] ?? 0) * 1000
        this.kills = data[`zombie_kills_zombies${map}`]
        this.deaths = data[`deaths_zombies${map}`]
        this.bestRound = data[`best_round_zombies${map}`]
    }
}

export class Zombies {
    public overall: ZombiesMap

    public deadEnd: ZombiesMap

    public badBlood: ZombiesMap

    public alienArcadium: ZombiesMap

    public constructor(data: APIData) {
        this.overall = new ZombiesMap(data)
        this.deadEnd = new ZombiesMap(data, 'deadend')
        this.badBlood = new ZombiesMap(data, 'badblood')
        this.alienArcadium = new ZombiesMap(data, 'alienarcadium')
    }
}
