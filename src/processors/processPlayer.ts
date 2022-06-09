import { RawPlayer } from '../types/raw/RawPlayer'
import { Player } from '../types/processed/Player'
import { processDuels } from './processDuels'
import { processUHC } from './processUHC'
import { processMurderMystery } from './processMurderMystery'
import { processSkywars } from './processSkywars'
import { processBedwars } from './processBedwars'
import calcLevel from '../utils/calclevel'
import tagCalc from '../utils/calctag'
import { processWoolGames } from './processWoolGames.js'


export function processPlayer(input: RawPlayer, statsToProcess: Array<'duels' | 'murdermystery' | 'bedwars' | 'skywars' | 'uhc' | 'wool'> = []): Player {
    const json: RawPlayer = input ?? {}
    const stats: any = {}
    statsToProcess.forEach(item => {
        switch(item) {
            case 'duels':
                stats.Duels = processDuels(json.stats.Duels == null ? {} : json.stats.Duels)
                break;
            case 'bedwars':
                stats.Bedwars = processBedwars(json.stats.Bedwars == null ? {} : json.stats.Bedwars)
                break;
            case 'skywars':
                stats.Skywars = processSkywars(json.stats.SkyWars == null ? {} : json.stats.SkyWars)
                break;
            case 'murdermystery':
                stats.MurderMystery = processMurderMystery(json.stats.MurderMystery == null ? {} : json.stats.MurderMystery)
                break;
            case 'uhc':
                stats.UHC = processUHC(json.stats.UHC == null ? {} : json.stats.UHC)
                break;
            case 'wool':
                stats.WoolGames = processWoolGames(json.stats.WoolGames == null ? {} : json.stats.WoolGames)
                break;
        }
    })
    return {
        exp: json.networkExp ?? 0,
        firstLogin: json.firstLogin ?? 0,
        giftsReceived: json.giftingMeta?.realBundlesReceived ?? 0,
        giftsSent: json.giftingMeta?.realBundlesGiven ?? 0,
        karma: json.karma ?? 0,
        lastLogin: json.lastLogin ?? 0,
        lastLogout: json.lastLogout ?? 0,
        level: +Number(calcLevel.getExactLevel(json.networkExp)).toFixed(1),
        links: {
            DISCORD: json.socialMedia?.DISCORD ?? '',
            TWITCH: json.socialMedia?.TWITCH ?? '',
            TWITTER: json.socialMedia?.TWITTER ?? '',
            YOUTUBE: json.socialMedia?.YOUTUBE ?? '',
            INSTAGRAM: json.socialMedia?.INSTAGRAM ?? '',
            HYPIXEL: json.socialMedia?.HYPIXEL ?? ''
        },
        mcVersion: json.mcVersionRp ?? '',
        nameHistory: json.knownAliases ?? [],
        prefix: json.prefix ?? '',
        rank: json.rank ?? '',
        rankF: tagCalc.getString(tagCalc.calcTag(json)) === '&7' ? tagCalc.getString(tagCalc.calcTag(json)) : tagCalc.getString(tagCalc.calcTag(json)) + ' ',
        rankPlusColor: json.rankPlusColor ?? '',
        username: json.displayname ?? '',
        uuid: json.uuid ?? '',
        stats
    }
}