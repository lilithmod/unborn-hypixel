import { RawUHC } from '../types/raw/RawUHC'
import { UHC } from '../types/processed/UHC'

export function processUHC(json: RawUHC): UHC {
    return {
        solo: {
            deaths: json.deaths_solo ?? 0,
            extraUltimatesCrafted: json.extra_ultimates_crafted_solo ?? 0,
            headsEaten: json.heads_eaten_solo ?? 0,
            kills: json.kills_solo ?? 0,
            ultimatesCrafted: json.ultimates_crafted_solo ?? 0,
            wins: json.wins_solo ?? 0
        },
        brawl: {
            deaths: json.deaths_brawl ?? 0,
            extraUltimatesCrafted: (json.extra_ultimates_crafted_duo_brawl + json.extra_ultimates_crafted_solo_brawl) ?? 0,
            headsEaten: json.heads_eaten_brawl ?? 0,
            kills: json.kills_brawl ?? 0,
            solo: {
                deaths: json.deaths_solo_brawl ?? 0,
                extraUltimatesCrafted: json.extra_ultimates_crafted_solo_brawl ?? 0,
                headsEaten: json.heads_eaten_solo_brawl ?? 0,
                kills: json.kills_solo_brawl ?? 0,
                ultimatesCrafted: json.ultimates_crafted_solo_brawl ?? 0,
                wins: json.wins_solo_brawl ?? 0
            },
            duo: {
                deaths: json.deaths_duo_brawl ?? 0,
                extraUltimatesCrafted: json.extra_ultimates_crafted_duo_brawl ?? 0,
                headsEaten: json.heads_eaten_duo_brawl ?? 0,
                kills: json.kills_duo_brawl ?? 0,
                ultimatesCrafted: json.ultimates_crafted_duo_brawl ?? 0,
                wins: json.wins_duo_brawl ?? 0
            },
            ultimatesCrafted: (json.ultimates_crafted_solo_brawl + json.ultimates_crafted_duo_brawl) ?? 0,
            wins: json.wins_brawl ?? 0
        },
        clearupAchievement: json.clearup_achievement ?? false,
        coins: json.coins ?? 0,
        deaths: json.deaths ?? 0,
        equippedKit: json.equippedKit ?? '',
        extraUltimatesCrafted: json.extra_ultimates_crafted ?? 0,
        headsEaten: json.heads_eaten ?? 0,
        kills: json.kills ?? 0,
        kits: {
            archeryTools: json.kit_ARCHERY_TOOLS ?? 0,
            ecologist: json.kit_ECOLOGIST ?? 0,
            farmer: json.kit_FARMER ?? 0,
            horseman: json.kit_HORSEMAN ?? 0,
            leatherArmor: json.kit_LEATHER_ARMOR ?? 0,
            looter: json.kit_LOOTER ?? 0,
            lunchBox: json.kit_LUNCH_BOX ?? 0,
            magicTools: json.kit_MAGIC_TOOLS ?? 0,
            trapper: json.kit_TRAPPER ?? 0,
            workingTools: json.kit_WORKING_TOOLS ?? 0
        },
        noDiamonds: {
            deaths: json['deaths_no diamonds'] ?? 0,
            headsEaten: json['heads_eaten_no diamonds'] ?? 0,
            kills: json['kills_no diamonds'] ?? 0,
            wins: json['wins_no diamonds'] ?? 0
        },
        packages: json.packages ?? [],
        parkour1: json.uhc_parkour_1 ?? false,
        parkour2: json.uhc_parkour_2 ?? false,
        perks: {
            alchemy: {
                a: json.perk_alchemy_line_a ?? 0,
                b: json.perk_alchemy_line_b ?? 0,
                c: json.perk_alchemy_line_c ?? 0,
                prestige: json.perk_alchemy_prestige ?? 0
            },
            apprentice: {
                a: json.perk_apprentice_line_a ?? 0,
                b: json.perk_apprentice_line_b ?? 0,
                c: json.perk_apprentice_line_c ?? 0,
                prestige: json.perk_apprentice_prestige ?? 0
            },
            armorsmith: {
                a: json.perk_armorsmith_line_a ?? 0,
                b: json.perk_armorsmith_line_b ?? 0,
                c: json.perk_armorsmith_line_c ?? 0,
                prestige: json.perk_armorsmith_prestige ?? 0
            },
            bloodcraft: {
                a: json.perk_bloodcraft_line_a ?? 0,
                b: json.perk_bloodcraft_line_b ?? 0,
                c: json.perk_bloodcraft_line_c ?? 0,
                prestige: json.perk_bloodcraft_prestige ?? 0
            },
            cooking: {
                a: json.perk_cooking_line_a ?? 0,
                b: json.perk_cooking_line_b ?? 0,
                c: json.perk_cooking_line_c ?? 0,
                prestige: json.perk_cooking_prestige ?? 0
            },
            enchanting: {
                a: json.perk_enchanting_line_a ?? 0,
                b: json.perk_enchanting_line_b ?? 0,
                c: json.perk_enchanting_line_c ?? 0,
                prestige: json.perk_enchanting_prestige ?? 0
            },
            engineering: {
                a: json.perk_engineering_line_a ?? 0,
                b: json.perk_engineering_line_b ?? 0,
                c: json.perk_engineering_line_c ?? 0,
                prestige: json.perk_engineering_prestige ?? 0
            },
            hunter: {
                a: json.perk_hunter_line_a ?? 0,
                b: json.perk_hunter_line_b ?? 0,
                c: json.perk_hunter_line_c ?? 0,
                prestige: json.perk_hunter_prestige ?? 0
            },
            invention: {
                a: json.perk_invention_line_a ?? 0,
                b: json.perk_invention_line_b ?? 0,
                c: json.perk_invention_line_c ?? 0,
                prestige: json.perk_invention_prestige ?? 0
            },
            strategist: {
                a: json.perk_strategist_line_a ?? 0,
                b: json.perk_strategist_line_b ?? 0,
                c: json.perk_strategist_line_c ?? 0,
                prestige: json.perk_strategist_prestige ?? 0
            },
            survivalism: {
                a: json.perk_survivalism_line_a ?? 0,
                b: json.perk_survivalism_line_b ?? 0,
                c: json.perk_survivalism_line_c ?? 0,
                prestige: json.perk_survivalism_prestige ?? 0
            },
            toolsmithing: {
                a: json.perk_toolsmithing_line_a ?? 0,
                b: json.perk_toolsmithing_line_b ?? 0,
                c: json.perk_toolsmithing_line_c ?? 0,
                prestige: json.perk_toolsmithing_prestige ?? 0
            },
            weaponsmith: {
                a: json.perk_weaponsmith_line_a ?? 0,
                b: json.perk_weaponsmith_line_b ?? 0,
                c: json.perk_weaponsmith_line_c ?? 0,
                prestige: json.perk_weaponsmith_prestige ?? 0
            },
        },
        redVsBlue: {
            deaths: json['deaths_red vs blue'] ?? 0,
            headsEaten: json['heads_eaten_red vs blue'] ?? 0,
            kills: json['kills_red vs blue'] ?? 0,
            wins: json['wins_red vs blue'] ?? 0
        },
        savedStats: json.saved_stats ?? false,
        score: json.score ?? 0,
        teammateDamage: json.teammate_damage ?? false,
        ultimatesCrafted: json.ultimates_crafted ?? 0,
        wins: json.wins ?? 0

    }
}