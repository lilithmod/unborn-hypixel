/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { GameModes, IGameModes } from '../../../game'
import { WarlordsClass } from './class'
import { add, ratio, sub } from '../../../../util/math.js'

export const WARLORDS_MODES = new GameModes([
    {api: 'overall'},
    {api: 'classes'},

    {hypixel: 'ctf_mini', formatted: 'CTF'},
    {hypixel: 'domination', formatted: 'Domination'},
    {hypixel: 'team_deathmatch', formatted: 'Deathmatch'},
])

export type WarlordsModes = IGameModes<typeof WARLORDS_MODES>;

export class Warlords {
    public mage: WarlordsClass

    public warrior: WarlordsClass

    public paladin: WarlordsClass

    public shaman: WarlordsClass

    public class: string = 'warrior'

    public coins: number

    public gamesPlayed: number

    public wins: number

    public losses: number

    public wlr: number

    public kills: number

    public deaths: number

    public kdr: number

    public assists: number

    public constructor(data: APIData) {
        this.mage = new WarlordsClass(data, 'mage')
        this.warrior = new WarlordsClass(data, 'warrior')
        this.paladin = new WarlordsClass(data, 'paladin')
        this.shaman = new WarlordsClass(data, 'shaman')

        this.class = data.chosen_class || 'warrior'
        this.coins = data.coins

        this.gamesPlayed = Math.ceil(
            add(
                data.aquamancer_plays,
                data.avenger_plays,
                data.berserker_plays,
                data.crusader_plays,
                data.cryomancer_plays,
                data.defender_plays,
                data.earthwarden_plays,
                data.mage_plays,
                data.paladin_plays,
                data.protector_plays,
                data.pyromancer_plays,
                data.revenant_plays,
                data.shaman_plays,
                data.spiritguard_plays,
                data.thunderlord_plays,
                data.warrior_plays
            ) / 2
        )
        this.wins = data.wins

        // Warlords Losses in API are bugged (~90% accurate)
        // https://hypixel.net/threads/warlords-skillrating-website.1560046/post-12210896
        this.losses = sub(this.gamesPlayed, this.wins)

        this.wlr = ratio(this.wins, this.losses)
        this.kills = data.kills
        this.deaths = data.deaths
        this.kdr = ratio(this.kills, this.deaths)
        this.assists = data.assists
    }
}

export * from './class'
