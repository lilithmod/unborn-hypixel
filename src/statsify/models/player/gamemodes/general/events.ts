/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { Progression } from '../../../progression'

const MAX_LEVEL = 100

export class Event {
    public exp: number

    public level: number

    public progression: Progression

    public constructor(expRequirement: number, data: APIData = {}) {
        this.exp = data.levelling?.experience ?? 0
        this.level = Math.min(MAX_LEVEL, Math.floor(this.exp / expRequirement) + 1)

        this.progression = new Progression(
            this.exp % expRequirement,
            this.level >= MAX_LEVEL ? 0 : expRequirement
        )
    }
}

export class Events {
    public summer2022: Event

    public halloween2022: Event

    public christmas2022: Event

    public silver: number

    public constructor(data: APIData = {}) {
        this.summer2022 = new Event(25_000, data.summer?.['2022'])
        this.halloween2022 = new Event(10_000, data.halloween?.['2022'])
        this.christmas2022 = new Event(10_000, data.christmas?.['2022'])

        this.silver = data.silver
    }
}
