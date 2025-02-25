import { Paginator, QueryPagination, UserQueryPagination } from "../_models/pagination"
import { User } from "../_models/user"
import { parseUserPhoto } from "./helper"


const data = new Map()
type cacheOpt = 'member' | 'chat' | 'followers' | 'following'
type cacheValue = Paginator<UserQueryPagination, User> | Paginator<QueryPagination, User>
export const cacheManager = {

    createKey: function <T extends { [key: string]: any }>(query: T) {
        return Object.values(query).join('-')
    },

    load: function (key: string, opt: cacheOpt): cacheValue | undefined {
        const _data = data.get(opt + key)
        if (_data)
            return _data as Paginator<QueryPagination, User>
        else
            return _data as Paginator<UserQueryPagination, User>
        return undefined
    },

    save: function (key: string, opt: cacheOpt, value: cacheValue) {
        value.items = value.items.map(u => parseUserPhoto(u))
        data.set(opt + key, value)
    },


    clear: function (opt: cacheOpt | 'all') {
        if (opt === 'all')
            data.clear()
        else
            for (const key of data.keys()) {
                if (key.startsWith(opt))
                    data.delete(key)
            }
    },


}