/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { GameModes, IGameModes } from '../../../game'
import { Progression } from '../../../progression'
import { WoolWarsClass, WoolWarsOverall } from './class'
import { getExpReq, getFormattedLevel, getLevel } from './util'

export const WOOLWARS_MODES = new GameModes([
    {api: 'overall'},
    {api: 'tank'},
    {api: 'archer'},
    {api: 'builder'},
    {api: 'swordsman'},
    {api: 'engineer'},
    {api: 'golem'},
    {api: 'assault'},
])

export type WoolWarsModes = IGameModes<typeof WOOLWARS_MODES>;

export class WoolWars {
    public coins: number

    public layers: number

    public exp: number

    public level: number

    public levelFormatted: string

    public progression: Progression

    public nextLevelFormatted: string

    public overall: WoolWarsOverall

    public tank: WoolWarsClass

    public archer: WoolWarsClass

    public builder: WoolWarsClass

    public swordsman: WoolWarsClass

    public engineer: WoolWarsClass

    public golem: WoolWarsClass

    public assault: WoolWarsClass

    public constructor(data: APIData) {
        this.coins = data.coins ?? 0
        this.layers = data.progression?.available_layers ?? 0
        this.exp = Math.round(data.progression?.experience ?? 0)

        this.level = getLevel(this.exp)
        this.levelFormatted = getFormattedLevel(Math.floor(this.level))
        this.nextLevelFormatted = getFormattedLevel(Math.floor(this.level) + 1)

        let exp = this.exp

        for (let i = 0; i < Math.floor(this.level); i++) {
            exp -= getExpReq(i)
        }

        this.progression = new Progression(exp, getExpReq(Math.floor(this.level)))

        this.overall = new WoolWarsOverall(data.wool_wars?.stats)

        this.tank = new WoolWarsClass(data.wool_wars?.stats?.classes?.tank)
        this.archer = new WoolWarsClass(data.wool_wars?.stats?.classes?.archer)
        this.builder = new WoolWarsClass(data.wool_wars?.stats?.classes?.builder)
        this.swordsman = new WoolWarsClass(data.wool_wars?.stats?.classes?.swordsman)
        this.engineer = new WoolWarsClass(data.wool_wars?.stats?.classes?.engineer)
        this.golem = new WoolWarsClass(data.wool_wars?.stats?.classes?.golem)
        this.assault = new WoolWarsClass(data.wool_wars?.stats?.classes?.assault)
    }
}

export * from './class'
