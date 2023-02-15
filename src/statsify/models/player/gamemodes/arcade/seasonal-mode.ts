/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'

export class EasterSimulator {
    public wins: number

    public eggsFound: number

    public constructor(data: APIData) {
        this.wins = data.wins_easter_simulator
        this.eggsFound = data.eggs_found_easter_simulator
    }
}

export class GrinchSimulator {
    public wins: number

    public giftsFound: number

    public constructor(data: APIData) {
        this.wins = data.wins_grinch_simulator_v2
        this.giftsFound = data.gifts_grinch_simulator_v2
    }
}

export class HalloweenSimulator {
    public wins: number

    public candyFound: number

    public constructor(data: APIData) {
        this.wins = data.wins_halloween_simulator
        this.candyFound = data.candy_found_halloween_simulator
    }
}

export class ScubaSimulator {
    public wins: number

    public points: number

    public constructor(data: APIData) {
        this.wins = data.wins_scuba_simulator
        this.points = data.total_points_scuba_simulator
    }
}
