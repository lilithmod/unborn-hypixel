export interface WoolGames {
    coins: number
    progression: {
        layers: number
        experience: number
        star: number
    }
    starFormatted: string
    packages: string[]
    cosmetics: {
        barrier: string
        killMessages: string
        hat: string
        deathCry: string
        projectileTrail: string
    }
    woolWars: {
        selectedClass: string
        stats: {
            overall: {
                assists: number
                blocksBroken: number
                deaths: number
                gamesPlayed: number
                kdr: number
                kills: number
                losses: number
                powerups: number
                wins: number
                wlr: number
                woolPlaced: number

            }
            classes: {
                [kit: string]: {
                    assists: number
                    blocksBroken: number
                    deaths: number
                    gamesPlayed: number
                    kdr: number
                    kills: number
                    losses: number
                    powerups: number
                    wins: number
                    wlr: number
                    woolPlaced: number
                }
            }
        }
        layouts: {
            [kit: string]: {
                [slot: number]: string
            }
        }
    }
}