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