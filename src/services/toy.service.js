
// import Axios from 'axios'
import { storageService } from "./async-storage.service.js"
import { utilService } from './util.service.js'
//XXX import { httpService } from './http.service.js'

////new-start///
const TOY_KEY = 'toyDB'
_createToys()
////new-end///


//XXX const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    //XXX return httpService.get(BASE_URL, filterBy)

    ////new-start///
    return storageService.query(TOY_KEY)
        .then(toys => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regExp.test(toy.vendor))
            }
            if (filterBy.maxPrice) {
                toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
            }
            return toys
        })
    ////new-end///

}

function getById(toyId) {
    //XXX return httpService.get(BASE_URL + toyId)

    ////new-start///
    return storageService.get(TOY_KEY, toyId)
    ////new-end///
}

function remove(toyId) {
    //XXX return httpService.delete(BASE_URL + toyId)

    ////new-start///
    return storageService.remove(TOY_KEY, toyId)
    ////new-end///
}

function save(toy) {
    //XXX
    // if (toy._id) {
    //     return httpService.put(BASE_URL, toy)
    // } else {
    //     return httpService.post(BASE_URL, toy)
    // }
    //XXX

    ////new-start///
    if (toy._id) {
        return storageService.put(TOY_KEY, toy)
    } else {
        return storageService.post(TOY_KEY, toy)
    }
    ////new-end///
}


function getEmptyToy() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
        speed: utilService.getRandomIntInclusive(75, 200),
    }
}


function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}

////new-start///
function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = []
        toys.push(_createToy('audu', 300))
        toys.push(_createToy('fiak', 120))
        toys.push(_createToy('subali', 50))
        toys.push(_createToy('mitsu', 150))
        utilService.saveToStorage(TOY_KEY, toys)
    }
}

function _createToy(vendor, maxSpeed = 250) {
    const toy = getEmptyToy(vendor, maxSpeed)
    toy._id = utilService.makeId()
    return toy
}
////new-end///

