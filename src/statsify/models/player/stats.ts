/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import {
    Arcade,
    ArenaBrawl,
    BedWars,
    BlitzSG,
    BuildBattle,
    Challenges,
    CopsAndCrims,
    Duels,
    General,
    MegaWalls,
    MurderMystery,
    Paintball,
    Parkour,
    Pit,
    Quake,
    Quests,
    SkyWars,
    SmashHeroes,
    SpeedUHC,
    TNTGames,
    TurboKartRacers,
    UHC,
    VampireZ,
    Walls,
    Warlords,
    WoolWars,
} from './gamemodes'
import type { APIData } from '../../util/util.js'

export class PlayerStats {
    public arcade: Arcade

    public arenabrawl: ArenaBrawl

    public bedwars: BedWars

    public blitzsg: BlitzSG

    public buildbattle: BuildBattle

    public challenges: Challenges

    public copsandcrims: CopsAndCrims

    public duels: Duels

    public general: General

    public megawalls: MegaWalls

    public murdermystery: MurderMystery

    public paintball: Paintball

    public parkour: Parkour

    public pit: Pit

    public quake: Quake

    public quests: Quests

    public skywars: SkyWars

    public smashheroes: SmashHeroes

    public speeduhc: SpeedUHC

    public tntgames: TNTGames

    public turbokartracers: TurboKartRacers

    public uhc: UHC

    public vampirez: VampireZ

    public walls: Walls

    public warlords: Warlords

    public woolwars: WoolWars

    public constructor(data: APIData = {}) {
        const achievements = data?.achievements ?? {}
        const stats = data?.stats ?? {}
        const legacy = stats.Legacy ?? {}

        this.arcade = new Arcade(stats.Arcade ?? {}, achievements)
        this.arenabrawl = new ArenaBrawl(stats.Arena ?? {}, legacy)
        this.bedwars = new BedWars(stats.Bedwars ?? {})
        this.blitzsg = new BlitzSG(stats.HungerGames ?? {})
        this.buildbattle = new BuildBattle(stats.BuildBattle ?? {})
        this.challenges = new Challenges(data?.challenges?.all_time ?? {}, achievements)
        this.copsandcrims = new CopsAndCrims(stats.MCGO ?? {})
        this.duels = new Duels(stats.Duels ?? {})
        this.general = new General(data, legacy)
        this.megawalls = new MegaWalls(stats.Walls3 ?? {})
        this.murdermystery = new MurderMystery(stats.MurderMystery ?? {}, achievements)
        this.paintball = new Paintball(stats.Paintball ?? {}, legacy)
        this.parkour = new Parkour(data.parkourCompletions ?? {})
        this.pit = new Pit(stats.Pit?.profile ?? {}, stats.Pit?.pit_stats_ptl ?? {})
        this.quake = new Quake(stats.Quake ?? {}, achievements, legacy)
        this.quests = new Quests(data.quests ?? {})
        this.skywars = new SkyWars(stats.SkyWars ?? {}, achievements)
        this.smashheroes = new SmashHeroes(stats.SuperSmash ?? {})
        this.speeduhc = new SpeedUHC(stats.SpeedUHC ?? {})
        this.tntgames = new TNTGames(stats.TNTGames ?? {}, achievements)
        this.turbokartracers = new TurboKartRacers(stats.GingerBread ?? {}, legacy)
        this.uhc = new UHC(stats.UHC ?? {})
        this.vampirez = new VampireZ(stats.VampireZ ?? {}, legacy)
        this.walls = new Walls(stats.Walls ?? {}, legacy)
        this.warlords = new Warlords(stats.Battleground ?? {})
        this.woolwars = new WoolWars(stats.WoolGames ?? {})
    }
}
