/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { add } from '../../../../util/math.js'

export class WarlordsClass {
    public wins: number

    public damage: number

    public prevent: number

    public healing: number

    public total: number

    public constructor(data: APIData, mode: string) {
        this.wins = data[`wins_${mode}`]

        this.damage = data[`damage_${mode}`]
        this.prevent = data[`damage_prevented_${mode}`]
        this.healing = data[`heal_${mode}`]

        this.total = add(this.damage, this.prevent, this.healing)
    }
}
