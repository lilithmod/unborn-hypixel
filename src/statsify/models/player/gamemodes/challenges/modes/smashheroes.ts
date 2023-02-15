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

export class SmashHeroesChallenges implements GameChallenges {
    public leaderboard: number

    public crystal: number

    public smash: number

    public flawless: number

    public total: number

    public constructor(challenges: APIData) {
        this.leaderboard = challenges.SUPER_SMASH__leaderboard_challenge
        this.crystal = challenges.SUPER_SMASH__crystal_challenge
        this.smash = challenges.SUPER_SMASH__smash_challenge
        this.flawless = challenges.SUPER_SMASH__flawless_challenge

        this.total = add(this.leaderboard, this.crystal, this.smash, this.flawless)
    }
}
