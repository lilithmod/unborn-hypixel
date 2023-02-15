/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData, Constructor, UnwrapConstructor, } from '../../../../util/util.js'
import { DateTime } from 'luxon'
import { FormattedGame } from '../../../game'

interface Quest {
    completions?: { time: number }[];
}

export enum QuestTime {
    Daily,
    Weekly,
    Overall,
}

export interface QuestOption<TField extends string> {
    field: string;
    propertyKey: TField;
    fieldName?: string;
    name?: string;
    leaderboard?: false;
    overall?: {
        fieldName?: string;
        name?: string;
    };
}

export interface CreateQuestsOptions<
    DailyFields extends string,
    WeeklyFields extends string
> {
    game: FormattedGame;
    fieldPrefix?: string;

    /**
     * A list of daily quests
     */
    daily: QuestOption<DailyFields>[];

    /**
     * A list of weekly quests
     */
    weekly: QuestOption<WeeklyFields>[];
}

const processQuests = (
    instance: Record<string, number>,
    quests: APIData,
    time: QuestTime,
    options: QuestOption<string>[],
    fieldPrefix?: string
) => {
    options.forEach((quest) => {
        const k = quest.propertyKey ?? quest.field
        const field = fieldPrefix ? `${fieldPrefix}_${quest.field}` : quest.field

        instance[k] = getQuestCountDuring(time, quests[field])
        instance.total += instance[k] ?? 0
    })
}

type GameWithQuestMode<Fields extends string> = {
    [K in Fields]: number;
} & { total: number };

type GameWithQuests<DailyFields extends string, WeeklyFields extends string> = [
    daily: Constructor<GameWithQuestMode<DailyFields>>,
    weekly: Constructor<GameWithQuestMode<WeeklyFields>>,
    overall: Constructor<GameWithQuestMode<DailyFields | WeeklyFields>>
];

export function createGameModeQuests<
    DailyFields extends string,
    WeeklyFields extends string
>({
      game,
      fieldPrefix,
      daily,
      weekly,
  }: CreateQuestsOptions<DailyFields, WeeklyFields>): GameWithQuests<
    DailyFields,
    WeeklyFields
> {
    class Daily {
        [key: string]: number;

        public total: number

        public constructor(quests: APIData) {
            this.total = 0
            processQuests(this, quests, QuestTime.Daily, daily, fieldPrefix)
        }
    }

    class Weekly {
        [key: string]: number;

        public total: number

        public constructor(quests: APIData) {
            this.total = 0
            processQuests(this, quests, QuestTime.Weekly, weekly, fieldPrefix)
        }
    }

    class Overall {
        [key: string]: number;

        public total: number

        public constructor(quests: APIData) {
            this.total = 0

            processQuests(this, quests, QuestTime.Overall, daily, fieldPrefix)
            processQuests(this, quests, QuestTime.Overall, weekly, fieldPrefix)
        }
    }

    return [Daily, Weekly, Overall] as GameWithQuests<DailyFields, WeeklyFields>
}

type BaseGamesWithQuestsRecord = {
    [K in keyof typeof FormattedGame]?: GameWithQuests<string, string>;
};

type IQuestInstance<
    Time extends QuestTime,
    GamesWithQuests extends BaseGamesWithQuestsRecord
> = Constructor<{
    [K in keyof GamesWithQuests]: GamesWithQuests[K] extends GameWithQuests<string, string>
        ? UnwrapConstructor<GamesWithQuests[K][Time]>
        : never;
}>;

export function createQuestsInstance<
    Time extends QuestTime,
    GamesWithQuests extends BaseGamesWithQuestsRecord
>(time: Time, record: GamesWithQuests): IQuestInstance<Time, GamesWithQuests> {
    const modes = Object.entries(record) as [
        keyof typeof FormattedGame,
        GameWithQuests<string, string>
    ][]

    class QuestInstance {
        [key: string]: Record<string, number>;

        public constructor(data: APIData) {
            modes.forEach(([game, quests]) => {
                this[game] = new quests[time](data)
            })
        }
    }

    return QuestInstance as unknown as IQuestInstance<Time, GamesWithQuests>
}

export const getQuestCountDuring = (time: QuestTime, quest: Quest | undefined) => {
    if (!quest?.completions) return 0
    if (time === QuestTime.Overall) return quest.completions.length

    let t: DateTime = DateTime.now().setZone('America/New_York')

    if (time === QuestTime.Daily) {
        t = t.startOf('day')
    } else if (time === QuestTime.Weekly) {
        t = t.startOf('week')
        t =
            t.plus({days: 4}).toMillis() < Date.now()
                ? t.plus({days: 4})
                : t.minus({days: 3})
    }

    const millis = t.toMillis()

    return quest.completions.filter((ms) => ms.time >= millis).length
}
