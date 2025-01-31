import { Paginator, UserQueryPagination } from "../_models/pagination"
import { User } from "../_models/user"
import { parseUserPhoto } from "./helper"
const data = new Map()

type cacheOpt = 'members' | 'chat' | 'follower' | 'following'
type cacheValue = Paginator<UserQueryPagination, User>

export const cacheManager = { // cacheManager is an object with 3 methods: createKey, save, clear, and a load

    createKey: function <T extends { [key: string]: any }>(query: T) {
        return Object.values(query).join('-')
    },

    load: function (key: string, opt: cacheOpt): cacheValue | undefined {
        return data.get(opt + key)
    },

    save: function (key: string, opt: cacheOpt, value: cacheValue) {
        if (opt === 'chat') {
            value.items = value.items.map(u => parseUserPhoto(u))
        }
        data.set(opt + key, value)
    },

    clear: function (opt: cacheOpt | 'all') {// cleaer all member, chat, follower, following
        if (opt === 'all') {
            data.clear()
        } else {
            for (const key of data.keys()) { // loop through all keys in the map and delete the key that starts with opt
                if (key.startsWith(opt)) {
                    data.delete(key)
                }
            }
        }
    },
}