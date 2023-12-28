import React from 'react'

export function ToySort({ sort, onSetSort }) {
    function handleSortChange(by) {
        const updatedSort = { ...sort, by }
        onSetSort(updatedSort)
    }

    function handleToggleDirection() {
        const updatedSort = { ...sort, asc: !sort.asc }
        console.log(
            '🚀 ~ file: ToySort.jsx:12 ~ handleToggleDirection ~ updatedSort:',
            updatedSort
        )
        onSetSort(updatedSort)
    }

    return (
        <section className="sort-list">
            <a className="btn" onClick={() => handleSortChange('name')}>
                Sort by name
            </a>
            <a className="btn" onClick={() => handleSortChange('price')}>
                Sort by price
            </a>
            <a className="btn" onClick={handleToggleDirection}>
                Change direction {sort.asc ? '^' : 'v'}
            </a>
        </section>
    )
}
