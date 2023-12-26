// const { useState, useEffect, useRef } = React

import { useEffect, useState } from 'react'
import { utilService } from '../services/util.service.js'
import { useEffectUpdate } from './customHooks/useEffectUpdate.js'

export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffectUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form>
                <label htmlFor="sortBy">Sort By:</label>
                <select
                    name="sortBy"
                    id="sortBy"
                    onChange={handleChange}
                    defaultValue={filterByToEdit.sortBy || ''}
                >
                    <option disabled value="">
                        Choose option
                    </option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="createdAt">Created At</option>
                </select>

                <label htmlFor="sortDir">Ascending </label>
                <input
                    disabled={!filterByToEdit.sortBy}
                    checked={filterBy.sortDir === 'on'}
                    onChange={handleChange}
                    type="checkbox"
                    id="sortDir"
                    name="sortDir"
                />

                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="By name"
                    value={filterByToEdit.name}
                    onChange={handleChange}
                />

                <label htmlFor="price">Max price:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="By max price"
                    value={filterByToEdit.price || ''}
                    onChange={handleChange}
                />
                <fieldset htmlFor="inStock">
                    <legend>Inventory</legend>
                    <div>
                        <input
                            type="radio"
                            id="all"
                            name="inStock"
                            value=""
                            onChange={handleChange}
                        />
                        <label htmlFor="inStock">All</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="inStock"
                            name="inStock"
                            value={true}
                            onChange={handleChange}
                        />
                        <label htmlFor="inStock">In stock</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="outOfStock"
                            name="inStock"
                            value={false}
                            onChange={handleChange}
                        />
                        <label htmlFor="inStock">Out of stock</label>
                    </div>
                </fieldset>
                <label htmlFor="labels">Choose a category:</label>
                <input
                    list="labels-choice"
                    id="labels"
                    name="labels"
                    onChange={handleChange}
                />
                <datalist id="labels-choice">
                    <option value="All"></option>
                    <option value="On wheels"></option>
                    <option value="Box game"></option>
                    <option value="Art"></option>
                    <option value="Baby"></option>
                    <option value="Doll"></option>
                    <option value="Puzzle"></option>
                    <option value="Outdoor"></option>
                    <option value="Battery Powered"></option>
                </datalist>
            </form>
        </section>
    )
}
