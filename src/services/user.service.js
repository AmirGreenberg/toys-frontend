// import { storageService } from './async-storage.service.js'
//XXX 
import { httpService } from './http.service.js'

//XXX 
const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore,
    getEmptyCredentials
}

function getById(userId) {
    //XXX    
    return httpService.get(BASE_URL + userId)

    ////new-start///
    // return storageService.get(STORAGE_KEY_LOGGEDIN, userId)
    ////new-end///


}

async function login({ username, password }) {
    //XXX
    try {
        const user = await httpService.post(BASE_URL + 'login', { username, password })

        if (user) {
            return _setLoggedinUser(user)
        } else {
            throw new Error('Invalid login')
        }
    } catch (err) {
        console.error('Error in login function:', err)
        throw err
    }
}

//XXX

////new-start///
// return storageService.post(STORAGE_KEY_LOGGEDIN + 'login', { username, password })
//     .then(user => {
//         if (user) return _setLoggedinUser(user)
//         else return Promise.reject('Invalid login')
//     })
////new-end///
// }

async function signup({ username, password, fullname }) {
    try {
        const userToCreate = { username, password, fullname, score: 10000 }
        const user = await httpService.post(BASE_URL + 'signup', userToCreate)

        if (user) {
            return _setLoggedinUser(user)
        } else {
            throw new Error('Invalid signup')
        }
    } catch (err) {
        console.error('Error in signup function:', err)
        throw err
    }
}

//XXX

////new-start///
// const user = { username, password, fullname, score: 10000 }
// return storageService.post(STORAGE_KEY_LOGGEDIN + 'signup', user)
//     .then(user => {
//         if (user) return _setLoggedinUser(user)
//         else return Promise.reject('Invalid signup')
// })
////new-end///
// }



async function updateScore(diff) {
    try {
        if (getLoggedinUser().score + diff < 0) {
            throw new Error('No credit')
        }

        const user = await httpService.put('user/', { diff })
        _setLoggedinUser(user)
        return user.score
    } catch (err) {
        console.error('Error in updateScore function:', err)
        throw err
    }
}

//XXX

////new-start///
// if (getLoggedinUser().score + diff < 0) return Promise.reject('No credit')
// return storageService.put('user/', { diff })
//     .then(user => {
//         _setLoggedinUser(user)
//         return user.score
////new-end///
// })
// }


async function logout() {
    //XXX
    try {
        await httpService.post(BASE_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    } catch (err) {
        console.error('Logout error:', err)
    }
    //XXX
    ////new-start///
    // return storageService.post(STORAGE_KEY_LOGGEDIN + 'logout')
    //     .then(() => {
    //         sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    ////new-end///
}


function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}


// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// userService.login({username: 'muki', password: 'muki1'})



