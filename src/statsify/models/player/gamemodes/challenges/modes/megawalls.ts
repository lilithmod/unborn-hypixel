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

export class MegaWallsChallenges implements GameChallenges {
    public wither: number

    public protector: number

    public berserk: number

    public comeback: number

    public total: number

    public constructor(challenges: APIData) {
        this.wither = challenges.WALLS3__wither_challenge
        this.protector = challenges.WALLS3__protector_challenge
        this.berserk = challenges.WALLS3__berserk_challenge
        this.comeback = challenges.WALLS3__comeback_challenge

        this.total = add(this.wither, this.protector, this.berserk, this.comeback)
    }
}
