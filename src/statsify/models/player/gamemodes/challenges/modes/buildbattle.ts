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

export class BuildBattleChallenges implements GameChallenges {
    public topThree: number

    public guesser: number

    public total: number

    public constructor(challenges: APIData) {
        this.topThree = challenges.BUILD_BATTLE__top_3_challenge
        this.guesser = challenges.BUILD_BATTLE__guesser_challenge

        this.total = add(this.topThree, this.guesser)
    }
}
