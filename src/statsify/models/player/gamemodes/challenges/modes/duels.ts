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

export class DuelsChallenges implements GameChallenges {
    public feedTheVoid: number

    public teams: number

    public targetPractice: number

    public total: number

    public constructor(challenges: APIData) {
        this.feedTheVoid = challenges.DUELS__feed_the_void_challenge
        this.teams = challenges.DUELS__teams_challenge
        this.targetPractice = challenges.DUELS__target_practice_challenge

        this.total = add(this.feedTheVoid, this.teams, this.targetPractice)
    }
}
