/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData, romanNumeral } from '../../../../util/util.js'
import { createPrefixProgression, GamePrefix } from '../prefixes'
import { Progression } from '../../../progression'
import { getTitle, Title, titleScores } from './util'
import { deepAdd, ratio } from '../../../../util/math.js'

const getPrefixes = (titles: Title[]) =>
    titles.flatMap((title) => {
        const calculatedTitles: GamePrefix[] = []

        for (let i = 0; i < (title.max ?? 5); i++) {
            calculatedTitles.push({
                fmt: (n) => `${title.color.code}[${n}]`,
                req: title.req + i * title.inc,
            })
        }

        return calculatedTitles
    })

const prefixes = getPrefixes(titleScores())
const overallPrefixes = getPrefixes(titleScores(true))

export class BaseDuelsGameMode {
    public bestWinstreak: number = 0

    public winstreak: number = 0
    public wins: number = 0
    public losses: number = 0
    public wlr: number = 0

    public blocksPlaced: number = 0

    public constructor(data: APIData, mode: string) {
        const prefix = mode ? `${mode}_` : mode

        this.wins = data[`${prefix}wins`] ?? 0
        this.losses = data[`${prefix}losses`] ?? 0

        if (mode == '') {
            this.winstreak = data.current_winstreak ?? 0
            this.bestWinstreak = data.best_overall_winstreak ?? 0
        } else {
            this.winstreak = data[`current_winstreak_mode_${mode}`] ?? 0
            this.bestWinstreak = data[`best_winstreak_mode_${mode}`] ?? 0
        }

        BaseDuelsGameMode.applyRatios(this)
    }

    public static applyRatios(data: BaseDuelsGameMode) {
        data.wlr = ratio(data.wins, data.losses)
    }
}

export class PVPBaseDuelsGameMode extends BaseDuelsGameMode {
    public kills: number = 0
    public deaths: number = 0
    public kdr: number = 0

    public constructor(data: APIData, mode: string) {
        super(data, mode)
        const prefix = mode ? `${mode}_` : mode

        this.kills = data[`${prefix}kills`] ?? 0
        this.deaths = data[`${prefix}deaths`] ?? 0
        this.blocksPlaced = data[`${prefix}blocks_placed`] ?? 0

        PVPBaseDuelsGameMode.applyRatios(this)
    }

    public static applyRatios(data: PVPBaseDuelsGameMode) {
        BaseDuelsGameMode.applyRatios(data)
        data.kdr = ratio(data.kills, data.deaths)
    }
}

export class BridgeDuelsMode extends PVPBaseDuelsGameMode {
    public goals: number = 0

    public constructor(data: APIData, mode: string) {
        super(data, mode)

        this.kills = data[`${mode}_bridge_kills`] ?? 0
        this.deaths = data[`${mode}_bridge_deaths`] ?? 0
        this.goals = (data[`${mode}_goals`] || data[`${mode}_captures`]) ?? 0

        PVPBaseDuelsGameMode.applyRatios(this)
    }
}

export class BridgeDuels {
    public titleFormatted: string

    public titleLevelFormatted: string

    public nextTitleLevelFormatted: string

    public progression: Progression

    public overall: BridgeDuelsMode

    public solo: BridgeDuelsMode

    public doubles: BridgeDuelsMode

    public threes: BridgeDuelsMode

    public fours: BridgeDuelsMode

    public '2v2v2v2': BridgeDuelsMode

    public '3v3v3v3': BridgeDuelsMode

    public ctf: BridgeDuelsMode

    public constructor(data: APIData) {
        this.solo = new BridgeDuelsMode(data, 'bridge_duel')
        this.doubles = new BridgeDuelsMode(data, 'bridge_doubles')
        this.threes = new BridgeDuelsMode(data, 'bridge_threes')
        this.fours = new BridgeDuelsMode(data, 'bridge_four')
        this['2v2v2v2'] = new BridgeDuelsMode(data, 'bridge_2v2v2v2')
        this['3v3v3v3'] = new BridgeDuelsMode(data, 'bridge_3v3v3v3')
        this.ctf = new BridgeDuelsMode(data, 'capture_threes')

        this.overall = deepAdd(
            this.solo,
            this.doubles,
            this.threes,
            this.fours,
            this['2v2v2v2'],
            this['3v3v3v3'],
            this.ctf
        )

        this.overall.winstreak = data.current_bridge_winstreak
        this.overall.bestWinstreak = data.best_bridge_winstreak

        PVPBaseDuelsGameMode.applyRatios(this.overall)

        const {formatted, bold, semi, max, index, color, req, inc} = getTitle(
            this.overall.wins,
            'Bridge'
        )

        this.titleFormatted = formatted

        this.titleLevelFormatted = `${color.code}${bold || semi ? '§l' : ''}[${romanNumeral(
            index
        )}]`

        const nextData = getTitle(req + index * inc, 'Bridge')

        this.nextTitleLevelFormatted = `${nextData.color.code}${
            nextData.bold || nextData.semi ? '§l' : ''
        }[${romanNumeral(index + 1 > (max ?? 5) ? 1 : index + 1)}]`

        this.progression = createPrefixProgression(prefixes, this.overall.wins)
    }
}

export class MultiPVPDuelsGameMode {
    public titleFormatted: string

    public titleLevelFormatted: string

    public nextTitleLevelFormatted: string

    public progression: Progression

    public overall: PVPBaseDuelsGameMode

    public solo: PVPBaseDuelsGameMode

    public doubles: PVPBaseDuelsGameMode

    public constructor(data: APIData, title: string, short: string, long: string) {
        this.solo = new PVPBaseDuelsGameMode(data, `${short}_duel`)
        this.doubles = new PVPBaseDuelsGameMode(data, `${short}_doubles`)

        this.overall = deepAdd(this.solo, this.doubles)
        PVPBaseDuelsGameMode.applyRatios(this.overall)

        this.overall.bestWinstreak = data[`best_${long}_winstreak`]
        this.overall.winstreak = data[`current_${long}_winstreak`]

        const {formatted, bold, semi, max, index, color, req, inc} = getTitle(
            this.overall.wins,
            title
        )

        this.titleFormatted = formatted

        this.titleLevelFormatted = `${color.code}${bold || semi ? '§l' : ''}[${romanNumeral(
            index
        )}]`

        const nextData = getTitle(req + index * inc, title)

        this.nextTitleLevelFormatted = `${nextData.color.code}${
            nextData.bold || nextData.semi ? '§l' : ''
        }[${romanNumeral(index + 1 > (max ?? 5) ? 1 : index + 1)}]`

        this.progression = createPrefixProgression(prefixes, this.overall.wins)
    }
}

const assignTitles = (
    data: SinglePVPDuelsGameMode | SingleDuelsGameMode,
    title: string
) => {
    const {formatted, bold, semi, max, index, color, req, inc} = getTitle(
        data.wins,
        title
    )

    data.titleFormatted = formatted

    data.titleLevelFormatted = `${color.code}${bold || semi ? '§l' : ''}[${romanNumeral(
        index
    )}]`

    const nextData = getTitle(req + index * inc, title)

    data.nextTitleLevelFormatted = `${nextData.color.code}${
        nextData.bold || nextData.semi ? '§l' : ''
    }[${romanNumeral(index + 1 > (max ?? 5) ? 1 : index + 1)}]`

    const titlePrefixes = title === '' ? overallPrefixes : prefixes
    data.progression = createPrefixProgression(titlePrefixes, data.wins)
}

export class SinglePVPDuelsGameMode extends PVPBaseDuelsGameMode {
    public titleFormatted: string

    public titleLevelFormatted: string

    public nextTitleLevelFormatted: string

    public progression: Progression

    public constructor(data: APIData, title: string, mode: string) {
        super(data, mode)
        assignTitles(this, title)
    }
}

export class SingleDuelsGameMode extends BaseDuelsGameMode {
    public titleFormatted: string

    public titleLevelFormatted: string

    public nextTitleLevelFormatted: string

    public progression: Progression

    public constructor(data: APIData, title: string, mode: string) {
        super(data, mode)
        assignTitles(this, title)
    }
}

export class UHCDuels {
    public titleFormatted: string

    public titleLevelFormatted: string

    public nextTitleLevelFormatted: string

    public progression: Progression

    public overall: PVPBaseDuelsGameMode

    public solo: PVPBaseDuelsGameMode

    public doubles: PVPBaseDuelsGameMode

    public fours: PVPBaseDuelsGameMode

    public deathmatch: PVPBaseDuelsGameMode

    public constructor(data: APIData) {
        this.solo = new PVPBaseDuelsGameMode(data, 'uhc_duel')
        this.doubles = new PVPBaseDuelsGameMode(data, 'uhc_doubles')
        this.fours = new PVPBaseDuelsGameMode(data, 'uhc_four')
        this.deathmatch = new PVPBaseDuelsGameMode(data, 'uhc_meetup')

        this.overall = deepAdd(this.solo, this.doubles, this.fours, this.deathmatch)

        this.overall.winstreak = data.current_uhc_winstreak
        this.overall.bestWinstreak = data.best_uhc_winstreak

        PVPBaseDuelsGameMode.applyRatios(this.overall)

        const {formatted, bold, semi, max, index, color, req, inc} = getTitle(
            this.overall.wins,
            'UHC'
        )

        this.titleFormatted = formatted

        this.titleLevelFormatted = `${color.code}${bold || semi ? '§l' : ''}[${romanNumeral(
            index
        )}]`

        const nextData = getTitle(req + index * inc, 'UHC')

        this.nextTitleLevelFormatted = `${nextData.color.code}${
            nextData.bold || nextData.semi ? '§l' : ''
        }[${romanNumeral(index + 1 > (max ?? 5) ? 1 : index + 1)}]`

        this.progression = createPrefixProgression(prefixes, this.overall.wins)
    }
}
