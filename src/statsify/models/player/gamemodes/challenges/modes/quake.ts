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

export class QuakeChallenges implements GameChallenges {
    public powerup: number

    public killingStreak: number

    public dontBlink: number

    public combo: number

    public total: number

    public constructor(challenges: APIData) {
        this.powerup = challenges.QUAKECRAFT__powerup_challenge
        this.killingStreak = challenges.QUAKECRAFT__killing_streak_challenge
        this.dontBlink = challenges['QUAKECRAFT__don\'t_blink_challenge']
        this.combo = challenges.QUAKECRAFT__combo_challenge

        this.total = add(this.powerup, this.killingStreak, this.dontBlink, this.combo)
    }
}
