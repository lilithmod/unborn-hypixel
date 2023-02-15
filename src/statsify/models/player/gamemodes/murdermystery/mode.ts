/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { ratio } from '../../../../util/math.js'

export class BaseMurderMysteryMode {
    public wins: number

    public gamesPlayed: number

    public bowKills: number

    public goldPickedUp: number

    public constructor(data: APIData, mode: string) {
        mode = mode ? `_${mode}` : mode

        this.goldPickedUp = data[`coins_pickedup${mode}`]

        this.wins = data[`wins${mode}`]
        this.gamesPlayed = data[`games${mode}`]

        this.bowKills = data[`bow_kills${mode}`]
    }
}

export class StandardMurderMysteryMode extends BaseMurderMysteryMode {
    public kills: number

    public deaths: number

    public kdr: number

    public trapKills: number

    public thrownKnifeKills: number

    public heroWins: number

    public detectiveWins: number

    public murdererWins: number

    public killsAsMurderer: number

    public suicides: number

    public constructor(data: APIData, mode: string) {
        super(data, mode)
        mode = mode ? `_${mode}` : mode

        this.kills = data[`kills${mode}`]
        this.deaths = data[`deaths${mode}`]
        this.kdr = ratio(this.kills, this.deaths)

        this.trapKills = data[`trap_kills${mode}`]
        this.thrownKnifeKills = data[`thrown_knife_kills${mode}`]

        this.heroWins = data[`was_hero${mode}`]
        this.detectiveWins = data[`detective_wins${mode}`]
        this.murdererWins = data[`murderer_wins${mode}`]
        this.killsAsMurderer = data[`kills_as_murderer${mode}`]
        this.suicides = data[`suicides${mode}`]
    }
}

export class ClassicMurderMysteryMode extends StandardMurderMysteryMode {
    public fastestDetectiveWin: number

    public fastestMurdererWin: number

    public constructor(data: APIData, mode: string) {
        super(data, mode)
        mode = mode ? `_${mode}` : mode

        this.fastestDetectiveWin =
            (data[`quickest_detective_win_time_seconds${mode}`] ?? 0) * 1000
        this.fastestMurdererWin =
            (data[`quickest_murderer_win_time_seconds${mode}`] ?? 0) * 1000
    }
}

export class InfectionMurderMysteryMode extends BaseMurderMysteryMode {
    public survivorWins: number

    public killsAsSurvivor: number

    public killsAsInfected: number

    public lastAliveGames: number

    public constructor(data: APIData, mode: string) {
        super(data, mode)

        this.survivorWins = data.survivor_wins_MURDER_INFECTION

        this.killsAsSurvivor = data.kills_as_survivor_MURDER_INFECTION

        this.killsAsInfected = data.kills_as_infected_MURDER_INFECTION
        this.lastAliveGames = data.last_one_alive_MURDER_INFECTION
    }
}

export class AssassinsMurderMysteryMode extends BaseMurderMysteryMode {
    public kills: number

    public deaths: number

    public kdr: number

    public trapKills: number

    public thrownKnifeKills: number

    public knifeKills: number

    public constructor(data: APIData, mode: string) {
        super(data, mode)

        this.kills = data.kills_MURDER_ASSASSINS
        this.deaths = data.deaths_MURDER_ASSASSINS
        this.kdr = ratio(this.kills, this.deaths)

        this.trapKills = data.trap_kills_MURDER_ASSASSINS
        this.thrownKnifeKills = data.thrown_knife_kills_MURDER_ASSASSINS
        this.knifeKills = data.knife_kills_MURDER_ASSASSINS
    }
}
