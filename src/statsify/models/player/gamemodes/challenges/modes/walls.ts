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

export class WallsChallenges implements GameChallenges {
    public firstBlood: number

    public powerhouse: number

    public looting: number

    public doubleKill: number

    public total: number

    public constructor(challenges: APIData) {
        this.firstBlood = challenges.WALLS__first_blood_challenge
        this.powerhouse = challenges.WALLS__powerhouse_challenge
        this.looting = challenges.WALLS__looting_challenge
        this.doubleKill = challenges.WALLS__double_kill_challenge

        this.total = add(this.firstBlood, this.powerhouse, this.looting, this.doubleKill)
    }
}
