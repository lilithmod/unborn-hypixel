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
import { SpeedUHCMastery } from './mastery'
import { SpeedUHCMode } from './mode'
import { getLevelIndex, titleScores } from './util'

const formatLevel = (level: number | string) => `§d[${level}❋]`

export const SPEED_UHC_MODES = new GameModes([
    {api: 'overall'},
    {api: 'solo', hypixel: 'solo_normal'},
    {api: 'teams', hypixel: 'team_normal'},
    {api: 'wildSpecialist'},
    {api: 'guardian'},
    {api: 'sniper'},
    {api: 'berserk'},
    {api: 'masterBaker'},
    {api: 'invigorate'},
    {api: 'huntsman'},
    {api: 'fortune'},
    {api: 'vampirism'},
])

const prefixes: GamePrefix[] = titleScores.map((level) => ({
    fmt: formatLevel,
    req: level.req,
}))

export type SpeedUHCModes = IGameModes<typeof SPEED_UHC_MODES>;

export class SpeedUHC {
    public overall: SpeedUHCMode

    public solo: SpeedUHCMode

    public teams: SpeedUHCMode

    public coins: number

    public score: number

    public activeMastery: string = 'none'

    public level: number = 1

    public levelFormatted: string = formatLevel(1)

    public nextLevelFormatted: string

    public progression: Progression

    public title: string = titleScores[0].title

    public wildSpecialist: SpeedUHCMastery

    public guardian: SpeedUHCMastery

    public sniper: SpeedUHCMastery

    public berserk: SpeedUHCMastery

    public masterBaker: SpeedUHCMastery

    public invigorate: SpeedUHCMastery

    public huntsman: SpeedUHCMastery

    public fortune: SpeedUHCMastery

    public vampirism: SpeedUHCMastery

    public constructor(data: APIData) {
        this.coins = data.coins
        this.score = data.score
        this.activeMastery = (data.activeMasterPerk ?? 'none').replace('mastery_', '')

        this.overall = new SpeedUHCMode(data, '')
        this.solo = new SpeedUHCMode(data, 'solo')
        this.teams = new SpeedUHCMode(data, 'team')

        this.wildSpecialist = new SpeedUHCMastery(data, 'wild_specialist')
        this.guardian = new SpeedUHCMastery(data, 'guardian')
        this.sniper = new SpeedUHCMastery(data, 'sniper')
        this.berserk = new SpeedUHCMastery(data, 'berserk')
        this.masterBaker = new SpeedUHCMastery(data, 'master_baker')
        this.invigorate = new SpeedUHCMastery(data, 'invigorate')
        this.huntsman = new SpeedUHCMastery(data, 'huntsman')
        this.fortune = new SpeedUHCMastery(data, 'fortune')
        this.vampirism = new SpeedUHCMastery(data, 'vampirism')

        const index = getLevelIndex(this.score)

        this.level = index + 1
        this.levelFormatted = formatLevel(this.level)
        this.nextLevelFormatted = formatLevel(Math.floor(this.level) + 1)

        this.progression = createPrefixProgression(prefixes, this.score)

        this.title = titleScores[index].title
    }
}

export * from './mastery'
export * from './mode'
