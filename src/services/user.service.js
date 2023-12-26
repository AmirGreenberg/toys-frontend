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

function login({ username, password }) {
    //XXX
    return httpService.post(BASE_URL + 'login', { username, password })
        .then(user => {
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
    //XXX

    ////new-start///
    // return storageService.post(STORAGE_KEY_LOGGEDIN + 'login', { username, password })
    //     .then(user => {
    //         if (user) return _setLoggedinUser(user)
    //         else return Promise.reject('Invalid login')
    //     })
    ////new-end///
}

function signup({ username, password, fullname }) {
    //XXX
    const user = { username, password, fullname, score: 10000 }
    return httpService.post(BASE_URL + 'signup', user)
        .then(user => {
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid signup')
        })
    //XXX

    ////new-start///
    // const user = { username, password, fullname, score: 10000 }
    // return storageService.post(STORAGE_KEY_LOGGEDIN + 'signup', user)
    //     .then(user => {
    //         if (user) return _setLoggedinUser(user)
    //         else return Promise.reject('Invalid signup')
    // })
    ////new-end///
}



function updateScore(diff) {
    //XXX
    if (getLoggedinUser().score + diff < 0) return Promise.reject('No credit')
    return httpService.put('user/', { diff })
        .then(user => {
            _setLoggedinUser(user)
            return user.score
            //XXX

            ////new-start///
            // if (getLoggedinUser().score + diff < 0) return Promise.reject('No credit')
            // return storageService.put('user/', { diff })
            //     .then(user => {
            //         _setLoggedinUser(user)
            //         return user.score
            ////new-end///
        })
}

function logout() {
    //XXX
    return httpService.post(BASE_URL + 'logout')
        .then(() => {
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
            //XXX

            ////new-start///
            // return storageService.post(STORAGE_KEY_LOGGEDIN + 'logout')
            //     .then(() => {
            //         sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
            ////new-end///
        })
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



