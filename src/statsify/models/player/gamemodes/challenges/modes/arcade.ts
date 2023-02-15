/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../../util/util.js'
import { add } from '../../../../../util/math.js'
import type { GameChallenges } from '../game-challenges'

export class ArcadeChallenges implements GameChallenges {
    public farmHunt: number

    public blockingDead: number

    public bountyHunters: number

    public creeperAttack: number

    public dragonWars: number

    public enderSpleef: number

    public galaxyWars: number

    public throwOut: number

    public holeInTheWall: number

    public hypixelSays: number

    public pixelPainters: number

    public partyGames: number

    public football: number

    public miniWalls: number

    public captureTheWool: number

    public zombies: number

    public hideAndSeek: number

    public pixelParty: number

    public total: number

    public constructor(challenges: APIData) {
        this.farmHunt = challenges.ARCADE__farm_hunt_challenge
        this.blockingDead = challenges.ARCADE__blocking_dead_challenge
        this.bountyHunters = challenges.ARCADE__bounty_hunter_challenge
        this.creeperAttack = challenges.ARCADE__creeper_attack_challenge
        this.dragonWars = challenges.ARCADE__dragon_wars_challenge
        this.enderSpleef = challenges.ARCADE__ender_spleef_challenge
        this.galaxyWars = challenges.ARCADE__galaxy_wars_challenge
        this.throwOut = challenges.ARCADE__throw_out_challenge
        this.holeInTheWall = challenges.ARCADE__hole_in_the_wall_challenge
        this.hypixelSays = challenges.ARCADE__hypixel_says_challenge
        this.pixelPainters = challenges.ARCADE__pixel_painters_challenge
        this.partyGames = challenges.ARCADE__party_games_challenge
        this.football = challenges.ARCADE__football_challenge
        this.miniWalls = challenges.ARCADE__mini_walls_challenge
        this.captureTheWool = challenges.ARCADE__capture_the_wool_challenge
        this.zombies = challenges.ARCADE__zombies_challenge
        this.hideAndSeek = challenges.ARCADE__hide_and_seek_challenge
        this.pixelParty = challenges.ARCADE__pixel_party_challenge

        this.total = add(
            this.farmHunt,
            this.blockingDead,
            this.bountyHunters,
            this.creeperAttack,
            this.dragonWars,
            this.enderSpleef,
            this.galaxyWars,
            this.throwOut,
            this.holeInTheWall,
            this.hypixelSays,
            this.pixelPainters,
            this.partyGames,
            this.football,
            this.miniWalls,
            this.captureTheWool,
            this.zombies,
            this.hideAndSeek,
            this.pixelParty
        )
    }
}
