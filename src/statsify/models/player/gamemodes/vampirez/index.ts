/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { GameModes, IGameModes } from '../../../game'
import { VampireZHuman, VampireZVampire } from './life'
import { add } from '../../../../util/math.js'

export const VAMPIREZ_MODES = new GameModes([{api: 'human'}, {api: 'vampire'}])
export type VampireZModes = IGameModes<typeof VAMPIREZ_MODES>;

export class VampireZ {
    public coins: number

    public tokens: number

    public overallWins: number

    public mostVampireKills: number

    public zombieKills: number

    public human: VampireZHuman

    public vampire: VampireZVampire

    public constructor(data: APIData, legacy: APIData) {
        this.coins = data.coins
        this.tokens = legacy.vampirez_tokens

        this.mostVampireKills = data.most_vampire_kills_new
        this.zombieKills = data.zombie_kills

        this.human = new VampireZHuman(data, 'human')
        this.vampire = new VampireZVampire(data, 'vampire')

        this.overallWins = add(this.human.wins, this.vampire.wins)
    }
}

export * from './life'
