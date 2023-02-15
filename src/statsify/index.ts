import { fetch, FetchResultTypes, RequestOptions } from '@sapphire/fetch'
import { StatsifyPlayerResponse, StatsifyPlayerResponseWithErrors } from './types/responses.js'
import { StatsifyError, StatsifyError400, StatsifyError404 } from './types/errors.js'

export class StatsifyAPIClient {
    baseURL: string

    constructor(baseURL: string) {
        this.baseURL = baseURL

    }

    async test() {
        const test = unwrap(await this.request('/player'), (err) => {
            // do stuff based on error here
            // return a default value, or throw
            return 'hi' as unknown as StatsifyPlayerResponse
        })
    }

    private request(path: '/player', options?: RequestOptions): Promise<StatsifyPlayerResponseWithErrors>;
    private async request<T>(path: string, two: FetchResultTypes | RequestOptions = FetchResultTypes.JSON, three?: FetchResultTypes): Promise<any> {
        const options = typeof two === 'object' ? two : undefined
        const type = typeof two === 'object' ? three ?? FetchResultTypes.JSON : two

        const url = new URL(path, this.baseURL)
        return await fetch(url, options, type)
    }

}

export function unwrap<StatsifyPlayerResponseWithErrors>(obj: StatsifyPlayerResponseWithErrors, callback: (err: StatsifyError400 | StatsifyError404) => StatsifyPlayerResponse): StatsifyPlayerResponse
export function unwrap<T extends StatsifyError>(obj: T, callback: (err) => any): any {
    if ('statusCode' in obj && 'error' in obj) {
        return callback(obj)
    }
    return obj
}