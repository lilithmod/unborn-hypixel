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

export class TurboKartRacersChallenges implements GameChallenges {
    public coin: number

    public firstPlace: number

    public banana: number

    public leaderboard: number

    public total: number

    public constructor(challenges: APIData) {
        this.coin = challenges.GINGERBREAD__coin_challenge
        this.firstPlace = challenges.GINGERBREAD__first_place_challenge
        this.banana = challenges.GINGERBREAD__banana_challenge
        this.leaderboard = challenges.GINGERBREAD__leaderboard_challenge

        this.total = add(this.coin, this.firstPlace, this.banana, this.leaderboard)
    }
}
