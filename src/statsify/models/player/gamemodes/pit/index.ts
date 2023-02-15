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
import { add, ratio } from '../../../../util/math.js'
import { getBounty, getLevel, getLevelFormatted, getPrestige, getPrestigeReq, } from './util'

export const PIT_MODES = new GameModes([
    {api: 'overall', hypixel: 'PIT', formatted: 'Pit'},
])

export type PitModes = IGameModes<typeof PIT_MODES>;

export class Pit {
    public exp: number

    /**
     * Pit level including prestige (used for historical)
     */
    public trueLevel: number

    public levelFormatted: string

    public nextLevelFormatted: string

    public progression: Progression

    public gold: number

    public goldEarned: number

    public renown: number

    public bounty: number

    public contractsCompleted: number

    public kills: number

    public deaths: number

    public kdr: number

    public assists: number

    public tier1MysticsEnchanted: number

    public tier2MysticsEnchanted: number

    public tier3MysticsEnchanted: number

    public totalMysticsEnchanted: number

    public playtime: number

    public highestStreak: number

    public joins: number

    public constructor(profile: APIData, data: APIData) {
        this.exp = profile.xp ?? 0
        this.gold = profile.cash
        this.renown = profile.renown
        this.bounty = getBounty(profile.bounties)

        const prestige = getPrestige(this.exp)
        const level = getLevel(prestige, this.exp)

        this.trueLevel = prestige * 120 + level

        const lastPrestigeReq = getPrestigeReq(prestige - 1)

        this.progression = new Progression(
            this.exp - lastPrestigeReq,
            Math.min(getPrestigeReq(prestige) - lastPrestigeReq, 11_787_293_080)
        )

        this.levelFormatted = getLevelFormatted(level, prestige)
        this.nextLevelFormatted =
            prestige === 50
                ? getLevelFormatted(120, prestige)
                : getLevelFormatted(1, prestige + 1)

        this.contractsCompleted = data.contracts_completed

        this.kills = data.kills
        this.deaths = data.deaths
        this.kdr = ratio(this.kills, this.deaths)

        this.assists = data.assists

        this.tier1MysticsEnchanted = data.enchanted_tier1
        this.tier2MysticsEnchanted = data.enchanted_tier2
        this.tier3MysticsEnchanted = data.enchanted_tier3

        this.totalMysticsEnchanted = add(
            this.tier1MysticsEnchanted,
            this.tier2MysticsEnchanted,
            this.tier3MysticsEnchanted
        )

        this.goldEarned = data.cash_earned
        this.playtime = (data.playtime_minutes ?? 0) * 60 * 1000
        this.highestStreak = data.max_streak
        this.joins = data.joins
    }
}
