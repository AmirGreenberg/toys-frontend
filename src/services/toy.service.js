
// import Axios from 'axios'
// import { storageService } from "./async-storage.service.js"
import { utilService } from './util.service.js'
//XXX 
import { httpService } from './http.service.js'

////new-start///
// const TOY_KEY = 'toyDB'
// _createToys()
////new-end///

const toyNames = ['Magic slime', 'Helicopter', 'Car ferrari', 'Barbie', 'Bratz', 'Scooter', 'Taki', 'Shes-Besh']
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

//XXX 
const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort,
    getLabels
}

function getLabels() {
    return [...labels]
}

function query(filterBy = {}, sort) {
    //XXX 
    return httpService.get(BASE_URL, { params: { filterBy, sort } })

    ////new-start///

    // return storageService.query(TOY_KEY)
    //     .then(toys => {
    //         if (filterBy.name) {
    //             const regExp = new RegExp(filterBy.name, 'i')
    //             toys = toys.filter(toy => regExp.test(toy.name))
    //         }
    //         if (filterBy.labels) {
    //             if (filterBy.labels === 'All') filterBy.labels = ''
    //             const regExp = new RegExp(filterBy.labels, 'i')
    //             toys = toys.filter(toy => regExp.test(toy.labels))
    //         }
    //         if (filterBy.inStock) {
    //             const regExp = new RegExp(filterBy.inStock, 'i')
    //             toys = toys.filter(toy => regExp.test(toy.inStock))
    //         }
    //         if (filterBy.price) {
    //             toys = toys.filter(toy => toy.price <= filterBy.price)
    //         }

    //         if (filterBy.sortBy === 'createdAt') {
    //             toys.sort((b1, b2) => (b1.createdAt - b2.createdAt) * filterBy.sortDir)
    //         } else if (filterBy.sortBy === 'name') {
    //             toys.sort(
    //                 (b1, b2) => b1.name.localeCompare(b2.name) * filterBy.sortDir
    //             )
    //         } else {
    //             toys.sort((b1, b2) => (b1.price - b2.price) * filterBy.sortDir)
    //         }

    //         return toys
    //     })
    ////new-end///

}


function getById(toyId) {
    //XXX 
    return httpService.get(BASE_URL + toyId)

    ////new-start///
    // return storageService.get(TOY_KEY, toyId)
    ////new-end///
}

function remove(toyId) {
    //XXX 
    return httpService.delete(BASE_URL + toyId)

    ////new-start///
    // return storageService.remove(TOY_KEY, toyId)
    ////new-end///
}

function save(toy) {
    //XXX
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
    //XXX

    ////new-start///
    // if (toy._id) {
    //     return storageService.put(TOY_KEY, toy)
    // } else {
    //     return storageService.post(TOY_KEY, toy)
    // }
    ////new-end///
}


function getEmptyToy() {
    let randIntLabels = utilService.getRandomIntInclusive(0, labels.length - 3)
    let randIntNames = utilService.getRandomIntInclusive(0, labels.length - 1)
    let randIntStock = utilService.getRandomIntInclusive(0, 1)
    return {
        name: toyNames[randIntNames],
        price: utilService.getRandomIntInclusive(10, 500),
        labels: [labels[randIntLabels], labels[randIntLabels + 1], labels[randIntLabels + 2]],
        createdAt: Date.now(),
        inStock: randIntStock ? true : false,
    }
}

function getDefaultFilter() {
    return { name: '', price: '', labels: '', createdAt: '', inStock: '' }
}

function getDefaultSort() {
    return {
        // 
        by: 'name',
        asc: true
    }
}

////new-start///
// function _createToys() {
//     let toys = utilService.loadFromStorage(TOY_KEY)


//     if (!toys || !toys.length) {
//         toys = []
//         toys.push(_createToy())
//         toys.push(_createToy())
//         toys.push(_createToy())
//         toys.push(_createToy())
//         utilService.saveToStorage(TOY_KEY, toys)
//     }
// }

// function _createToy() {
//     const toy = getEmptyToy()
//     toy._id = utilService.makeId()
//     return toy
// }
////new-end///


