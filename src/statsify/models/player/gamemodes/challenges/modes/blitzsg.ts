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

export class BlitzSGChallenges implements GameChallenges {
    public star: number

    public ironMan: number

    public blitz: number

    public resistance: number

    public total: number

    public constructor(challenges: APIData) {
        this.star = challenges.SURVIVAL_GAMES__star_challenge
        this.ironMan = challenges.SURVIVAL_GAMES__iron_man_challenge
        this.blitz = challenges.SURVIVAL_GAMES__blitz_challenge
        this.resistance = challenges.SURVIVAL_GAMES__resistance_challenge

        this.total = add(this.star, this.ironMan, this.blitz, this.resistance)
    }
}
