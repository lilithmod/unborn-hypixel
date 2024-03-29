/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { BowSpleef, PVPRun, TNTRun, TNTTag, Wizards } from './mode'
import { GameModes, IGameModes } from '../../../game'

export const TNT_GAMES_MODES = new GameModes([
    {api: 'overall'},
    {hypixel: 'PVPRUN', formatted: 'PVP Run'},
    {hypixel: 'TNTAG', formatted: 'TNT Tag'},
    {hypixel: 'TNTRUN', formatted: 'TNT Run'},
    {hypixel: 'BOWSPLEEF', formatted: 'Bow Spleef'},
    {hypixel: 'CAPTURE', formatted: 'Wizards'},
])

export type TNTGamesModes = IGameModes<typeof TNT_GAMES_MODES>;

export class TNTGames {
    public coins: number

    public wins: number

    public blocksRan: number

    public tntRun: TNTRun

    public pvpRun: PVPRun

    public bowSpleef: BowSpleef

    public wizards: Wizards

    public tntTag: TNTTag

    public constructor(data: APIData, ap: APIData) {
        this.coins = data.coins
        this.wins = data.wins
        this.blocksRan = ap.tntgames_block_runner

        this.tntRun = new TNTRun(data)
        this.pvpRun = new PVPRun(data)
        this.bowSpleef = new BowSpleef(data)
        this.wizards = new Wizards(data)
        this.tntTag = new TNTTag(data, ap)
    }
}

export * from './mode'
