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

export class BedWarsChallenges implements GameChallenges {
    public defensive: number

    public support: number

    public offensive: number

    public total: number

    public constructor(challenges: APIData) {
        this.defensive = challenges.BEDWARS__defensive
        this.support = challenges.BEDWARS__support
        this.offensive = challenges.BEDWARS__offensive

        this.total = add(this.defensive, this.support, this.offensive)
    }
}
