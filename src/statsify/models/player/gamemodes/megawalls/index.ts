/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { GameModes, IGameModes } from '../../../game'
import { MegaWallsKit, MegaWallsOverall } from './kit'

export const MEGAWALLS_MODES = new GameModes([
    {api: 'overall'},
    {api: 'arcanist'},
    {api: 'assassin'},
    {api: 'automaton'},
    {api: 'blaze'},
    {api: 'cow'},
    {api: 'creeper'},
    {api: 'dreadlord'},
    {api: 'enderman'},
    {api: 'golem'},
    {api: 'herobrine'},
    {api: 'hunter'},
    {api: 'moleman'},
    {api: 'phoenix'},
    {api: 'pigman'},
    {api: 'pirate'},
    {api: 'renegade'},
    {api: 'shaman'},
    {api: 'shark'},
    {api: 'skeleton'},
    {api: 'snowman'},
    {api: 'spider'},
    {api: 'squid'},
    {api: 'werewolf'},
    {api: 'zombie'},
])

export type MegaWallsModes = IGameModes<typeof MEGAWALLS_MODES>;

export class MegaWalls {
    public coins: number

    public mythicFavor: number

    public class: string

    public overall: MegaWallsOverall

    public arcanist?: MegaWallsKit
    public assassin?: MegaWallsKit
    public automaton?: MegaWallsKit
    public blaze?: MegaWallsKit
    public cow?: MegaWallsKit
    public creeper?: MegaWallsKit
    public dreadlord?: MegaWallsKit
    public enderman?: MegaWallsKit
    public golem?: MegaWallsKit
    public herobrine?: MegaWallsKit
    public hunter?: MegaWallsKit
    public moleman?: MegaWallsKit
    public phoenix?: MegaWallsKit
    public pigman?: MegaWallsKit
    public pirate?: MegaWallsKit
    public renegade?: MegaWallsKit
    public shaman?: MegaWallsKit
    public shark?: MegaWallsKit
    public skeleton?: MegaWallsKit
    public snowman?: MegaWallsKit
    public spider?: MegaWallsKit
    public squid?: MegaWallsKit
    public werewolf?: MegaWallsKit
    public zombie?: MegaWallsKit

    public constructor(data: APIData) {
        this.coins = data.coins
        this.mythicFavor = data.mythic_favor
        this.class = data.chosen_class ?? 'none'

        this.overall = new MegaWallsOverall(data, '')
        this.arcanist = new MegaWallsKit(data, 'arcanist')
        this.assassin = new MegaWallsKit(data, 'assassin')
        this.automaton = new MegaWallsKit(data, 'automaton')
        this.blaze = new MegaWallsKit(data, 'blaze')
        this.cow = new MegaWallsKit(data, 'cow')
        this.creeper = new MegaWallsKit(data, 'creeper')
        this.dreadlord = new MegaWallsKit(data, 'dreadlord')
        this.enderman = new MegaWallsKit(data, 'enderman')
        this.golem = new MegaWallsKit(data, 'golem')
        this.herobrine = new MegaWallsKit(data, 'herobrine')
        this.hunter = new MegaWallsKit(data, 'hunter')
        this.moleman = new MegaWallsKit(data, 'moleman')
        this.phoenix = new MegaWallsKit(data, 'phoenix')
        this.pigman = new MegaWallsKit(data, 'pigman')
        this.pirate = new MegaWallsKit(data, 'pirate')
        this.renegade = new MegaWallsKit(data, 'renegade')
        this.shaman = new MegaWallsKit(data, 'shaman')
        this.shark = new MegaWallsKit(data, 'shark')
        this.skeleton = new MegaWallsKit(data, 'skeleton')
        this.snowman = new MegaWallsKit(data, 'snowman')
        this.spider = new MegaWallsKit(data, 'spider')
        this.squid = new MegaWallsKit(data, 'squid')
        this.werewolf = new MegaWallsKit(data, 'werewolf')
        this.zombie = new MegaWallsKit(data, 'zombie')
    }
}

export * from './kit'
