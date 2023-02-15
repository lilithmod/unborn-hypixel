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

export class UHCChallenges implements GameChallenges {
    public longshot: number

    public perfectStart: number

    public hunter: number

    public threat: number

    public total: number

    public constructor(challenges: APIData) {
        this.longshot = challenges.UHC__longshot_challenge
        this.perfectStart = challenges.UHC__perfect_start_challenge
        this.hunter = challenges.UHC__hunter_challenge
        this.threat = challenges.UHC__threat_challenge

        this.total = add(this.longshot, this.perfectStart, this.hunter, this.threat)
    }
}
