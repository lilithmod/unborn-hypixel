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

export class CopsAndCrimsChallenges implements GameChallenges {
    public pistol: number

    public knife: number

    public grenade: number

    public killingSpree: number

    public total: number

    public constructor(challenges: APIData) {
        this.pistol = challenges.MCGO__pistol_challenge
        this.knife = challenges.MCGO__knife_challenge
        this.grenade = challenges.MCGO__grenade_challenge
        this.killingSpree = challenges.MCGO__killing_spree_challenge

        this.total = add(this.pistol, this.knife, this.grenade, this.killingSpree)
    }
}
