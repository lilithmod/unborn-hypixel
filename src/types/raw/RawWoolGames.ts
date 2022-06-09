export interface RawWoolGames {
    coins?: number
    progression?: {
        layers?: number
        experience?: number
    }
    packages?: string[]
    barrier?: string
    killmessages?: string
    hat?: string
    deathcry?: string
    projectiletrail?: string
    wool_wars?: {
        selected_class?: string
        stats?: {
            assists?: number
            blocks_broken?: number
            deaths?: number
            games_played?: number
            kills?: number
            powerups_gotten?: number
            wins?: number
            wool_placed?: number
            classes?: {
                [kit: string]: {
                    assists?: number
                    blocks_broken?: number
                    deaths?: number
                    games_played?: number
                    kills?: number
                    powerups_gotten?: number
                    wins?: number
                    wool_placed?: number
                }
            }
        }
        layouts?: {
            [kit: string]: {
                [slot: number]: string
            }
        }
    }
}