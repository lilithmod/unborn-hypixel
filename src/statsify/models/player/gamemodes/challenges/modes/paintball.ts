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

export class PaintballChallenges implements GameChallenges {
    public killStreak: number

    public killingSpree: number

    public nuke: number

    public finish: number

    public total: number

    public constructor(challenges: APIData) {
        this.killStreak = challenges.PAINTBALL__kill_streak_challenge
        this.killingSpree = challenges.PAINTBALL__killing_spree_challenge
        this.nuke = challenges.PAINTBALL__nuke_challenge
        this.finish = challenges.PAINTBALL__finish_challenge

        this.total = add(this.killStreak, this.killingSpree, this.nuke, this.finish)
    }
}
