/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'

export class BuildBattleGuessTheBuild {
    public wins: number

    public constructor(data: APIData) {
        this.wins = data.wins_guess_the_build
    }
}

export class BuildBattleMultiplayerMode {
    public wins: number

    public constructor(data: APIData, mode: string) {
        this.wins = data[`wins_${mode}_normal`]
    }
}

export class BuildBattleOverall {
    public wins: number

    public constructor(data: APIData) {
        this.wins = data.wins
    }
}

export class BuildBattlePro {
    public wins: number

    public constructor(data: APIData) {
        this.wins = data.wins_solo_pro
    }
}
