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

export class ArenaBrawlChallenges implements GameChallenges {
    public whereIsIt: number

    public tripleKill: number

    public noUltimate: number

    public cooperation: number

    public total: number

    public constructor(challenges: APIData) {
        this.whereIsIt = challenges.ARENA__where_is_it_challenge
        this.tripleKill = challenges.ARENA__triple_kill_challenge
        this.noUltimate = challenges.ARENA__no_ultimate_challenge
        this.cooperation = challenges.ARENA__no_ultimate_challenge

        this.total = add(this.whereIsIt, this.tripleKill, this.noUltimate, this.cooperation)
    }
}
