/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { BuildBattleGuessTheBuild, BuildBattleMultiplayerMode, BuildBattleOverall, BuildBattlePro, } from './mode'
import { GameModes, IGameModes } from '../../../game'
import { createPrefixProgression, defaultPrefix, GameTitle, getFormattedPrefix, } from '../prefixes'
import { Progression } from '../../../progression'

export const BUILD_BATTLE_MODES = new GameModes([
    {api: 'overall'},

    {hypixel: 'BUILD_BATTLE_SOLO_NORMAL_LATEST', formatted: '1.14'},
    {hypixel: 'BUILD_BATTLE_GUESS_THE_BUILD', formatted: 'GTB'},
    {hypixel: 'BUILD_BATTLE_TEAMS_NORMAL', formatted: 'Teams'},
    {hypixel: 'BUILD_BATTLE_SOLO_NORMAL', formatted: 'Solo'},
    {hypixel: 'BUILD_BATTLE_SOLO_PRO', formatted: 'Pro'},
])

const titles: GameTitle[] = [
    {req: 0, fmt: (n) => `§f${n}`, title: 'Rookie'},
    {req: 100, fmt: (n) => `§8${n}`, title: 'Untrained'},
    {req: 250, fmt: (n) => `§e${n}`, title: 'Amateur'},
    {req: 500, fmt: (n) => `§a${n}`, title: 'Apprentice'},
    {req: 1000, fmt: (n) => `§d${n}`, title: 'Experienced'},
    {req: 2000, fmt: (n) => `§9${n}`, title: 'Seasoned'},
    {req: 3500, fmt: (n) => `§2${n}`, title: 'Trained'},
    {req: 5000, fmt: (n) => `§3${n}`, title: 'Skilled'},
    {req: 7500, fmt: (n) => `§c${n}`, title: 'Talented'},
    {req: 10_000, fmt: (n) => `§5${n}`, title: 'Professional'},
    {req: 15_000, fmt: (n) => `§1${n}`, title: 'Expert'},
    {req: 20_000, fmt: (n) => `§4${n}`, title: 'Master'},
]

export type BuildBattleModes = IGameModes<typeof BUILD_BATTLE_MODES>;

export class BuildBattle {
    public overall: BuildBattleOverall

    public solo: BuildBattleMultiplayerMode

    public teams: BuildBattleMultiplayerMode

    public pro: BuildBattlePro

    public guessTheBuild: BuildBattleGuessTheBuild

    public coins: number

    public score: number

    public correctGuesses: number

    public votes: number

    public superVotes: number

    public titleFormatted: string = defaultPrefix(titles)

    public progression: Progression

    public nextTitleFormatted: string

    public latestWins: number

    public constructor(data: APIData) {
        this.overall = new BuildBattleOverall(data)

        this.solo = new BuildBattleMultiplayerMode(data, 'solo')
        this.teams = new BuildBattleMultiplayerMode(data, 'teams')

        this.pro = new BuildBattlePro(data)
        this.guessTheBuild = new BuildBattleGuessTheBuild(data)

        this.latestWins = data.wins_solo_normal_latest
        this.coins = data.coins
        this.score = data.score

        this.correctGuesses = data.correct_guesses
        this.votes = data.total_votes
        this.superVotes = data.super_votes

        this.titleFormatted = getFormattedPrefix({prefixes: titles, score: this.score})

        this.nextTitleFormatted = getFormattedPrefix({
            prefixes: titles,
            score: this.score,
            skip: true,
        })

        this.progression = createPrefixProgression(titles, this.score)
    }
}

export * from './mode'
