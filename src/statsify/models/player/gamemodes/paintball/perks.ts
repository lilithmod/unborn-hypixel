/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { add } from '../../../../util/math.js'

export class PaintballPerks {
    public adrenaline: number = 1

    public endurance: number = 1

    public fortune: number = 1

    public godfather: number = 1

    public headstart: number = 1

    public superluck: number = 1

    public transfusion: number = 1

    public constructor(data: APIData) {
        this.adrenaline = add(data.adrenaline, 1)
        this.endurance = add(data.endurance, 1)
        this.fortune = add(data.fortune, 1)
        this.godfather = add(data.godfather, 1)
        this.headstart = data.headstart // Only one properly returned in API
        this.superluck = add(data.superluck, 1)
        this.transfusion = add(data.transfusion, 1)
    }
}
