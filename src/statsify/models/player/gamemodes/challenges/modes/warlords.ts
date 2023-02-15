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

export class WarlordsChallenges implements GameChallenges {
    public support: number

    public brute: number

    public capture: number

    public carry: number

    public total: number

    public constructor(challenges: APIData) {
        this.support = challenges.BATTLEGROUND__support_challenge
        this.brute = challenges.BATTLEGROUND__brute_challenge
        this.capture = challenges.BATTLEGROUND__capture_challenge
        this.carry = challenges.BATTLEGROUND__carry_challenge

        this.total = add(this.support, this.brute, this.capture, this.carry)
    }
}
