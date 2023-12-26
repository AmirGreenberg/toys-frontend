// const { useState, useEffect, useRef } = React

import { useEffect, useState } from 'react'
import { utilService } from '../services/util.service.js'
import { useEffectUpdate } from './customHooks/useEffectUpdate.js'
import { toyService } from '../services/toy.service'

const toyLabel = toyService.getLabels()

export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffectUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, type, name: field } = target
        if (type === 'checkbox') value = target.checked
        if (type === 'select-multiple')
            value = Array.from(target.selectedOptions, (option) => option.value)
        setFilterByToEdit((prevFilterBy) => ({
            ...prevFilterBy,
            [field]: value,
        }))
    }

    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form>
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
                <label className="filter-label">
                    <span className="filter-label">Filter By</span>
                    <select
                        onChange={handleChange}
                        name="labels"
                        multiple
                        value={filterByToEdit.labels || []}
                    >
                        <option value=""> All </option>
                        <>
                            {toyLabel.map((label) => (
                                <option key={label} value={label}>
                                    {label}
                                </option>
                            ))}
                        </>
                    </select>
                </label>
            </form>
        </section>
    )
}
