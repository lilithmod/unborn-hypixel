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

export class TNTGamesChallenges implements GameChallenges {
    public tntRun: number

    public pvpRun: number

    public bowSpleef: number

    public tntTag: number

    public tntWizards: number

    public total: number

    public constructor(challenges: APIData) {
        this.tntRun = challenges.TNTGAMES__tnt_run_challenge
        this.pvpRun = challenges.TNTGAMES__pvp_run_challenge
        this.bowSpleef = challenges.TNTGAMES__bow_spleef_challenge
        this.tntTag = challenges.TNTGAMES__tnt_tag_challenge
        this.tntWizards = challenges.TNTGAMES__tnt_wizards_challenge

        this.total = add(
            this.tntRun,
            this.pvpRun,
            this.bowSpleef,
            this.tntTag,
            this.tntWizards
        )
    }
}
