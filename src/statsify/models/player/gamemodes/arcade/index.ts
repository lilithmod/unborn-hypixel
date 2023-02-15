/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import {
    BlockingDead,
    BountyHunters,
    CaptureTheWool,
    CreeperAttack,
    DragonWars,
    EnderSpleef,
    FarmHunt,
    Football,
    GalaxyWars,
    HideAndSeek,
    HoleInTheWall,
    HypixelSays,
    MiniWalls,
    PartyGames,
    PixelPainters,
    PixelParty,
    Seasonal,
    ThrowOut,
    Zombies,
} from './mode'
import { GameModes, IGameModes } from '../../../game'

export const ARCADE_MODES = new GameModes([
    {api: 'overall'},
    {api: 'blockingDead', hypixel: 'DAYONE'},
    {api: 'bountyHunters', hypixel: 'ONEINTHEQUIVER'},
    {api: 'captureTheWool', hypixel: 'PVP_CTW'},
    {api: 'creeperAttack', hypixel: 'DEFENDER'},
    {api: 'dragonWars', hypixel: 'DRAGONWARS2'},
    {api: 'enderSpleef', hypixel: 'ENDER'},
    {api: 'farmHunt', hypixel: 'FARM_HUNT'},
    {api: 'football', hypixel: 'SOCCER'},
    {api: 'galaxyWars', hypixel: 'STARWARS'},
    {api: 'hideAndSeek'},
    {api: 'holeInTheWall', hypixel: 'HOLE_IN_THE_WALL'},
    {api: 'hypixelSays', hypixel: 'SIMON_SAYS'},
    {api: 'miniWalls', hypixel: 'MINI_WALLS'},
    {api: 'partyGames', hypixel: 'PARTY'},
    {api: 'pixelPainters', hypixel: 'DRAW_THEIR_THING'},
    {api: 'pixelParty', hypixel: 'PIXEL_PARTY'},
    {api: 'seasonal'},
    {api: 'throwOut', hypixel: 'THROW_OUT'},
    {api: 'zombies'},
])

export type ArcadeModes = IGameModes<typeof ARCADE_MODES>;

export class Arcade {
    public coins: number

    public wins: number

    public blockingDead: BlockingDead

    public bountyHunters: BountyHunters

    public captureTheWool: CaptureTheWool

    public creeperAttack: CreeperAttack

    public dragonWars: DragonWars

    public enderSpleef: EnderSpleef

    public farmHunt: FarmHunt

    public football: Football

    public galaxyWars: GalaxyWars

    public hideAndSeek: HideAndSeek

    public holeInTheWall: HoleInTheWall

    public hypixelSays: HypixelSays

    public miniWalls: MiniWalls

    public partyGames: PartyGames

    public pixelPainters: PixelPainters

    public pixelParty: PixelParty

    public seasonal: Seasonal

    public throwOut: ThrowOut

    public zombies: Zombies

    public constructor(data: APIData, ap: APIData) {
        this.coins = data.coins
        this.wins = ap.arcade_arcade_winner
        this.blockingDead = new BlockingDead(data)
        this.bountyHunters = new BountyHunters(data)
        this.captureTheWool = new CaptureTheWool(ap)
        this.creeperAttack = new CreeperAttack(data)
        this.dragonWars = new DragonWars(data, ap)
        this.enderSpleef = new EnderSpleef(data)
        this.farmHunt = new FarmHunt(data)
        this.football = new Football(data)
        this.galaxyWars = new GalaxyWars(data)
        this.hideAndSeek = new HideAndSeek(data, ap)
        this.holeInTheWall = new HoleInTheWall(data)
        this.hypixelSays = new HypixelSays(data)
        this.miniWalls = new MiniWalls(data)
        this.partyGames = new PartyGames(data)
        this.pixelPainters = new PixelPainters(data)
        this.pixelParty = new PixelParty(data)
        this.seasonal = new Seasonal(data)
        this.throwOut = new ThrowOut(data)
        this.zombies = new Zombies(data)
    }
}

export * from './mode'
export * from './seasonal-mode'
