// const { useState, useEffect } = React
// const { useSelector, useDispatch } = ReactRedux

import { utilService } from '../services/util.service.js'
import { useDispatch, useSelector } from 'react-redux'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import {
    loadToys,
    removeToyOptimistic,
    saveToy,
    setFilterBy,
} from '../store/actions/toy.actions.js'
import { ADD_TOY_TO_CART } from '../store/reducers/toy.reducer.js'
import { useEffect, useRef } from 'react'

export function ToyIndex() {
    const dispatch = useDispatch()
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const cart = useSelector((storeState) => storeState.toyModule.shoppingCart)
    const isLoading = useSelector(
        (storeState) => storeState.toyModule.isLoading
    )
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    const debounceOnSetFilter = useRef(utilService.debounce(onSetFilter, 500))

    useEffect(() => {
        loadToys().catch(() => {
            showErrorMsg('Cannot show toys')
        })
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch((err) => {
                console.log('Cannot remove toy', err)
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getEmptyToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                console.log('savedToy:', savedToy)
                showSuccessMsg(`Toy added (Name: ${savedToy.name})`)
                // dispatch({ type: ADD_TOY, toy: savedToy })
            })
            .catch((err) => {
                console.log('Cannot add toy', err)
                showErrorMsg('Cannot add toy')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        saveToy(toyToSave)
            .then((savedToy) => {
                // dispatch({ type: UPDATE_TOY, toy: savedToy })
                showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
            })

            .catch((err) => {
                console.log('Cannot update toy', err)
                showErrorMsg('Cannot update toy')
            })
    }

    function onSetFilter(filterBy) {
        console.log('filterBy:', filterBy)
        // setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
        setFilterBy(filterBy)
    }

    function addToCart(toy) {
        console.log('toy:', toy)
        console.log(`Adding ${toy.name} to Cart`)
        dispatch({ type: ADD_TOY_TO_CART, toy })
        showSuccessMsg('Added to Cart')
    }

    return (
        <div>
            <h3>Toys App</h3>
            <main>
                <button onClick={onAddToy}>Add Toy 🧸</button>
                <ToyFilter
                    filterBy={filterBy}
                    onSetFilter={debounceOnSetFilter}
                />
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
            </main>
        </div>
    )
}
