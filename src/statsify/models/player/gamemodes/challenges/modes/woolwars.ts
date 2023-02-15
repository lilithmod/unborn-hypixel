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

export class WoolWarsChallenges implements GameChallenges {
    public flawless: number

    public builder: number

    public mercilessKiller: number

    public total: number

    public constructor(challenges: APIData) {
        this.flawless = challenges.WOOL_GAMES__flawless_challenge
        this.builder = challenges.WOOL_GAMES__builder_challenge
        this.mercilessKiller = challenges.WOOL_GAMES__merciless_killer_challenge

        this.total = add(this.flawless, this.builder, this.mercilessKiller)
    }
}
