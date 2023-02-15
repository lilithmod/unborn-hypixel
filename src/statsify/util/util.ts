/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

export type APIData = Record<string, any>;

export type RemoveMethods<T> = Pick<
    T,
    // eslint-disable-next-line @typescript-eslint/ban-types
    { [Key in keyof T]: T[Key] extends Function ? never : Key }[keyof T]
>;

export type Constructor<T = any> = new (...args: any[]) => T;
export type UnwrapConstructor<T> = T extends Constructor<infer U> ? U : never;

export const noop = <T>() => null as unknown as T

/**
 * @description Finds the element in the array where the `score` value is is greater than the `req` value but less than the next `req`.
 * @param data An array of objects with a `req` property
 * @param score The value to compare against
 * @returns The index of the element that meets the condition
 */
export const findScoreIndex = <T extends { req: number }>(data: T[], score = 0): number =>
    data.findIndex(
        ({req}, index, arr) =>
            score >= req && ((arr[index + 1] && score < arr[index + 1].req) || !arr[index + 1])
    )

/**
 *
 * @description Finds the element in the array where the `score` value is is greater than the `req` value but less than the next `req`.
 * @param data An array of objects with a `req` property
 * @param score The value to compare against
 * @returns The element that meets the condition
 */
export const findScore = <T extends { req: number }>(data: T[], score = 0): T =>
    data[findScoreIndex(data, score)]

/**
 *
 * @param value any sort of value
 * @returns Whether or not the value is an object, not null and is not an array
 */
export const isObject = (value: any): value is object =>
    typeof value === 'object' && value !== null && !Array.isArray(value)

export const romanNumeral = (num: number): string => {
    const digits = [...String(num)]
    const key = [
        '',
        'C',
        'CC',
        'CCC',
        'CD',
        'D',
        'DC',
        'DCC',
        'DCCC',
        'CM',
        '',
        'X',
        'XX',
        'XXX',
        'XL',
        'L',
        'LX',
        'LXX',
        'LXXX',
        'XC',
        '',
        'I',
        'II',
        'III',
        'IV',
        'V',
        'VI',
        'VII',
        'VIII',
        'IX',
    ]

    let roman = ''
    let i = 3

    while (i--) roman = (key[+digits.pop()! + i * 10] ?? '') + roman

    return Array.from({length: +digits.join('') + 1}).join('M') + roman
}

export const prettify = (s: string): string => {
    if (/[a-z]/gi.test(s) && s === s.toUpperCase()) {
        s = s.toLowerCase()
    }

    // Convert camelCase to Snake_Case (if applicable)
    if (!['_', ' '].some((l) => s.includes(l))) {
        s =
            s.charAt(0).toLowerCase() +
            s.slice(1).replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
    }

    // Convert snake_case to Title Case
    return s
        .replaceAll('_', ' ')
        .replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase())
}

export const removeFormatting = (s: string): string =>
    s.replace(/§#([A-Fa-f0-9]{6})|§./gm, '')

export interface FormatTimeOptions {
    /**
     * Whether or not to use `s`, `m`, `h`, `d` or `seconds`, `minutes`, `hours`, `days`
     * @default true
     */
    short?: boolean;

    /**
     * How many units to display
     * @default 2
     *
     * @example
     * ```ts
     * formatTime(90060000 , { short: true, units: 1 })
     * // => 1d
     * ```
     *@example
     * ```ts
     * formatTime(90060000 , { short: true, units: 2 })
     * // => 1d 1h
     *```
     */
    entries?: number;
}

const MS = 1000
const SECONDS = 60
const MINUTES = 60
const HOURS = 24
const MONTHS = 30
const YEARS = 12

//Format milliseconds to a human readable string
export const formatTime = (
    ms: number,
    {short = true, entries = 2}: FormatTimeOptions = {}
): string => {
    if (ms < MS) return `${ms}${short ? 'ms' : ' milliseconds'}`

    const seconds = Math.floor(ms / MS)
    const minutes = Math.floor(seconds / SECONDS)
    const hours = Math.floor(minutes / MINUTES)
    const days = Math.floor(hours / HOURS)
    const months = Math.floor(days / MONTHS)
    const years = Math.floor(months / YEARS)

    const time = [
        {value: years, short: 'y', long: 'year'},
        {value: months % YEARS, short: 'mo', long: 'month'},
        {value: days % MONTHS, short: 'd', long: 'day'},
        {value: hours % HOURS, short: 'h', long: 'hour'},
        {value: minutes % MINUTES, short: 'm', long: 'minute'},
        {value: seconds % SECONDS, short: 's', long: 'second'},
        {value: ms - seconds * MS, short: 'ms', long: 'millisecond'},
    ]

    return time
        .filter(({value}) => value > 0)
        .map(
            (unit) =>
                `${unit.value}${short ? unit.short : ` ${unit.long}${unit.value > 1 ? 's' : ''}`}`
        )
        .splice(0, entries)
        .join(', ')
}

export const relativeTime = (time: number) => `${formatTime(Date.now() - time)} ago`

export const abbreviationNumber = (num: number): [num: number, suffix: string] => {
    const abbreviation = ['', 'K', 'M', 'B', 'T']
    const base = Math.floor(num === 0 ? 0 : Math.log(num) / Math.log(1000))
    return [+(num / Math.pow(1000, base)).toFixed(2), abbreviation[base]]
}

export const ordinal = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd']
    const v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
}

export const arrayGroup = <T extends Array<any> | string>(
    arr: T,
    groupSize: number
): T[] =>
    Array.from({length: Math.ceil(arr.length / groupSize)}, (_, i) =>
        arr.slice(i * groupSize, (i + 1) * groupSize)
    ) as T[]

export const wordGroup = (
    input: string,
    wordCount: number,
    list: string[] = []
): string[] => {
    const size = wordCount * 5

    if (input.length <= size) {
        list.push(input)
        return list
    }

    let line = input.slice(0, Math.max(0, size))

    const lastSpaceRgx = /\s(?!.*\s)/
    const index = line.search(lastSpaceRgx) + 1
    let nextIndex = size

    if (index > 0) {
        line = line.slice(0, Math.max(0, index))
        nextIndex = index
    }

    list.push(line)

    return wordGroup(input.slice(Math.max(0, nextIndex)), wordCount, list)
}

export type Flatten<T> = Record<string | keyof T, any>;

export type DeepFlatten<T> = {
    [K in keyof T]-?: (
        x: NonNullable<T[K]> extends infer V
            ? V extends object
                ? V extends readonly any[]
                    ? Pick<T, K>
                    : DeepFlatten<V> extends infer FV
                        ? {
                            [P in keyof FV as `${Extract<K, string | number>}.${Extract<
                                P,
                                string | number
                            >}`]: FV[P];
                        }
                        : never
                : Pick<T, K>
            : never
    ) => void;
} extends Record<keyof T, (y: infer O) => void>
    ? { [K in keyof O]: O[K] }
    : never;

/**
 *
 * @param data The object to be flattened
 * @param prefix The prefix to be added to the keys
 * @param dest The object to be flattened into
 * @returns The flattened object
 * @example ```ts
 * flatten({ a: { b: 1, c: 2 }, d: 3 }); // { 'a.b': 1, 'a.c': 2, 'd': 3 }
 * ```
 */
export const flatten = <T>(data: T, prefix = '', dest: APIData = {}): Flatten<T> => {
    if (isObject(data)) {
        Object.keys(data ?? {}).forEach((key) => {
            const tmpPrefix = prefix.length > 0 ? `${prefix}.${key}` : prefix + key
            flatten(data[key as keyof T], tmpPrefix, dest)
        })
    } else {
        dest[prefix] = data
    }

    return dest as Flatten<T>
}

/**
 *
 * @param data The object to be unflattened
 * @example ```ts
 * unflatten({ 'stats.bedwars.wins': 1 }); // { stats: { bedwars: { wins: 1 } } }
 * ```
 */
export const unflatten = <T>(data: Flatten<T>): T => {
    const result: APIData = {}
    const obj = data as APIData

    Object.keys(obj).forEach((k) => {
        if (k.includes('.')) {
            const path = k.split('.')
            const x = path.pop()

            const body = path.reduce((cur, p) => {
                if (!(p in cur)) cur[p] = {}
                return cur[p]
            }, result)

            body[x ?? ''] = obj[k]
        } else {
            result[k] = obj[k]
        }
    })

    return result as T
}


export const minecraftColors = [
    {code: '§0', hex: '#000000', id: 'BLACK'},
    {code: '§1', hex: '#0000AA', id: 'DARK_BLUE'},
    {code: '§2', hex: '#00AA00', id: 'DARK_GREEN'},
    {code: '§3', hex: '#00AAAA', id: 'DARK_AQUA'},
    {code: '§4', hex: '#AA0000', id: 'DARK_RED'},
    {code: '§5', hex: '#AA00AA', id: 'DARK_PURPLE'},
    {code: '§6', hex: '#FFAA00', id: 'GOLD'},
    {code: '§7', hex: '#AAAAAA', id: 'GRAY'},
    {code: '§8', hex: '#555555', id: 'DARK_GRAY'},
    {code: '§9', hex: '#5555FF', id: 'BLUE'},
    {code: '§a', hex: '#55FF55', id: 'GREEN'},
    {code: '§b', hex: '#55FFFF', id: 'AQUA'},
    {code: '§c', hex: '#FF5555', id: 'RED'},
    {code: '§d', hex: '#FF55FF', id: 'LIGHT_PURPLE'},
    {code: '§e', hex: '#FFFF55', id: 'YELLOW'},
    {code: '§f', hex: '#FFFFFF', id: 'WHITE'},
]
