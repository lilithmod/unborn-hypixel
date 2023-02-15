/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../../util/util.js'
import { add } from '../../../../../util/math.js'
import type { GameChallenges } from '../game-challenges'

export class VampireZChallenges implements GameChallenges {
    public fang: number

    public gold: number

    public purifying: number

    public lastStand: number

    public total: number

    public constructor(challenges: APIData) {
        this.fang = challenges.VAMPIREZ__fang_challenge
        this.gold = challenges.VAMPIREZ__gold_challenge
        this.purifying = challenges.VAMPIREZ__purifying_challenge
        this.lastStand = challenges.VAMPIREZ__last_stand_challenge

        this.total = add(this.fang, this.gold, this.purifying, this.lastStand)
    }
}
