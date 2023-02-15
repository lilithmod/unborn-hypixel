/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { Events } from './events'
import { GameModes, IGameModes } from '../../../game'
import { getNetworkLevel } from './util'

export const GENERAL_MODES = new GameModes([{api: 'overall'}])
export type GeneralModes = IGameModes<typeof GENERAL_MODES>;

export class General {
    public achievementPoints: number

    public giftsSent: number

    public karma: number

    public networkExp: number

    public networkLevel: number = 1

    public currentRewardStreak: number

    public highestRewardStreak: number

    public tournamentTributes: number

    public ranksGifted: number

    public classicTokens: number

    public events: Events

    public constructor(data: APIData, legacy: APIData) {
        this.achievementPoints = data.achievementPoints ?? 0

        this.karma = data.karma ?? 0
        this.networkExp = data.networkExp || 1
        this.networkLevel = getNetworkLevel(this.networkExp)

        this.currentRewardStreak = data.rewardScore ?? 0
        this.highestRewardStreak = data.rewardHighScore ?? 0

        this.tournamentTributes = data.tourney?.total_tributes

        this.giftsSent = data.giftingMeta?.bundlesGiven ?? 0
        this.ranksGifted = data.giftingMeta?.ranksGiven ?? 0

        this.classicTokens = legacy.total_tokens ?? 0

        this.events = new Events(data.seasonal)
    }
}

export * from './events'
