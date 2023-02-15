/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { GameModes, IGameModes } from '../../../game'
import { createPrefixProgression, defaultPrefix, GamePrefix, getFormattedPrefix, rainbow, } from '../prefixes'
import { Progression } from '../../../progression'
import { ratio } from '../../../../util/math.js'

export const WALLS_MODES = new GameModes([{api: 'overall'}])

export type WallsModes = IGameModes<typeof WALLS_MODES>;

const prefixes: GamePrefix[] = [
    {fmt: (n) => `§8[${n}]`, req: 0},
    {fmt: (n) => `§7[${n}]`, req: 20},
    {fmt: (n) => `§6[${n}]`, req: 50},
    {fmt: (n) => `§a[${n}]`, req: 100},
    {fmt: (n) => `§2[${n}]`, req: 200},
    {fmt: (n) => `§9[${n}]`, req: 300},
    {fmt: (n) => `§1[${n}]`, req: 400},
    {fmt: (n) => `§d[${n}]`, req: 500},
    {fmt: (n) => `§4[${n}]`, req: 750},
    {fmt: (n) => `§6[${n}]`, req: 1000},
    {fmt: (n) => `§0§l[${n}]`, req: 2000},
    {fmt: (n) => rainbow(`[${n}]`), req: 2001},
]

export class Walls {
    public coins: number

    public wins: number

    public losses: number

    public wlr: number

    public kills: number

    public deaths: number

    public kdr: number

    public assists: number

    public tokens: number

    public progression: Progression

    public currentPrefix: string

    public naturalPrefix: string = defaultPrefix(prefixes, {abbreviation: false})

    public nextPrefix: string

    public constructor(data: APIData, legacy: APIData) {
        this.coins = data.coins
        this.wins = data.wins
        this.losses = data.losses
        this.wlr = ratio(this.wins, this.losses)
        this.kills = data.kills
        this.deaths = data.deaths
        this.kdr = ratio(this.kills, this.deaths)
        this.assists = data.assists
        this.tokens = legacy.walls_tokens

        const score = this.wins

        this.currentPrefix = getFormattedPrefix({prefixes, score, abbreviation: false})

        this.naturalPrefix = getFormattedPrefix({
            prefixes,
            score,
            trueScore: true,
            abbreviation: false,
        })

        this.nextPrefix = getFormattedPrefix({
            prefixes,
            score,
            skip: true,
            abbreviation: false,
        })

        this.progression = createPrefixProgression(prefixes, score)
    }
}
