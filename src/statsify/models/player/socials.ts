/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../util/util.js'

export class PlayerSocials {

    public discord?: string
    public forums?: string
    public instagram?: string
    public twitch?: string
    public twitter?: string
    public youtube?: string

    public constructor(data: APIData) {
        this.discord = data.DISCORD
        this.forums = data.HYPIXEL
        this.instagram = data.INSTAGRAM
        this.twitch = data.TWITCH
        this.twitter = data.TWITTER
        this.youtube = data.YOUTUBE
    }
}
