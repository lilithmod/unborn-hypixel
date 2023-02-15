/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData, formatTime } from '../../../../util/util.js'
import { GameModes, IGameModes } from '../../../game'

export const PARKOUR_MODES = new GameModes([{api: 'overall'}])

export type ParkourModes = IGameModes<typeof PARKOUR_MODES>;

const fieldOptions = {sort: 'ASC', formatter: formatTime, fieldName: 'Time'}
const historical = {enabled: false}

export class Parkour {
    public ARCADE: number

    public BEDWARS: number

    public BLITZSG: number

    public BUILD_BATTLE: number

    public CLASSIC: number

    public COPS_AND_CRIMS: number

    public DUELS: number

    public HOUSING: number

    public MAIN_LOBBY: number

    public MEGAWALLS: number

    public MURDER_MYSTERY: number

    public PROTOTYPE: number

    public SKYWARS: number

    public SMASH_HEROES: number

    public TNT_GAMES: number

    public TOURNAMENT_LOBBY: number

    public UHC: number

    public WARLORDS: number

    public WOOLWARS: number

    public constructor(data: APIData) {
        const getTime = (key: string): number =>
            data[key]?.sort?.((a: any, b: any) => a.timeTook - b.timeTook)[0]?.timeTook

        this.ARCADE = getTime('ArcadeGames')
        this.BEDWARS = getTime('Bedwars')
        this.BLITZSG = getTime('BlitzLobby')
        this.BUILD_BATTLE = getTime('BuildBattle')
        this.CLASSIC = getTime('Legacy')
        this.COPS_AND_CRIMS = getTime('CopsnCrims')
        this.DUELS = getTime('Duels')
        this.HOUSING = getTime('Housing')
        this.MAIN_LOBBY = getTime('mainLobby2022')
        this.MEGAWALLS = getTime('MegaWalls')
        this.MURDER_MYSTERY = getTime('MurderMystery')
        this.PROTOTYPE = getTime('Prototype')
        this.SKYWARS = getTime('SkywarsStandard2022')
        this.SMASH_HEROES = getTime('SuperSmash')
        this.TNT_GAMES = getTime('TNT')
        this.TOURNAMENT_LOBBY = getTime('Tourney')
        this.UHC = getTime('uhc')
        this.WARLORDS = getTime('Warlords')
        this.WOOLWARS = getTime('WoolGames')
    }
}
