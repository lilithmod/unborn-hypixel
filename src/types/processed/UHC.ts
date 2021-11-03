export interface UHC {
    clearupAchievement: boolean
    coins: number
    deaths: number
    headsEaten: number
    equippedKit: string
    ultimatesCrafted: number
    extraUltimatesCrafted: number
    kills: number
    wins: number
    savedStats: boolean
    score: number
    teammateDamage: boolean
    parkour1: boolean
    parkour2: boolean
    solo: {
        deaths: number
        headsEaten: number
        kills: number
        wins: number
        ultimatesCrafted: number
        extraUltimatesCrafted: number
    }
    brawl: {
        deaths: number
        headsEaten: number
        ultimatesCrafted: number
        extraUltimatesCrafted: number
        kills: number
        wins: number
        solo: {
            deaths: number
            headsEaten: number
            kills: number
            wins: number
            ultimatesCrafted: number
            extraUltimatesCrafted: number
        }
        duo: {
            deaths: number
            headsEaten: number
            kills: number
            wins: number
            ultimatesCrafted: number
            extraUltimatesCrafted: number
        }
    }
    noDiamonds: {
        deaths: number
        headsEaten: number
        kills: number
        wins: number
    }
    redVsBlue: {
        deaths: number
        headsEaten: number
        kills: number
        wins: number
    }
    kits: {
        archeryTools: number
        ecologist: number
        farmer: number
        horseman: number
        leatherArmor: number
        looter: number
        lunchBox: number
        magicTools: number
        trapper: number
        workingTools: number
    }
    perks: {
        alchemy: {
            a: number
            b: number
            c: number
            prestige: number
        }
        apprentice: {
            a: number
            b: number
            c: number
            prestige: number
        }
        armorsmith: {
            a: number
            b: number
            c: number
            prestige: number
        }
        bloodcraft: {
            a: number
            b: number
            c: number
            prestige: number
        }
        cooking: {
            a: number
            b: number
            c: number
            prestige: number
        }
        enchanting: {
            a: number
            b: number
            c: number
            prestige: number
        }
        engineering: {
            a: number
            b: number
            c: number
            prestige: number
        }
        hunter: {
            a: number
            b: number
            c: number
            prestige: number
        }
        invention: {
            a: number
            b: number
            c: number
            prestige: number
        }
        strategist: {
            a: number
            b: number
            c: number
            prestige: number
        }
        survivalism: {
            a: number
            b: number
            c: number
            prestige: number
        }
        toolsmithing: {
            a: number
            b: number
            c: number
            prestige: number
        }
        weaponsmith: {
            a: number
            b: number
            c: number
            prestige: number
        }
    }
    packages: string[]
}