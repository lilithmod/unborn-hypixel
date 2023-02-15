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

export class SkyWarsChallenges implements GameChallenges {
    public feedingTheVoid: number

    public rush: number

    public ranked: number

    public enderman: number

    public total: number

    public constructor(challenges: APIData) {
        this.feedingTheVoid = challenges.SKYWARS__feeding_the_void_challenge
        this.rush = challenges.SKYWARS__rush_challenge
        this.ranked = challenges.SKYWARS__ranked_challenge
        this.enderman = challenges.SKYWARS__enderman_challenge

        this.total = add(this.feedingTheVoid, this.rush, this.ranked, this.enderman)
    }
}
