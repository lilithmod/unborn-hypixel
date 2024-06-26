import { fetch, FetchMethods, FetchResultTypes } from '@sapphire/fetch'
import { RawPlayer } from './types/raw/RawPlayer'
import { URLSearchParams } from 'url'
import { setTimeout as setTimeoutAsync } from 'timers/promises'
import EventEmitter from 'events'

let proxyEndpoint = 'https://api.lilith.rip/mojang/profiles'
export function setProxyEndpoint(endpoint: string) {
    proxyEndpoint = endpoint
}

let batchMojang = false
export function setBatchMojang(value: boolean) {
    batchMojang = value
}

async function fetchJsonEndpoint<T>(endpoint: string, query: any): Promise<T> {
    const headers = {}
    if (query['key'] != null) {
        const key = query['key']
        delete query['key']
        headers['API-Key'] = key
    }
    let request: Response = await fetch(`https://api.hypixel.net${endpoint}?${new URLSearchParams(query)}`, {
        headers
    }, FetchResultTypes.Result)
    while (request.status === 429) {
        if (request.headers.has('RateLimit-Reset')) {
            await setTimeoutAsync(parseInt(request.headers.get('RateLimit-Reset')) * 1000)
        } else await setTimeoutAsync(1000)

        request = await fetch(`https://api.hypixel.net${endpoint}?${new URLSearchParams(query)}`, {
            headers
        }, FetchResultTypes.Result)
    }
    return await request.json()
}

export function dashedUUID(input: string): string {
    return `${input.substring(0, 8)}-${input.substring(8, 12)}-${input.substring(12, 16)}-${input.substring(16, 20)}-${input.substring(20)}`
}

const usernameQueue = []
const usernameCache = new Map()
const usernameEmitter = new EventEmitter()

export async function resolveUsername(input: string, dashes: boolean = true, throwErr: boolean = false): Promise<string> {
    if (!input.includes('-') || input.length < 17) {

        let output: string | null
        if (usernameCache.has(input)) {
            output = usernameCache.get(input)
        } else {
            if (batchMojang) {
                usernameQueue.push(input)
                const [uuid] = await waitFor(input.toLowerCase(), usernameEmitter)
                output = uuid
            } else {
                try {
                    const { id } = await fetch(
                        proxyEndpoint + '/' + input,
                        FetchResultTypes.JSON
                    )
                    usernameCache.set(input, id ?? null)
                    output = id ?? null
                } catch(e) {

                }

            }
        }

        if (output == null && throwErr) {
            throw new Error(`Failed to fetch UUID for username: ${input}`)
        }

        if (output !== null && dashes) {
            return dashedUUID(output)
        }

        return output
    } else {
        return input
    }
}
export const waitFor = (
    event: string,
    emitter: EventEmitter,
): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        const startListening = (): void => {
            emitter.addListener(event, handleEvent)
        }

        const stopListening = (): void => {
            emitter.removeListener(event, handleEvent)
        }

        const handleEvent = (...data: any[]): void => {
            stopListening()
            resolve(data)
        }

        startListening()
    })
}

async function processQueue() {
    if (usernameQueue.length === 0) return
    const usernamesToProcess = usernameQueue.splice(0, 10)

    try {
        const httpResponse = await fetch(
            proxyEndpoint,
            {
                method: FetchMethods.Post,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usernamesToProcess),
            },
            FetchResultTypes.Result
        )

        if (httpResponse.status === 429) {
            // console.log(httpResponse)
            usernameQueue.unshift(...usernamesToProcess)
            return
        }

        const responses: {
            id: string
            name: string
        }[] = await httpResponse.json()

        for (const username of usernamesToProcess) {
            const response = responses.find((response) => response.name.toLowerCase() === username.toLowerCase())
            if (response == undefined) {
                usernameCache.set(username, null)
                usernameEmitter.emit(username.toLowerCase(), null)
            } else {
                usernameCache.set(username, response.id)
                usernameEmitter.emit(username.toLowerCase(), response.id)
            }
        }

    } catch(e) {
        // console.log(e)
        usernameQueue.unshift(...usernamesToProcess)
    }


}

setInterval(processQueue, 100)

export async function fetchPlayerRaw(input: string, key: string, throwErr: boolean = false): Promise<PlayerResponse> {
    const resolvedInput = await resolveUsername(input)
    const response: PlayerResponse = (await fetchJsonEndpoint('/player', {
        uuid: resolvedInput,
        key
    }) as PlayerResponse)
    if (throwErr && response.success == false) {
        throw new Error(response.cause)
    } else return response
}

export async function fetchFriends(input: string, key: string, throwErr: boolean = false): Promise<FriendsResponse> {
    const resolvedInput = await resolveUsername(input)
    const response: FriendsResponse = (await fetchJsonEndpoint('/friends', {
        uuid: resolvedInput,
        key
    }) as FriendsResponse)
    if (throwErr && response.success == false) {
        throw new Error(response.cause)
    } else return response
}

export async function fetchRecentGames(input: string, key: string, throwErr: boolean = false): Promise<RecentGamesResponse> {
    const resolvedInput = await resolveUsername(input)
    const response: RecentGamesResponse = (await fetchJsonEndpoint('/recentgames', {
        uuid: resolvedInput,
        key
    }) as RecentGamesResponse)
    if (throwErr && response.success == false) {
        throw new Error(response.cause)
    } else return response
}

export async function fetchStatus(input: string, key: string, throwErr: boolean = false): Promise<StatusResponse> {
    const resolvedInput = await resolveUsername(input, false, throwErr)
    const response: StatusResponse = (await fetchJsonEndpoint('/status', {
        uuid: resolvedInput,
        key
    }) as StatusResponse)
    if (throwErr && response.success == false) {
        throw new Error(response.cause)
    } else return response
}

export async function fetchGuildByPlayer(uuid: string, key: string, throwErr: boolean = false): Promise<GuildResponse> {
    const resolvedInput = await resolveUsername(uuid)
    const response: GuildResponse = (await fetchJsonEndpoint('/guild', {
        uuid: resolvedInput,
        key
    }) as GuildResponse)
    if (throwErr && response.success == false) {
        throw new Error(response.cause)
    } else return response
}

export async function fetchGuildByName(name: string, key: string, throwErr: boolean = false): Promise<GuildResponse> {
    const response: GuildResponse = (await fetchJsonEndpoint('/guild', {
        name: name,
        key
    }) as GuildResponse)
    if (throwErr && response.success == false) {
        throw new Error(response.cause)
    } else return response
}

export async function fetchGuildById(id: string, key: string, throwErr: boolean = false): Promise<GuildResponse> {
    const response: GuildResponse = (await fetchJsonEndpoint('/guild', {
        id,
        key
    }) as GuildResponse)
    if (throwErr && response.success == false) {
        throw new Error(response.cause)
    } else return response
}

export async function fetchRankedSkywars(input: string, key: string, throwErr: boolean = false): Promise<RankedSkywarsResponse> {
    const resolvedInput = await resolveUsername(input)
    const response: RankedSkywarsResponse = (await fetchJsonEndpoint('/player/ranked/skywars', {
        uuid: resolvedInput,
        key
    }) as RankedSkywarsResponse)
    if (throwErr && response.success == false) {
        throw new Error(response.cause)
    } else return response
}

export async function fetchGameInformation(): Promise<GameResources> {
    return (await fetchJsonEndpoint('/resources/games', {}) as GameResources)
}

export async function fetchAchievements(): Promise<AchievementResources> {
    return (await fetchJsonEndpoint('/resources/achievements', {}) as AchievementResources)
}

export async function fetchChallenges(): Promise<ChallengeResources> {
    return (await fetchJsonEndpoint('/resources/challenges', {}) as ChallengeResources)
}

export async function fetchQuests(): Promise<QuestResources> {
    return (await fetchJsonEndpoint('/resources/quests', {}) as QuestResources)
}

export async function fetchGuildAchievements(): Promise<GuildAchievementResources> {
    return (await fetchJsonEndpoint('/resources/guilds/achievements', {}) as GuildAchievementResources)
}

export async function fetchGuildPermissions(): Promise<GuildPermissionResources> {
    return (await fetchJsonEndpoint('/resources/guilds/permissions', {}) as GuildPermissionResources)
}

export async function fetchBoosters(key: string, throwErr: boolean = false): Promise<BoostersResponse> {
    const response: BoostersResponse = (await fetchJsonEndpoint('/boosters', {
        key
    }) as BoostersResponse)
    if (throwErr && response.success == false) {
        throw new Error(response.cause)
    } else return response
}

export async function fetchPlayerCounts(key: string, throwErr: boolean = false): Promise<PlayerCountResponse> {
    const response: PlayerCountResponse = (await fetchJsonEndpoint('/counts', {
        key
    }) as PlayerCountResponse)
    if (throwErr && response.success == false) {
        throw new Error(response.cause)
    } else return response
}

export async function fetchLeaderboards(key: string, throwErr: boolean = false): Promise<LeaderboardsResponse> {
    const response: LeaderboardsResponse = (await fetchJsonEndpoint('/leaderboards', {
        key
    }) as LeaderboardsResponse)
    if (throwErr && response.success == false) {
        throw new Error(response.cause)
    } else return response
}

export async function fetchPunishmentStats(key: string, throwErr: boolean = false): Promise<PunishmentStatsResponse> {
    const response: PunishmentStatsResponse = (await fetchJsonEndpoint('/punishmentstats', {
        key
    }) as PunishmentStatsResponse)
    if (throwErr && response.success == false) {
        throw new Error(response.cause)
    } else return response
}

export type PlayerDbResponse = {
    code: 'player.found'
    message: 'Successfully found player by given ID.'
    data: {
        player: {
            meta: {
                name_history: Array<{
                    name: string
                    changedToAt?: number
                }>
            }
            username: string
            id: string
            raw_id: string
            avatar: string
        }
    }
    success: true
} | {
    code: 'minecraft.api_failure'
    message: ''
    data: {}
    success: false
    error: true
}

export type MojangAPIResponse = {
    name: string
    id: string
} | {
    error: 'BadRequestException'
    errorMessage: string
} | {
    error: 'TooManyRequestsException'
    errorMessage: string
}

export type KeyResponse = {
    success: true,
    record: {
        key: string
        owner: string
        limit: number
        queriesInPastMin: number
        totalQueries: number
    }
} | {
    success: false,
    cause: 'Invalid API key'
} | {
    success: false,
    cause: 'Key throttle'
    throttle: boolean
    global: boolean
}

export type PlayerResponse = {
    success: true
    player: RawPlayer
} | {
    success: false
    cause: string
} | {
    success: false
    cause: 'Invalid API key'
} | {
    success: false,
    cause: 'Key throttle'
    throttle: boolean
    global: boolean
}

export type FriendsResponse = {
    success: true
    uuid: string
    records: Array<{
        _id: string
        uuidSender: string
        uuidReceiver: string
        started: number
    }>
} | {
    success: false
    cause: string
} | {
    success: false
    cause: 'Invalid API key'
} | {
    success: false
    cause: 'Malformed UUID'
} | {
    success: false,
    cause: 'Key throttle'
    throttle: boolean
    global: boolean
}

export type RecentGamesResponse = {
    success: true
    uuid: string
    games: Array<{
        date: number
        gameType: string
        mode: string
        map?: string
        ended: number
    }>
} | {
    success: false
    cause: string
} | {
    success: false
    cause: 'Invalid API key'
} | {
    success: false
    cause: 'Malformed UUID'
} | {
    success: false,
    cause: 'Key throttle'
    throttle: boolean
    global: boolean
}

export type StatusResponse = {
    success: true
    uuid: string
    session: {
        online: boolean
        gameType: string
        mode?: string
        map?: string
    }
} | {
    success: false
    cause: string
} | {
    success: false
    cause: 'Invalid API key'
} | {
    success: false,
    cause: 'Key throttle'
    throttle: boolean
    global: boolean
}

export type GuildResponse = {
    success: true
    guild: {
        _id: string
        name: string
        name_lower: string
        coins?: number
        coinsEver?: number
        created: number
        members: Array<{
            uuid: string
            rank: string
            joined: number
            questParticipation: number
            expHistory: {
                [date: string]: number
            }
        }>
        ranks: Array<{
            name: string
            default: boolean
            tag: string | null
            created: number
            priority: number
        }>
        achievements: {
            [name: string]: number
        }
        exp: number
        publiclyListed: boolean
        description: string
        tag: string
        tagColor: string
        guildExpByGameType: {
            SKYBLOCK: number
            GINGERBREAD: number
            SUPER_SMASH: number
            REPLAY: number
            UHC: number
            BUILD_BATTLE: number
            SPEED_UHC: number
            ARCADE: number
            QUAKECRAFT: number
            DUELS: number
            SKYWARS: number
            WALLS3: number
            VAMPIREZ: number
            BEDWARS: number
            PIT: number
            BATTLEGROUND: number
            WALLS: number
            MURDER_MYSTERY: number
            MCGO: number
            TNTGAMES: number
            PAINTBALL: number
            ARENA: number
            PROTOTYPE: number
            LEGACY: number
            SMP: number
            SURVIVAL_GAMES: number
            HOUSING: number
        }
    }
} | {
    success: false
    cause: string
} | {
    success: false
    cause: 'Invalid API key'
} | {
    success: false,
    cause: 'Key throttle'
    throttle: boolean
    global: boolean
}

export type RankedSkywarsResponse = {
    success: true
    result: {
        key: string
        position: number
        score: number
    }
} | {
    success: false
    cause: string
} | {
    success: false
    cause: 'Invalid API key'
} | {
    success: false
    cause: 'No result was found'
} | {
    success: false
    cause: 'Malformed UUID'
} | {
    success: false,
    cause: 'Key throttle'
    throttle: boolean
    global: boolean
}

export type GameResources = {
    success: true
    lastUpdated: number
    games: {
        [property: string]: {
            id: number
            name: string
            databaseName: string
            modeNames: any
        }
    }
}

export type AchievementResources = {
    success: true,
    lastUpdated: number
    achievements: {
        [gameType: string]: {
            one_time: {
                [achievement: string]: {
                    points: number
                    name: string
                    description: string
                    gamePercentUnlocked: number
                    globalPercentUnlocked: number
                }
            }
            tiered: {
                [achievement: string]: {
                    name: string
                    description: string
                    tiers: Array<{
                        tier: number
                        points: number
                        amount: number
                    }>
                }
            }
            total_points: number
            total_legacy_points: number
        }
    }
}

export type ChallengeResources = {
    success: true
    lastUpdated: number
    challenges: {
        [gameType: string]: Array<{
            id: string
            name: string
            rewards: Array<{
                type: string
                amount: number
            }>
        }>
    }
}

export type QuestResources = {
    success: true
    lastUpdated: number
    quests: {
        [gameType: string]: Array<{
            id: string
            name: string
            rewards: Array<{
                type: string
                amount: number
            }>
            objectives: Array<{
                id: string
                type: string
                integer?: number
            }>
            requirements: Array<{
                type: string
            }>
            description: string
        }>
    }
}

export type GuildAchievementResources = {
    success: true
    lastUpdated: number
    // No data currently in API to type off of
    one_time: any
    tiered: {
        [achievement: string]: {
            name: string
            description: string
            tiers: Array<{
                tier: number
                amount: number
            }>
        }
    }
}

export type GuildPermissionResources = {
    success: true
    lastUpdated: number
    permissions: Array<{
        [lang: string]: {
            name: string
            description: string
            item: {
                name: string
            }
        }
    }>
}

export type BoostersResponse = {
    success: true
    boosters: Array<{
        _id: string
        purchaserUuid: string
        amount: number
        originalLength: number
        length: number
        gameType: number
        dateActivated: number
        stacked?: string[] | boolean
    }>
    boosterState: {
        decrementing: boolean
    }
} | {
    success: false
    cause: 'Invalid API key'
} | {
    success: false,
    cause: 'Key throttle'
    throttle: boolean
    global: boolean
}

export type PlayerCountResponse = {
    success: true
    playerCount: number
    games: {
        [gameType: string]: {
            players: number
            modes?: {
                [mode: string]: number
            }
        }
    }
} | {
    success: false
    cause: 'Invalid API key'
} | {
    success: false,
    cause: 'Key throttle'
    throttle: boolean
    global: boolean
}

export type LeaderboardsResponse = {
    success: true
    leaderboards: {
        [gameType: string]: Array<{
            path: string
            prefix: string
            title: string
            location: string
            count: number
            leaders: string[]
        }>
    }
} | {
    success: false
    cause: 'Invalid API key'
} | {
    success: false,
    cause: 'Key throttle'
    throttle: boolean
    global: boolean
} | {
    success: false
    cause: "Leaderboard data has not yet been populated"
}

export type PunishmentStatsResponse = {
    success: true
    staff_total: number
    staff_rollingDaily: number
    watchdog_total: number
    watchdog_rollingDaily: number
    watchdog_lastMinute: number
} | {
    success: false
    cause: 'Invalid API key'
} | {
    success: false,
    cause: 'Key throttle'
    throttle: boolean
    global: boolean
} | {
    success: false
    cause: "Leaderboard data has not yet been populated"
}
