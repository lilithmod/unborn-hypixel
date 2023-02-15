/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { findScore } from '../../../../util/util.js'

export const getExpReq = (level: number) => {
    const progress = level % 100
    if (progress > 4) return 5000

    const levels = [level >= 100 ? 5000 : 0, 1000, 2000, 3000, 4000]

    return levels[progress]
}

export const getLevel = (exp = 0): number => {
    const prestiges = Math.floor(exp / 490_000)
    let level = prestiges * 100
    let remainingExp = exp - prestiges * 490_000

    for (let i = 0; i < 5; ++i) {
        const expForNextLevel = getExpReq(i)
        if (remainingExp < expForNextLevel) break
        level++
        remainingExp -= expForNextLevel
    }

    return level + remainingExp / getExpReq(level + 1)
}

const applyFormat = ({format}: { format: string[] }, n: number) => {
    if (format.length == 2) {
        return `${format[0]}${n}${format[1]}`
    }

    const nums = [...n.toString()].map((v, i) => (v = `${format[i] ?? ''}${v}`)).join(',')

    return `${nums}${format.at(-1)}`
}

export const getFormattedLevel = (star: number): string => {
    star = Math.floor(star)

    const prestigeColors: { req: number; format?: string[], fn?: (star: number) => string }[] = [
        {req: 0, fn: (star) => `§7[${star}]`},
        {req: 100, fn: (star) => `§f[${star}❤]`},
        {req: 200, fn: (star) => `§c[${star}✙]`},
        {req: 300, fn: (star) => `§6[${star}✈]`},
        {req: 400, fn: (star) => `§e[${star}✈]`},
        {req: 500, fn: (star) => `§a[${star}✠]`},
        {req: 600, fn: (star) => `§3[${star}♕]`},
        {req: 700, fn: (star) => `§5[${star}⚡]`},
        {req: 800, fn: (star) => `§d[${star}☢]`},
        {
            req: 900,
            fn: (n) => {
                const nums = [...n.toString()]
                return `§c[§6${nums[0]}§e${nums[1]}§a${nums[2]}§b✏§d]`
            },
        },
        {req: 1000, fn: (star) => `§0[§f${star}☯§0]`},
    ]

    return findScore(prestigeColors, star).fn(star)
}
