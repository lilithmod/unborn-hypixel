/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { add, ratio } from '../../../../util/math.js'

export class Defusal {
    public wins: number
    public roundWins: number
    public kills: number
    public deaths: number
    public kdr: number
    public headshotKills: number
    public assists: number
    public bombsPlanted: number
    public bombsDefused: number

    public constructor(data: APIData) {
        this.wins = data.game_wins
        this.roundWins = data.round_wins
        this.kills = data.kills
        this.deaths = data.deaths
        this.kdr = ratio(this.kills, this.deaths)
        this.headshotKills = data.headshot_kills
        this.assists = data.assists
        this.bombsPlanted = data.bombs_planted
        this.bombsDefused = data.bombs_defused
    }
}

export class Deathmatch {
    public wins: number
    public kills: number
    public deaths: number
    public kdr: number
    public assists: number

    public constructor(data: APIData) {
        this.wins = data.game_wins_deathmatch
        this.kills = data.kills_deathmatch
        this.deaths = data.deaths_deathmatch
        this.kdr = ratio(this.kills, this.deaths)
        this.assists = data.assists_deathmatch
    }
}

export class GunGame {
    public wins: number
    public kills: number


    public deaths: number


    public kdr: number


    public assists: number
    public fastestWin: number

    public constructor(data: APIData) {
        this.wins = data.game_wins_gungame
        this.kills = data.kills_gungame
        this.deaths = data.deaths_gungame
        this.kdr = ratio(this.kills, this.deaths)
        this.assists = data.assists_gungame
        this.fastestWin = data.fastest_win_gungame
    }
}

export class CopsAndCrimsOverall {

    public wins: number


    public kills: number


    public deaths: number


    public kdr: number


    public assists: number

    public constructor(defusal: Defusal, deathmatch: Deathmatch, gunGame: GunGame) {
        this.wins = add(defusal.wins, deathmatch.wins, gunGame.wins)
        this.kills = add(defusal.kills, deathmatch.kills, gunGame.kills)
        this.deaths = add(defusal.deaths, deathmatch.deaths, gunGame.deaths)
        this.kdr = ratio(this.kills, this.deaths)
        this.assists = add(defusal.assists, deathmatch.assists, gunGame.assists)
    }
}
