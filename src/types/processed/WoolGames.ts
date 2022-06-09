export interface WoolGames {
    coins: number
    progression: {
        layers: number
        experience: number
    }
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
                kills: number
                powerups: number
                wins: number
                woolPlaced: number
            }
            classes: {
                [kit: string]: {
                    assists: number
                    blocksBroken: number
                    deaths: number
                    gamesPlayed: number
                    kills: number
                    powerups: number
                    wins: number
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