// const { useState, useEffect } = React

import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState, useRef } from 'react'
import { utilService } from '../services/util.service.js'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToySort } from '../cmps/ToySort'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import {
    loadToys,
    removeToyOptimistic,
    saveToy,
    setFilterBy,
} from '../store/actions/toy.actions.js'
import { ADD_TOY_TO_CART } from '../store/reducers/toy.reducer.js'
import wow from '../assets/img/wow.jpg'
import wowsmall from '../assets/img/wowsmall.jpg'

export function ToyIndex() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const [filterBy, setFilterBy] = useState(toyService.getDefaultFilter())
    const [sort, setSort] = useState(toyService.getDefaultSort())
    const dispatch = useDispatch()

    const isLoading = useSelector(
        (storeState) => storeState.toyModule.isLoading
    )
    const debounceOnSetFilter = useRef(utilService.debounce(onSetFilter, 500))

    useEffect(() => {
        loadToys(filterBy, sort).catch(() => {
            showErrorMsg('Cannot show toys')
        })
    }, [filterBy, sort])

    async function onRemoveToy(toyId) {
        try {
            await removeToyOptimistic(toyId)
            showSuccessMsg('Toy removed')
        } catch (err) {
            console.log('Cannot remove toy', err)
            showErrorMsg('Cannot remove toy')
        }
    }

    async function onAddToy() {
        try {
            const toyToSave = toyService.getEmptyToy()
            const savedToy = await saveToy(toyToSave)
            console.log('savedToy:', savedToy)
            showSuccessMsg(`Toy added (Name: ${savedToy.name})`)
        } catch (err) {
            console.log('Cannot add toy', err)
            showErrorMsg('Cannot add toy')
        }
    }

    async function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        try {
            const savedToy = await saveToy(toyToSave)
            showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
        } catch (err) {
            console.log('Cannot update toy', err)
            showErrorMsg('Cannot update toy')
        }
    }

    function onSetFilter(filterBy) {
        console.log('filterBy:', filterBy)
        // setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
        setFilterBy(filterBy)
    }

    function onSetSort(sort) {
        setSort(sort)
    }

    function addToCart(toy) {
        console.log('toy:', toy)
        console.log(`Adding ${toy.name} to Cart`)
        dispatch({ type: ADD_TOY_TO_CART, toy })
        showSuccessMsg('Added to Cart')
    }

    return (
        <div>
            <a className="btn sort-list" onClick={onAddToy}>
                Add New Toy 🧸
            </a>
            <ToyFilter filterBy={filterBy} onSetFilter={debounceOnSetFilter} />
            <ToySort sort={sort} onSetSort={onSetSort} />
            {!isLoading && (
                <ToyList
                    toys={toys}
                    onEditToy={onEditToy}
                    onRemoveToy={onRemoveToy}
                    addToCart={addToCart}
                    txt={'999'}
                    nums={[1, 2, 3]}
                />
            )}
            {isLoading && <div>Loading...</div>}
            <hr />
        </div>
    )
}
