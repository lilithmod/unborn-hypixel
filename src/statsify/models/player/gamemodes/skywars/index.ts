/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { GameModes, IGameModes } from '../../../game'
import { Progression } from '../../../progression'
import { SkyWarsMode } from './mode'
import { add } from '../../../../util/math.js'
import { getFormattedLevel, getLevel, getLevelProgress, parseKit } from './util'

export const SKYWARS_MODES = new GameModes([
    {api: 'overall'},
    {api: 'solo'},
    {api: 'doubles'},

    {hypixel: 'solo_insane_lucky', formatted: 'Lucky Solo'},
    {hypixel: 'teams_insane_lucky', formatted: 'Lucky Doubles'},
    {hypixel: 'solo_insane_slime', formatted: 'Slime Solo'},
    {hypixel: 'teams_insane_slime', formatted: 'Slime Doubles'},
    {hypixel: 'solo_insane_rush', formatted: 'Rush Solo'},
    {hypixel: 'teams_insane_rush', formatted: 'Rush Doubles'},
    {hypixel: 'solo_normal', formatted: 'Solo Normal'},
    {hypixel: 'solo_insane', formatted: 'Solo Insane'},
    {hypixel: 'teams_normal', formatted: 'Doubles Normal'},
    {hypixel: 'teams_insane', formatted: 'Doubles Insane'},
    {hypixel: 'solo_insane_tnt_madness', formatted: 'TNT Madness Solo'},
    {hypixel: 'teams_insane_tnt_madness', formatted: 'TNT Madness Doubles'},
    {hypixel: 'mega_normal', formatted: 'Mega'},
    {hypixel: 'mega_doubles', formatted: 'Mega Doubles'},
])

export type SkyWarsModes = IGameModes<typeof SKYWARS_MODES>;

export class SkyWars {
    public exp: number

    public coins: number

    public souls: number

    public opals: number

    public heads: number

    public tokens: number

    public potionsBrewed: number

    public lootChests: number

    public star: string

    public level: number

    public levelFormatted: string

    public nextLevelFormatted: string

    public progression: Progression

    public overall: SkyWarsMode

    public solo: SkyWarsMode

    public doubles: SkyWarsMode

    public constructor(data: APIData, ap: APIData) {
        this.exp = data.skywars_experience ?? 0
        this.coins = data.coins ?? 0
        this.souls = data.souls ?? 0
        this.opals = data.opals ?? 0
        this.heads = data.heads ?? 0
        this.tokens = data.cosmetic_tokens ?? 0
        this.potionsBrewed = ap.skywars_tonic_taker ?? 0

        this.lootChests = add(
            data.skywars_chests,
            data.skywars_easter_boxes,
            data.skywars_halloween_boxes,
            data.skywars_christmas_boxes,
            data.skywars_lunar_boxes,
            data.skywars_golden_boxes
        )

        this.star = (data.levelFormatted || '⋆').replace(/\d|[a-f]|k|r|l|§/g, '')
        this.level = getLevel(this.exp)
        this.levelFormatted = getFormattedLevel(this.level, this.star)

        const {current, total} = getLevelProgress(this.exp)
        this.progression = new Progression(current, total)

        this.nextLevelFormatted = getFormattedLevel(this.level + 1, this.star)

        const normalKit = parseKit(
            data.activeKit_SOLO_random ? 'random' : data.activeKit_SOLO
        )
        const insaneKit = parseKit(
            data.activeKit_TEAMS_random ? 'random' : data.activeKit_TEAMS
        )

        const soloInsaneWins = data[`wins_solo_insane`]
        const soloNormalWins = data[`wins_solo_normal`]
        const doublesInsaneWins = data[`wins_team_insane`]
        const doublesNormalWins = data[`wins_team_normal`]

        const chooseKit = (insane = 0, normal = 0) =>
            insane > normal ? insaneKit : normalKit

        this.overall = new SkyWarsMode(data, '')

        this.solo = new SkyWarsMode(data, 'solo')
        this.solo.kit = chooseKit(soloInsaneWins, soloNormalWins)

        this.doubles = new SkyWarsMode(data, 'team')
        this.doubles.kit = chooseKit(doublesInsaneWins, doublesNormalWins)

        this.overall.kit = chooseKit(
            add(soloInsaneWins, doublesInsaneWins),
            add(soloNormalWins, doublesNormalWins)
        )
    }
}

export * from './mode'
