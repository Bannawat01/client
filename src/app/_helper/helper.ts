import { QueryPagination, UserQueryPagination } from "../_models/pagination"
import { User } from "../_models/user"

const defaultAvatar = '/assets/defaulfAvatar.png'
const defaultImage = '/assets/defaultImage.png'
function getAvatar(user: User): string {
    if (user.photos) {
        const avatar = user.photos.find(p => p.is_avatar === true)
        if (avatar) {
            return avatar.url
        }
    }
    return defaultAvatar
}

function getPhotoOftheDay(user: User) {
    if (user.photos && user.photos.length > 0) {
        const index = Math.floor(Math.random() * user.photos.length)
        return user.photos[index].url
    }
    return defaultImage
}

export function parseUserPhoto(user: User): User {
    user.avatar = getAvatar(user)
    user.photoOfTheDay = getPhotoOftheDay(user)
    return user
}

export function parseQuery(query: QueryPagination | UserQueryPagination): string {
    let queryString = '?'
    if (query.pageSize)
        queryString += `&pageSize=${query.pageSize}`
    if (query.currentPage)
        queryString += `&currentPage=${query.currentPage}`

    if ('username' in query && query.username)
        queryString += `&currentPage=${query.username}`
    if ('username' in query && query.looking_for)
        queryString += `&currentPage=${query.looking_for}`

    if ('username' in query && query.min_age)
        queryString += `&currentPage=${query.min_age}`
    if ('username' in query && query.max_age)
        queryString += `&currentPage=${query.max_age}`


    return queryString
}