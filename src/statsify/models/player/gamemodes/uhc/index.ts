/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { GameModes, IGameModes } from '../../../game'
import { createPrefixProgression, GamePrefix } from '../prefixes'
import { Progression } from '../../../progression'
import { UHCMode } from './mode'
import { deepAdd } from '../../../../util/math.js'
import { getLevelIndex, titleScores } from './util'

const formatLevel = (level: number | string) => `§6[${level}✫]`

export const UHC_MODES = new GameModes([
    {api: 'overall'},
    {api: 'solo', hypixel: 'SOLO'},
    {api: 'teams', hypixel: 'TEAMS'},
])

const prefixes: GamePrefix[] = titleScores.map((level) => ({
    fmt: formatLevel,
    req: level.req,
}))

export type UHCModes = IGameModes<typeof UHC_MODES>;

export class UHC {
    public overall: UHCMode

    public solo: UHCMode

    public teams: UHCMode

    public coins: number

    public level: number

    public levelFormatted: string = formatLevel(1)

    public nextLevelFormatted: string

    public progression: Progression

    public score: number

    public kit: string = 'none'

    public title: string = titleScores[0].title

    public constructor(data: APIData) {
        this.coins = data.coins
        this.score = data.score

        this.kit = data.equippedKit ?? 'none'

        const index = getLevelIndex(this.score)

        this.progression = createPrefixProgression(prefixes, this.score)

        this.level = index + 1
        this.levelFormatted = formatLevel(this.level)
        this.nextLevelFormatted = formatLevel(Math.floor(this.level) + 1)
        this.title = titleScores[index].title

        this.solo = new UHCMode(data, 'solo')
        this.teams = new UHCMode(data, '')

        this.overall = deepAdd(
            this.solo,
            this.teams,
            new UHCMode(data, 'no_diamonds'),
            new UHCMode(data, 'vanilla_doubles'),
            new UHCMode(data, 'brawl'),
            new UHCMode(data, 'solo_brawl'),
            new UHCMode(data, 'duo_brawl')
        )

        UHCMode.applyRatios(this.overall)
    }
}

export * from './mode'
