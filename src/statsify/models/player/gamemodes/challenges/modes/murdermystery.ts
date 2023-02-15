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

export class MurderMysteryChallenges implements GameChallenges {
    public murderSpree: number

    public sherlock: number

    public hero: number

    public serialKiller: number

    public total: number

    public constructor(challenges: APIData) {
        this.murderSpree = challenges.MURDER_MYSTERY__murder_spree
        this.sherlock = challenges.MURDER_MYSTERY__sherlock
        this.hero = challenges.MURDER_MYSTERY__hero
        this.serialKiller = challenges.MURDER_MYSTERY__serial_killer

        this.total = add(this.murderSpree, this.sherlock, this.hero, this.serialKiller)
    }
}
