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
        <section className="toy-list">
            <form className="grid gaf-column ">
                <fieldset>
                    <legend>Name</legend>
                    <div>
                        <label htmlFor="name"></label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Filter by name"
                            value={filterByToEdit.name}
                            onChange={handleChange}
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Max Price</legend>
                    <div>
                        <label htmlFor="price"></label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="Filter by max price"
                            value={filterByToEdit.price || ''}
                            onChange={handleChange}
                        />
                    </div>
                </fieldset>
                <div className="margin-10">
                    <fieldset htmlFor="inStock">
                        <legend>Inventory</legend>
                        <div>
                            <div className="">
                                <input
                                    type="radio"
                                    id="all"
                                    name="inStock"
                                    value=""
                                    onChange={handleChange}
                                />
                                <label htmlFor="inStock">All</label>
                            </div>
                            <div className="">
                                <input
                                    type="radio"
                                    id="inStock"
                                    name="inStock"
                                    value={true}
                                    onChange={handleChange}
                                />
                                <label htmlFor="inStock">In stock</label>
                            </div>
                            <div className="">
                                <input
                                    type="radio"
                                    id="outOfStock"
                                    name="inStock"
                                    value={false}
                                    onChange={handleChange}
                                />
                                <label htmlFor="inStock">Out of stock</label>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div>
                    <label className="filter-label flex">
                        <fieldset>
                            <legend>Filter By</legend>
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
                        </fieldset>
                    </label>
                </div>
            </form>
        </section>
    )
}
